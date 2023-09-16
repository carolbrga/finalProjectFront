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
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
        Criar Vinho
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Grape:</label>
          <select name="grape" onChange={handleChange} required>
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
          <label>Descrição:</label>
          <textarea
            name="description"
            value={wineData.description}
            onChange={handleChange}
            required
          />
          <label>Categoria</label>
          <select name="category" onChange={handleChange} required>
            <option>Selecione uma opção</option>
            <option value={"red"}>Red</option>
            <option value={"white"}>White</option>
            <option value={"rose"}>Rose</option>
          </select>
          <label>Alcool:</label>
          <input
            type="text"
            name="alcoholLevel"
            value={wineData.alcoholLevel}
            onChange={handleChange}
            required
          />
          <label>Ano:</label>
          <input
            type="text"
            name="year"
            value={wineData.year}
            onChange={handleChange}
            required
          />
          <label>Marca:</label>
          <input
            type="text"
            name="brand"
            value={wineData.brand}
            onChange={handleChange}
            required
          />
          <label>Origem:</label>
          <input
            type="text"
            name="origin"
            value={wineData.origin}
            onChange={handleChange}
            required
          />
          <label>Preço:</label>
          <input
            type="text"
            name="price"
            value={wineData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex mt-4 gap-2 justify-center">
          <button
            type="submit"
            className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Criar
          </button>
          <button
            onClick={() => window.history.back()}
            className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Descartar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWinePage;
