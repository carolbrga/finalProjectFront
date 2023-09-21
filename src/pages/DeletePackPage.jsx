import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios/api";

export default function DeletePackPage() {
  const [packs, setPacks] = useState([]);
  const [reload, setReload] = useState(false);

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
  }, [reload]);
  console.log(packs);

  async function deletePack(pack_id) {
    try {
      await api.delete(`/packs/delete/${pack_id}`);
      setReload(!reload);
    } catch (error) {
      console.log("Erro ao deletar");
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Deletar pacotes
      </h1>
      <div className="flex flex-wrap justify-center">
        {packs.map((pack) => {
          return (
            <div
              key={pack._id}
              className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4 text-center"
            >
              <img src={pack.photo} alt={pack.brand} />
              <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
                {pack.title}
              </h2>
              <p className="text-gray-400">Tamanho: {pack.type}</p>
              <p className="text-gray-400">Origem: {pack.origin}</p>
              <Link
                to={`/detalhespacotes/packs/${pack._id}`}
                className="text-red-900 hover:text-burgundy mt-2 block"
              >
                Mais detalhes &rarr;
              </Link>

              <button
                onClick={() => deletePack(pack._id)}
                className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Deletar este pack
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
