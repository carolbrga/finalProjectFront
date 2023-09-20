import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksPage() {
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    async function getPacks() {
      try {
        const response = await api.get("/packs/all");
        console.log(response.data);
        setPacks(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPacks();
  }, []);

  console.log("Checking packs");

  return (
    <>
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Pacotes disponíveis
      </h1>

      <div className="flex flex-wrap justify-center">
        {packs.map((pack) => {
          return (
            <div
              className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4 text-center"
              key={pack._id}
            >
              <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
                {pack.title}
              </h2>
              <p className="text-gray-400">Origem: {pack.origin}</p>
              <p className="text-gray-400">R$ {pack.price}</p>
              <div>
                <Link
                  to={`/detalhespacotes/packs/${pack._id}`}
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

export default PacksPage;
