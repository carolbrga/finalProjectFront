import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../axios/api";

export default function CreatePack() {
  const [packData, setPackData] = useState({
    title: "",
    wines: [],
    description: "",
    type: "",
    delivery: "",
    origin: "",
    price: "",
    photo: "",
  });

  const [wines, setWines] = useState([]);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    async function getWines() {
      try {
        const response = await api.get("/wine/all");
        console.log(response.data);
        setWines(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getWines();
  }, []);
  console.log(wines);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackData({ ...packData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/packs/create-pack", packData);
      console.log(response.data);
      alert("Pack adicionado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Não foi possivel adicionar o pack, verifique as informações");
    }
  };

  const handleSelectWine = (e) => {
    const newArray = [...packData.wines, e.target.value];
    setPackData({ ...packData, wines: newArray });
    console.log(e.target.value);
  };

  console.log(packData);

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

  return (
    <div className="flex flex-col flex-wrap content-center">
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Criar pacote pré-definido
      </h1>
      <form
        className="sm:w-full sm:max-w-md p-8 rounded-lg shadow bg-white"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Seleção de Vinhos:
        </label>
        <div className="mt-2">
          <select
            name="title"
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            <option>Selecione uma opção</option>
            <option value={"Rose"}>Rosé</option>
            <option value={"Reds and Whites"}>Reds and Whites</option>
            <option value={"Reds"}>Reds</option>
            <option value={"Malbec"}>Malbec</option>
            <option value={"Whites"}>Whites</option>
            <option value={"Nationals"}>Nationals</option>
            <option value={"Imports"}>Rose</option>
          </select>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Imagem do pacote:
        </label>
        <div className="mt-2">
          <input
            id="photo"
            name="photo"
            type="text"
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Wines:
        </label>
        <div className="mt-2">
          <select
            name="wines"
            onChange={handleSelectWine}
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            {wines.map((wine) => {
              return (
                <option key={wine._id} value={wine._id}>
                  {wine.grape} {wine.category}
                </option>
              );
            })}
          </select>
        </div>

        <p className="block text-sm text-center font-medium leading-6 text-gray-900 mt-4 ">
          Vinhos selecionados
        </p>
        <div className="mt-2">
          {packData.wines.map((wineId) => {
            const wine = wines.find((wine) => {
              return wine._id === wineId;
            });

            return (
              <p
                key={wine._id}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 mt-2 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
              >
                {wine.grape} - {wine.category}
              </p>
            );
          })}
        </div>

        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Descrição:
        </label>
        <div className="mt-2">
          <textarea
            name="description"
            value={packData.description}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Tamanho:
        </label>
        <div className="mt-2">
          <select
            name="type"
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            <option>Selecione o tamanho do seu pack</option>
            <option value={"2 pack"}>2 pack</option>
            <option value={"4 pack"}>4 pack</option>
            <option value={"6 pack"}>6 pack</option>
          </select>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Retirada:
        </label>
        <div className="mt-2">
          <select
            name="delivery"
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            <option>Selecione o modo de retirada</option>
            <option value={"Pick up"}>Retirar na loja</option>
            <option value={"Delivery"}>Delivery</option>
          </select>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Origem:
        </label>
        <div className="mt-2">
          <textarea
            type="text"
            name="origin"
            value={packData.origin}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>

        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Preço:
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="price"
            value={packData.price}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-amber-950 mt-2 px-3 py-2 text-sm font-semibold leading-6 text-white shadow hover:bg-amber-900 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            Criar
          </button>
          <button
            onClick={() => window.history.back()}
            className="w-full justify-center rounded-md bg-amber-950 mt-2 px-3 py-2 text-sm font-semibold leading-6 text-white shadow hover:bg-amber-900 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            Descartar
          </button>
        </div>
      </form>
    </div>
  );
}
