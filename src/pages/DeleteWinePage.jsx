import React, { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
export default function DeleteWinePage() {
  const [wines, setWines] = useState([]);
  const [visibleWines, setVisibleWines] = useState(6);
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
 
  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
        Deletar Vinho
      </h1>
      <div className="flex flex-wrap justify-center">
        {wines.slice(0, visibleWines).map((wine) => {
          return (
            <div
              key={wine._id}
              className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4 text-center"
            >
              <img
                src={wine.photo}
                className="w-full rounded-md"
                alt={wine.brand}
              />
              <h1 className="text-sm font-playfair font-semibold text-red-900 mt-2">
                Código: {wine._id}
              </h1>
              <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
                Marca: {wine.brand}
              </h2>
              <p className="text-gray-400">Safra: {wine.year}</p>
              <p className="text-gray-400">Origem: {wine.origin}</p>
              <Link
                to={`/detalhesdovinho/wine/${wine._id}`}
                className="text-red-900 hover:text-burgundy mt-2 block"
              >
                Mais detalhes &rarr;
              </Link>
              <button
                onClick={() => handleDeleteWine(wine._id)}
                className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Excluir este vinho
              </button>
            </div>
          );
        })}
      </div>
      {visibleWines < wines.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleWines(visibleWines + 6)}
            className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Ver mais vinhos
          </button>
        </div>
      )}
    </div>
  );
}
