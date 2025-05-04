import { useEffect } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave, useMarcaStore } from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
export function RegistrarMarca({ onClose, dataSelect = {}, accion = "Registrar" }) {
  const { insertarMarca, editarMarca } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion: data.nombre,
      };
      await editarMarca(p);
      onClose();
    } else {
      const p = {
        _descripcion: data.nombre,
        _idempresa: dataempresa.id,
      };
      await insertarMarca(p);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);

    return (
      <Container>
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {/* Título dinámico según la acción: "Registrar" o "Editar" */}
                {accion === "Editar" ? "Editar marca" : "Registrar nueva marca"}
              </h1>
            </section>
  
            <section>
              {/* Este botón cerraría el modal */}
              <span onClick={onClose}>x</span>
            </section>
          </div>
  
          {/* Formulario visual (sin funcionalidad real) */}
          <form className="formulario" onSubmit={(e) => e.preventDefault()}>
            <section>
              <article>
                <InputText icono={<v.iconomarca />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.descripcion || ""}
                    type="text"
                    placeholder=""
                    // Comentario: Este input capturaría el nombre de la marca.
                    // En la versión funcional estaría conectado con useForm y tendría validaciones.
                  />
                  <label className="form__label">Marca</label>
                  {/* Comentario: Aquí se mostraría un mensaje si el campo está vacío */}
                  {/* Ejemplo real: {errors.nombre?.type === "required" && <p>Campo requerido</p>} */}
                </InputText>
              </article>
  
              <div className="btnguardarContent">
                <Btnsave
                  icono={<v.iconoguardar />}
                  titulo="Guardar"
                  bgcolor="#ef552b"
                />
                {/* Comentario: Este botón ejecutaría:
                    - insertarMarca({ _descripcion, _idempresa }) si se está registrando
                    - editarMarca({ id, descripcion }) si se está editando
                    Ambas funciones vendrían del store de marcas (useMarcaStore).
                */}
              </div>
            </section>
          </form>
        </div>
      </Container>
    );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;