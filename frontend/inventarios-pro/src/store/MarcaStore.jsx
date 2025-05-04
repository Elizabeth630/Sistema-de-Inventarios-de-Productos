import { create } from "zustand";
// import { MostrarMarca, BuscarMarca, InsertarMarca, EliminarMarca, EditarMarca } from "../index"; // no hace falta si estás usando datos falsos internos

export const useMarcaStore = create((set, get) => ({
  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  datamarca: [],
  marcaItemSelect: [],
  parametros: {},

  dataempresa: null,
  setDataEmpresa: (empresa) => set({ dataempresa: empresa }),

  mostrarMarca: async (p) => {
    const response = await MostrarMarca(p);
    set({ parametros: p });
    set({ datamarca: response });
    set({ marcaItemSelect: response[0] || null });
    return response;
  },

  selectMarca: (p) => set({ marcaItemSelect: p }),

  insertarMarca: async (p) => {
    await InsertarMarca(p);
    const { mostrarMarca, parametros } = get();
    await mostrarMarca(parametros);
  },

  eliminarMarca: async (p) => {
    await EliminarMarca(p);
    const { mostrarMarca, parametros } = get();
    await mostrarMarca(parametros);
  },

  editarMarca: async (p) => {
    await EditarMarca(p);
    const { mostrarMarca, parametros } = get();
    await mostrarMarca(parametros);
  },

  buscarMarca: async (p) => {
    const response = await BuscarMarca(p);
    set({ datamarca: response });
  },
}));
