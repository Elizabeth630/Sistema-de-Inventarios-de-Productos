import Swal from "sweetalert2";

// Base de datos falsa en memoria
let mockMarcas = [
  { id: 1, descripcion: "Marca A", id_empresa: 1 },
  { id: 2, descripcion: "Marca B", id_empresa: 1 },
  { id: 3, descripcion: "Marca C", id_empresa: 2 },
];

let nextId = 4;

// Simular delay
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function InsertarMarca(p) {
  await esperar(300); // simula retardo
  const existe = mockMarcas.find(m => m.descripcion === p.descripcion && m.id_empresa === p.id_empresa);
  if (existe) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ya existe una marca con esa descripción",
      footer: '<a href="">Agregue una nueva descripción</a>',
    });
    return;
  }

  mockMarcas.push({ id: nextId++, ...p });
}

export async function MostrarMarca(p) {
  await esperar(200); // simula retardo
  return mockMarcas.filter(m => m.id_empresa === p.id_empresa).sort((a, b) => a.id - b.id);
}

export async function EliminarMarca(p) {
  await esperar(200);
  const index = mockMarcas.findIndex(m => m.id === p.id);
  if (index !== -1) {
    mockMarcas.splice(index, 1);
  } else {
    alert("Error al eliminar: marca no encontrada");
  }
}

export async function EditarMarca(p) {
  await esperar(200);
  const index = mockMarcas.findIndex(m => m.id === p.id);
  if (index !== -1) {
    mockMarcas[index] = { ...mockMarcas[index], ...p };
  } else {
    alert("Error al editar marca: no encontrada");
  }
}

export async function BuscarMarca(p) {
  await esperar(200);
  const term = p.descripcion.toLowerCase();
  return mockMarcas
    .filter(m => m.id_empresa === p.id_empresa)
    .filter(m => m.descripcion.toLowerCase().includes(term));
}
