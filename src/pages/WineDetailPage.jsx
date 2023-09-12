import { useEffect, useState } from "react";
import api from "../axios/api";
import { useNavigate, useParams } from "react-router-dom";

function WineDetailPage() {
  const params = useParams();
  console.log(params.id_wine);

  const [wine, setWine] = useState({});
  const [alreadyFavorite, setAlreadyFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getWine() {
      try {
        const response = await api.get(`/wine/get-wine/${params.id_wine}`);
        setWine(response.data);

        const responseUser = await api.get(`/user/get-history-wine`);
        const historyArray = responseUser.data.history_wine;
        const wineFound = historyArray.find((wine) => {
          return wine._id === params.id_wine;
        });
        if (wineFound) setAlreadyFavorite(true);
        console.log(wineFound);

        console.log(historyArray);
      } catch (error) {
        console.log(error);
      }
    }

    getWine();
  }, []);
  console.log(wine);

  async function handleFavorite() {
    try {
      await api.put(`/user/add-wine-history`, { id_wine: params.id_wine });
      navigate("/todosvinhos");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveFavorite() {
    try {
      await api.put(`/user/remove-wine-history`, { id_wine: params.id_wine });
      navigate("/todosvinhos");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Detalhes do vinho</h1>

      <div className=" flex flex-col items-center text-center justify-center bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transition-transform duration-300 mb-2 gap-2">
        <h2 className="mt-4 text-2xl font-bold leading-9 text-gray-900">
          {wine.grape} - {wine.brand}
        </h2>
        <img src={wine.photo} />
        <p>{wine.description}</p>
        <p>País de origem: {wine.origin}</p>
        <p>Nível de álcool: {wine.alcoholLevel}%</p>
        <p>Safra: {wine.year}</p>
        <p>R$ {wine.price}</p>

        {alreadyFavorite === false && (
          <button
            onClick={handleFavorite}
            className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Favoritar esse vinho{" "}
          </button>
        )}

        {alreadyFavorite && (
          <button
            onClick={handleRemoveFavorite}
            className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Remover dos favoritos
          </button>
        )}
      </div>
    </>
  );
}
export default WineDetailPage;
