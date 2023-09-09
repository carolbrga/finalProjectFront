import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

function ProfilePage() {
  const [user, setUser] = useState({});

  const id_user = localStorage.getItem("userId");

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);
  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      await api.put("/user/edit", formProfile);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
          PROFILE
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2">
          <h1>Nome: {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>CPF: {user.cpf}</p>
          <p>Telefone: {user.telephone}</p>
          <p>Idade: {user.age}</p>
          <p>Endereço: {user.address}</p>
        </div>
        <div>
          <img
            src={user.profilePicture}
            className="mx-auto h-16 w-16 rounded-full"
            alt="Foto do usuário"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
            Histórico de Vinhos:
          </h2>
          <div>
            {user.history_wine && user.history_wine.length > 0 ? (
              user.history_wine.map((wine) => (
                <div
                  key={wine._id}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2"
                >
                  <p>Nome do Vinho: {wine.grape}</p>{" "}
                  <p>Teor de Alcool:{wine.alcoholLevel}</p>
                  <p>Marca: {wine.brand}</p>
                </div>
              ))
            ) : (
              <p>Nenhum histórico de vinho disponível.</p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
            Histórico de Pacotes de Vinhos:
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2">
            {user.history_pack && user.history_pack.length > 0 ? (
              user.history_pack.map((pack) => (
                <div key={pack._id}>
                  Nome do Pacote: {pack.nome}{" "}
                  {/* Substituir 'nome' pelo campo correto */}
                  {/* Outros dados do pacote, caso necessário */}
                </div>
              ))
            ) : (
              <p>Nenhum histórico de pacote de vinho disponível.</p>
            )}
          </div>
        </div>
      </div>

      <Link
        to="/todosvinhos"
        className="bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2"
      >
        Escolha seus vinhos
      </Link>
    </div>
  );
}

export default ProfilePage;
