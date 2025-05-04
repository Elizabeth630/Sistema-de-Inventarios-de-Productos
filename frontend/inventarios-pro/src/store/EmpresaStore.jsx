import { create } from "zustand";
import { ContarUsuariosXempresa, MostrarEmpresa } from "../services/crudEmpresa";

export const useEmpresaStore = create((set, get) => ({
  contadorusuarios: 0,
  dataempresa: {},

  mostrarEmpresa: async (idEmpresa) => {
    const response = await MostrarEmpresa(idEmpresa);
    if (response) {
      set({ dataempresa: response });
    }
    return response;
  },

  contarusuariosXempresa: async (idEmpresa) => {
    const response = await ContarUsuariosXempresa(idEmpresa);
    set({ contadorusuarios: response });
    return response;
  },
}));
