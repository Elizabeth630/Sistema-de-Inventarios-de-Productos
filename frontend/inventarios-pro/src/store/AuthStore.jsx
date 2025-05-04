import { create } from "zustand";

// Usuarios falsos para simular el login
const fakeUsers = [
  { id: 1, correo: "admin@example.com", pass: "123456", rol: "admin" },
  { id: 2, correo: "gerente@example.com", pass: "123456", rol: "gerente" },
  { id: 3, correo: "operador@example.com", pass: "123456", rol: "operador" },
];

export const useAuthStore = create((set, get) => ({
  user: null, // Usuario actualmente logueado

  signInWithEmail: async (p) => {
    const userFound = fakeUsers.find(
      (user) => user.correo === p.correo && user.pass === p.pass
    );

    if (!userFound) {
      return null; // No encontró usuario
    }

    set({ user: userFound }); // Guarda en el estado global el usuario logueado
    return userFound; // Devuelve el usuario
  },

  signOut: async () => {
    const { user } = get();
    if (!user) {
      throw new Error("No hay sesión activa para cerrar");
    }

    set({ user: null }); // Borra el usuario (cierra sesión)
  },
}));
