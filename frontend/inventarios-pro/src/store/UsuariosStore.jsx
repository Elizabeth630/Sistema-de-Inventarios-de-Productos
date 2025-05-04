import { create } from "zustand";
import { InsertarUsuarios, MostrarUsuarios } from "../services/crudUsuarios"; // <- O donde tengas tus funciones fake

// Simular ID de usuario falso
let contadorIdAuth = 1; 

export const useUsuariosStore = create((set, get) => ({
  idusuario: 0, // Inicializamos el ID de usuario

  insertarUsuarioAdmin: async (p) => {
    try {
      // Simulamos la creación de un usuario (como si fuera supabase.auth.signUp)
      const data = {
        user: {
          id: contadorIdAuth++, // Generar ID falso incremental
          email: p.correo,
        },
      };

      console.log("data del registro del user auth (falsa)", data);

      // Insertar en la "base de datos" falsa
      const datauser = await InsertarUsuarios({
        idauth: data.user.id,
        fecharegistro: new Date(),
        tipouser: "admin",
        correo: p.correo,
        pass: p.pass,
      });

      return datauser;
    } catch (error) {
      console.error("Error al insertar usuario admin simulado:", error);
    }
  },

  mostrarUsuarios: async () => {
    try {
      const response = await MostrarUsuarios();
      set({ idusuario: response.id }); // Guardamos el ID en el store
      return response;
    } catch (error) {
      console.error("Error al mostrar usuarios simulados:", error);
    }
  },
}));
