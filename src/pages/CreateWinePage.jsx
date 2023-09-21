import React, { useState } from "react";
import axios from "axios";
import api from "../axios/api";

const CreateWinePage = () => {
  const [wineData, setWineData] = useState({
    grape: "",
    description: "",
    category: "",
    alcoholLevel: "",
    year: "",
    brand: "",
    origin: "",
    price: "",
    photo:
      "https://www.corneyandbarrow.com/media/catalog/product/placeholder/default/placeholder-image-base.jpeg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWineData({ ...wineData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/wine/create-wine", wineData);
      console.log(response.data);
      alert("Vinho adicionado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Não foi possivel adicionar o vinho, verifique as informações");
    }
  };

  console.log(wineData);
  return (
    <div className="flex flex-col flex-wrap content-center">
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Criar Vinho
      </h1>
      <form
        className="sm:w-full sm:max-w-md p-8 rounded-lg shadow bg-white"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Grape:
        </label>
        <div className="mt-2">
          <select
            name="grape"
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            <option>Selecione uma opção</option>
            <option value={"Merlot"}>Merlot</option>
            <option value={"Cabernet Sauvignon"}>Cabernet Sauvignon</option>
            <option value={"Pinot Noir"}>Pinot Noir</option>
            <option value={"Malbec"}>Malbec</option>
            <option value={"Chardonnay"}>Chardonnay</option>
            <option value={"Sauvignon Blanc"}>Sauvignon Blanc</option>
            <option value={"Rose"}>Rose</option>
            <option value={"outro"}>Outro</option>
          </select>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Descrição:
        </label>
        <div className="mt-2">
          <textarea
            name="description"
            value={wineData.description}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Categoria
        </label>
        <div className="mt-2">
          <select
            name="category"
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          >
            <option>Selecione uma opção</option>
            <option value={"red"}>Red</option>
            <option value={"white"}>White</option>
            <option value={"rose"}>Rose</option>
          </select>
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Alcool:
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="alcoholLevel"
            value={wineData.alcoholLevel}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Ano:
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="year"
            value={wineData.year}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Marca:
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="brand"
            value={wineData.brand}
            onChange={handleChange}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-text-gray-400 focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
        <label className="block text-sm font-medium leading-6 text-gray-900 mt-4">
          Origem:
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="origin"
            value={wineData.origin}
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
            value={wineData.price}
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
};

export default CreateWinePage;
