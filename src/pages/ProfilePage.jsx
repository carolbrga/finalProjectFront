import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [formProfile, setFormProfile] = useState({
    name: "",
    email: "",
    cpf: "",
    telephone: "",
    age: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const id_user = localStorage.getItem("userId");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setFormProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, [reload]);

  async function handleSubmitProfile(e) {
    e.preventDefault();
    try {
      await api.put(`/user/edit/${id_user}`, formProfile);
      setReload(!reload);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormProfile({
      ...formProfile,
      [name]: value,
    });
  }

  async function handleDeleteWine(id_wine) {
    try {
      await api.put(`/user/remove-wine-history`, { id_wine });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePack(id_pack) {
    try {
      await api.put(`/user/delete-pack-history`, { id_pack });
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
          {isEditing ? (
            <form onSubmit={handleSubmitProfile}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formProfile.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formProfile.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cpf"
                  className="block text-gray-700 font-bold mb-2"
                >
                  CPF:
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formProfile.cpf}
                  onChange={handleInputChange}
                  className="block text-gray-700 font-bold mb-2"
                />
                <label
                  htmlFor="age"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Idade:
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formProfile.age}
                  onChange={handleInputChange}
                  className="block text-gray-700 font-bold mb-2"
                />
                <label
                  htmlFor="telephone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Telefone:
                </label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formProfile.telephone}
                  onChange={handleInputChange}
                  className="block text-gray-700 font-bold mb-2"
                />
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Endereço:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formProfile.address}
                  onChange={handleInputChange}
                  className="block text-gray-700 font-bold mb-2"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1>Nome: {user.name}</h1>
              <p>Email: {user.email}</p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                >
                  Editar
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <img
            src={user.profilePicture}
            className="mx-auto h-16 w-16 rounded-full"
            alt="Foto do usuário"
          />
        </div>
        {isEditing ? null : (
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
                    <p>Teor de Alcool: {wine.alcoholLevel}</p>
                    <p>Marca: {wine.brand}</p>
                    {isEditing ? null : (
                      <button
                        onClick={() => handleDeleteWine(wine._id)}
                        className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>Nenhum histórico de vinho disponível.</p>
              )}
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
                Histórico de Pacotes de Vinhos:
              </h2>
              <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2 space-between">
                {user.history_pack && user.history_pack.length > 0 ? (
                  user.history_pack.map((pack) => (
                    <div
                      key={pack._id}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2"
                    >
                      Nome do Pacote: {pack.title}{" "}
                      {isEditing ? null : (
                        <div>
                          <button
                            onClick={() => handleDeletePack(pack._id)}
                            className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                          >
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Nenhum histórico de pacote de vinho disponível.</p>
                )}
              </div>
              <Link
                to="/todosvinhos"
                className="bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2"
              >
                Escolha seus vinhos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProfilePage;
