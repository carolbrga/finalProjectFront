import api from "../axios/api";
import { useState, useEffect } from "react";

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

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>PROFILE</h1>
      <div>
        <h1>Nome: {user.name}</h1>
        <p>Email: {user.email}</p>
        <p>CPF: {user.cpf}</p>
        <p>Telefone: {user.telephone}</p>
        <p>Idade: {user.age}</p>
        <p>Endereço: {user.address}</p>
      </div>

      <div>
        <img src={user.profilePicture} alt="Foto do usuário" />
      </div>
    </div>
  );
}

export default ProfilePage;
