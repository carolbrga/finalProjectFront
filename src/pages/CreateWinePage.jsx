import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post("/api/wines/create-wine", wineData);
      console.log(response.data);
      alert("Vinho adicionado com sucesso");
    } catch (error) {
      console.error(error);
      alert("Não foi possivel adicionar o vinho, verifique as informações");
    }
  };

  return (
    <div>
      <h1>Criar Vinho</h1>
      <form onSubmit={handleSubmit}>
        <label>Grape:</label>
        <input
          type="text"
          name="grape"
          value={wineData.grape}
          onChange={handleChange}
          required
        />
        <label>Descrição:</label>
        <textarea
          name="description"
          value={wineData.description}
          onChange={handleChange}
          required
        />
        <label>Categoria</label>
        <input
          type="text"
          name="category"
          value={wineData.category}
          onChange={handleChange}
          required
        />
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
          type="number"
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
        <label>Foto:</label>
        <input
          type="file"
          name="photo"
          value={wineData.photo}
          onChange={handleChange}
          required
        />

        <button type="submit">Criar</button>
        <button onClick={() => window.history.back()}>Descartar</button>
      </form>
    </div>
  );
};

export default CreateWinePage;
