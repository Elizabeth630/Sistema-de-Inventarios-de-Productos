import { createContext, useContext, useState, useEffect } from "react";

// Crear contexto de autenticación
const AuthContext = createContext();

// Datos falsos de usuarios
const fakeUsers = [
  { id: 1, correo: "admin@example.com", pass: "123456", rol: "admin" },
  { id: 2, correo: "gerente@example.com", pass: "123456", rol: "gerente" },
  { id: 3, correo: "operador@example.com", pass: "123456", rol: "operador" },
];

// Proveedor del contexto
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulamos la autenticación con datos falsos
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Si hay un usuario guardado en localStorage, se lo asignamos al estado
    }
  }, []);

  // Función para simular el login con datos falsos
  const signInWithEmail = (p) => {
    const userFound = fakeUsers.find(
      (user) => user.correo === p.correo && user.pass === p.pass
    );

    if (userFound) {
      setUser(userFound);
      localStorage.setItem("user", JSON.stringify(userFound)); // Guardamos el usuario en localStorage
    }

    return userFound;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Limpiamos el localStorage al hacer logout
  };

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Cambia UserAuth a un componente funcional
export const UserAuth = () => {
  return useContext(AuthContext);
};

