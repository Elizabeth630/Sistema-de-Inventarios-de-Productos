import Swal from "sweetalert2";

// Simulación de base de datos falsa de empresas
let fakeEmpresas = [
  { id: 1, nombre: "CleanPro S.A.", simbolomoneda: "S/." },
  { id: 2, nombre: "Brillo Total", simbolomoneda: "$" },
  { id: 3, nombre: "Higiene Max", simbolomoneda: "€" },
];

// Simulación de base de datos falsa de asignación de empresas a usuarios
let fakeAsignacionEmpresas = [
  { id_usuario: 1, id_empresa: 1 },
  { id_usuario: 2, id_empresa: 2 },
  { id_usuario: 3, id_empresa: 3 },
];

// Función para mostrar la empresa asociada a un usuario (simulada)
export const MostrarEmpresa = async (p) => {
  try {
    // Simulamos un pequeño delay de 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Busca la asignación de la empresa para el usuario
    const asignacion = fakeAsignacionEmpresas.find(e => e.id_usuario === p.idusaurio);

    if (asignacion) {
      // Busca la empresa asociada a ese usuario
      const empresa = fakeEmpresas.find(e => e.id === asignacion.id_empresa);
      return { success: true, empresa: empresa ? empresa : null };
    }

    return { success: false, empresa: null }; // Si no encuentra la empresa asignada
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al mostrar empresa: " + error.message,
    });
    return { success: false, message: error.message };
  }
};

// Función para contar los usuarios de una empresa (simulada)
export const ContarUsuariosXempresa = async (p) => {
  try {
    // Simulamos un pequeño delay de 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Busca la cantidad de usuarios de la empresa solicitada (simulado)
    const asignaciones = fakeAsignacionEmpresas.filter(e => e.id_empresa === p.id_empresa);
    const usuariosPorEmpresa = asignaciones.length;

    return { success: true, usuarios: usuariosPorEmpresa };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al contar usuarios de la empresa: " + error.message,
    });
    return { success: false, message: error.message };
  }
};
