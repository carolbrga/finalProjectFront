import api from "../axios/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  async function handleNavigateProfile() {
    try {
      <Link to="/" />;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteUser(e) {
    e.preventDefault();
    try {
      const response = await api.put(`/user/delete`);
      console.log(response);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 space-y-4 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300">
        <img
          src={user.profilePicture}
          className="mx-auto h-16 w-16 rounded-full"
          alt="Foto do usuário"
        />
        <h1 className="text-center text-3xl font-playfair font-bold text-red-900">
          Seu perfil
        </h1>

        {isEditing ? (
          <form className="mt-10 space-y-6" onSubmit={handleSubmitProfile}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formProfile.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email:
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formProfile.email}
                  onChange={handleInputChange}
                  className=" block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CPF:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formProfile.cpf}
                  onChange={handleInputChange}
                  className=" block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
              </div>
              <div>  
              <label
                htmlFor="age"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Idade:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="age"
                  name="age"
                  min={18}
                  value={formProfile.age}
                  onChange={handleInputChange}
                  className=" block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formProfile.telephone}
                  onChange={handleInputChange}
                  className=" block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Endereço:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formProfile.address}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-between ">
              <button
                type="submit"
                className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Salvar
              </button>
              <button>
                <Link
                  to="/"
                  className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                  onClick={handleNavigateProfile}
                >
                  Voltar
                </Link>
              </button>
              <button
                onClick={handleDeleteUser}
                className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Excluir conta
              </button>
            </div>

            
          </form>
        ) : (
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-700">
              Nome: {user.name}
            </h2>
            <p className="text-center text-gray-600">Email: {user.email}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Editar
              </button>
            </div>
          </div>
        )}
      </div>
      {isEditing ? null : (
        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-4 space-y-4 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-burgundy">
            Histórico de Vinhos:
          </h2>
          <div>
            {user.history_wine && user.history_wine.length > 0 ? (
              user.history_wine.map((wine) => (
                <div
                  key={wine._id}
                  className="bg-white rounded-lg shadow p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300"
                >
                  <p className="text-gray-700">Nome do Vinho: {wine.grape}</p>{" "}
                  <p className="text-gray-700">
                    Teor de Alcool: {wine.alcoholLevel}
                  </p>
                  <p className="text-gray-700">Marca: {wine.brand}</p>
                  {isEditing ? null : (
                    <button
                      onClick={() => handleDeleteWine(wine._id)}
                      className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                    >
                      Excluir
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700">
                Nenhum histórico de vinho disponível.
              </p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-burgundy">
              Histórico de Pacotes de Vinhos:
            </h2>
            <div>
              {user.history_pack && user.history_pack.length > 0 ? (
                user.history_pack.map((pack) => (
                  <div
                    key={pack._id}
                    className="bg-white rounded-lg shadow p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300"
                  >
                    <p className="text-gray-700">
                      Nome do Pacote: {pack.title}
                    </p>
                    {isEditing ? null : (
                      <button
                        onClick={() => handleDeletePack(pack._id)}
                        className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-700">
                  Nenhum histórico de pacote de vinho disponível.
                </p>
              )}
            </div>
            <Link
              to="/todosvinhos"
              className="bg-burgundy py-2 px-4 rounded-lg text-white hover:bg-red-900 focus:ring focus:ring-burgundy focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none focus:shadow-outline"
            >
              Escolha seus vinhos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
