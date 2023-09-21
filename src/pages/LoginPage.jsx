import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://vinhosandvinhos.cyclic.cloud/user/login",
        form
      );
      if (response.data.user.active === false) {
        alert("Usuário inativo");
        return;
      }
      //Faça a requisição para a rota /login da sua api aqui.
      let admins = ["email@gmail.com", "ciwap@ig.com.br", "vinhos@gmail.com"];
      //GUARDAR O TOKEN E ID DE QUEM LOGOU
      const token = response.data.token;
      const userId = response.data.user._id;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);

      if (admins.includes(response.data.user.email)) {
        localStorage.setItem("admin", true);
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      // lógica se der erro na requisição
      console.log(error);
    }
  }

  function handleRadio(e) {
    setUserType(e.target.value);
  }
  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      <div className=" sm:w-full sm:max-w-sm p-8 rounded-lg shadow bg-white">
        <img
          className="mx-auto h-16 w-16 rounded-full"
          src="https://img.freepik.com/fotos-gratis/copo-de-vinho-tinto-e-garrafa-no-balcao-de-bar_107420-65845.jpg?size=626&ext=jpg"
          alt="Wines & Wines"
        />
        <h2 className="mt-10 text-center text-2xl font-playfair font-bold leading-9 text-red-900">
          Entre na sua conta
        </h2>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
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
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none "
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
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none "
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md bg-amber-950 py-2 px-3 text-sm font-semibold leading-6 text-white shadow hover:bg-amber-900 focus:ring focus:ring-red-900 "
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-xs text-gray-500">
          Problemas com o login?{" "}
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
  );
}

export default LoginPage;

/* 
VERSÃO SEM ESTILO
  <div>
      <div>
         <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
         />
         <h2>Entre na sua conta</h2>

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
                     autoComplete="current-password"
                     required
                     value={form.password}
                     onChange={handleChange}
                  />
               </div>
            </div>

            <div>
               <button type="submit">Entrar</button>
            </div>
         </form>
      </div>
   </div>

*/
