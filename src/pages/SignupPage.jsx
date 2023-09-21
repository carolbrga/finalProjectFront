import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    cpf: "",
    telephone: "",
    age: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState();

  // controll input
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getUrl(photo) {
    //photo = state com a foto guardada
    try {
      const multiPartForm = new FormData();

      multiPartForm.append("picture", photo);

      const response = await api.post("/upload/file", multiPartForm);

      console.log(response);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    //lógica de submit do form
    e.preventDefault();
    try {
      //chamada para api de upload
      const url = await getUrl(photo);

      const formWithPhoto = {
        ...form,
        profilePicture: url,
      };

      await axios.post("https://vinhosandvinhos.cyclic.cloud/user/signup", formWithPhoto);

      navigate("/login");
    } catch (error) {
      // lógico se der erro na requisição
      alert("Erro ao cadastrar usuário");
      console.log(error);
    }
  }

  function handlePhoto(e) {
    setPhoto(e.target.files[0]);
  }

  return (
    <div>
      <div className="flex min-h-screen justify-center items-center bg-white">
        <div className="sm:w-full sm:max-w-md p-8 rounded-lg shadow bg-white">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=900"
            alt="Wines & Wines"
          />
          <h2 className="mt-4 text-center text-2xl font-playfair font-bold leading-9 text-red-900">
            Cadastre-se na plataforma
          </h2>

          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Endereco
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  CPF
                </label>
                <div className="mt-2">
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    value={form.cpf}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Telephone
              </label>
              <div className="mt-2">
                <input
                  id="=telephone"
                  name="telephone"
                  type="text"
                  required
                  value={form.telephone}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Idade
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min={18}
                  value={form.age}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Foto de perfil
              </label>
              <div className="flex items-center mt-1 ">
                <label
                  htmlFor="photo"
                  className="w-full text-center cursor-pointer bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 rounded-md shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                Escolher Foto
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full justify-center rounded-md bg-amber-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow hover:bg-amber-900 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
              > 
                Cadastre-se
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500">
            Problemas com o cadastro?{" "}
            <a
              href="https://wa.me/+5511999999999/?text=Não%20consegui%20me%20cadastrar%20no%20site"
              className="font-semibold leading-6 text-red-900 hover:text-red-800"
              target="_blank"
              rel="noreferrer noopener"
            >
              Entre em contato com a gente
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

/* 
SEM AS CLASSES
<div>
   <div>
      <img
         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
         alt="Your Company"
      />
      <h2>Cadastre-se na plataforma</h2>

      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="email">Email</label>
            <div>
               <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
               />
            </div>
         </div>

         <div>
            <label htmlFor="password">Senha</label>
            <div>
               <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
               />
            </div>
         </div>

         <div>
            <label htmlFor="photo">Foto de perfil</label>
            <div>
               <label htmlFor="photo" className="cursor-pointer">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                     />
                  </svg>
                  Escolher Foto
               </label>
               <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePhoto}
                  className="hidden"
               />
            </div>
         </div>

         <div>
            <button type="submit">CADASTRE-SE</button>
         </div>
      </form>

      <p>
         Problemas com o cadastro?{" "}
         <a
            href="https://wa.me/+5511999999999/?text=Não%20consegui%20me%20cadastrar%20no%20site"
            target="_blank"
            rel="noreferrer noopener"
         >
            Entre em contato com a gente
         </a>
      </p>
   </div>
</div>

*/
