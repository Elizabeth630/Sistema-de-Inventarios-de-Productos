import { Routes, Route } from "react-router-dom";
import { Home, Login, ProtectedRoute, useUsuariosStore } from "../index";
import { UserAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ErrorMolecula } from "../components/moleculas/ErrorMolecula";
import { MostrarEmpresa } from "../services/crudEmpresa"; // Sólo importamos MostrarEmpresa
import { Configuracion } from "../pages/Configuracion";
import {Marca} from "../pages/Marca";

export function MyRoutes() {
  const { user } = UserAuth(); // Usamos el contexto para obtener el usuario
  const { mostrarUsuarios, idusuario } = useUsuariosStore(); // Obtenemos idusuario de useUsuariosStore

  // Realizamos la consulta para obtener los usuarios
  const { data: datausuarios, isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios"],
    queryFn: mostrarUsuarios,
  });

  // Realizamos la consulta para obtener la empresa, pasando el id_usuario como parámetro
  const { data: dataempresa } = useQuery({
    queryKey: ["mostrar empresa"],
    queryFn: () => MostrarEmpresa({ idusaurio: idusuario }), // Pasamos idusuario como parámetro
    enabled: !!datausuarios
  });

  // Manejamos los estados de carga y error
  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <ErrorMolecula mensaje={error.message} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/configurar" element={<Configuracion/>}/>
      <Route path="/configurar/marca" element={<Marca/>}/>
    </Routes>
  );
}
