import Swal from "sweetalert2";

// Base de datos falsa simulada
let fakeUsers = [
  { id: 1, correo: "admin@example.com", pass: "123456", rol: "admin" },
  { id: 2, correo: "gerente@example.com", pass: "123456", rol: "gerente" },
  { id: 3, correo: "operador@example.com", pass: "123456", rol: "operador" },
];

// Función para insertar usuarios falsos
export const InsertarUsuarios = async (p) => {
  try {
    // Verifica si el correo ya está en la base de datos falsa
    const existe = fakeUsers.find(user => user.correo === p.correo);
    if (existe) {
      throw new Error("Ya existe un usuario con ese correo");
    }

    // Si no existe, crea un nuevo usuario
    const nuevoUsuario = { ...p, id: fakeUsers.length + 1 }; // Asigna un ID único
    fakeUsers.push(nuevoUsuario); // Agrega el usuario a la lista

    return { success: true, usuario: nuevoUsuario }; // Retorna el usuario creado
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar usuario: " + error.message,
    });
    return { success: false };
  }
};

// Función para mostrar todos los usuarios falsos
export const MostrarUsuarios = async () => {
  try {
    // Simulamos un pequeño delay de 500ms para parecer más realista (opcional)
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true, usuarios: fakeUsers };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al mostrar usuarios: " + error.message,
    });
    return { success: false };
  }
};
