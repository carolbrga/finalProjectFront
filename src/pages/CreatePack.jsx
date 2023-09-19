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

  return (
    <div>
      <h1>Criar Pack pré definido</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Seleção de Vinhos:</label>
          <select name="title" onChange={handleChange} required>
            <option>Selecione uma opção</option>
            <option value={"Rose"}>Rosé</option>
            <option value={"Reds and Whites"}>Reds and Whites</option>
            <option value={"Reds"}>Reds</option>
            <option value={"Malbec"}>Malbec</option>
            <option value={"Whites"}>Whites</option>
            <option value={"Nationals"}>Nationals</option>
            <option value={"Imports"}>Rose</option>
          </select>

          <label>Wines:</label>
          <select name="wines" onChange={handleSelectWine}>
            {wines.map((wine) => {
              return (
                <option key={wine._id} value={wine._id}>
                  {wine.grape} {wine.category}
                </option>
              );
            })}
          </select>

          <div>
            <p>Vinhos selecionados</p>
            <div>
              {packData.wines.map((wineId) => {
                const wine = wines.find((wine) => {
                  return wine._id === wineId;
                });

                return (
                  <p key={wine._id}>
                    {wine.grape} {wine.category}
                  </p>
                );
              })}
            </div>
          </div>
          <label>Descrição</label>
          <textarea
            name="description"
            value={packData.description}
            onChange={handleChange}
            required
          />

          <label>Tamanho</label>
          <select name="type" onChange={handleChange} required>
            <option>Selecione o tamanho do seu pack</option>
            <option value={"2 pack"}>2 pack</option>
            <option value={"4 pack"}>4 pack</option>
            <option value={"6 pack"}>6 pack</option>
          </select>

          <label>Retirada</label>
          <select name="delivery" onChange={handleChange} required>
            <option>Selecione o modo de retirada</option>
            <option value={"Pick up"}>Retirar na loja</option>
            <option value={"Delivery"}>Delivery</option>
          </select>

          <label>Origem</label>
          <textarea
            name="origin"
            value={packData.origin}
            onChange={handleChange}
            required
          />

          <label>Preço:</label>
          <input
            type="text"
            name="price"
            value={packData.price}
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
}
