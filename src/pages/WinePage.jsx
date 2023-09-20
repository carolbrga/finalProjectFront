import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function WinePage() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    async function getWines() {
      try {
        const response = await api.get("/wine/get-all");
        console.log(response.data);
        setWines(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getWines();
  }, []);

  console.log(wines);

  return (
    <>
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Vinhos disponíveis
      </h1>
      <div className="flex flex-wrap justify-center">
        {wines.map((wine) => {
          return (
            <div
              className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4 text-center"
              key={wine._id}
            >
              <img className="w-full" src={wine.photo} />
              <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
               {wine.grape} - {wine.brand}
              </h2>
              <p className="text-gray-400">Safra: {wine.year}</p>
              <p className="text-gray-400">Origem: {wine.origin}</p>
              <p className="text-gray-400">R$ {wine.price}</p>
              <div>
                <Link
                  to={`/detalhesdovinho/wine/${wine._id}`}
                  className="text-red-900 hover:text-burgundy mt-2 block"
                >
                  Mais detalhes &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WinePage;
