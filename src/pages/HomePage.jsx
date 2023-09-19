import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios/api";
import PacksPage from "./PacksPage";
import PacksDetailPage from "./PacksDetailPage";
import WinePage from "./WinePage";
import WineDetailPage from "./WineDetailPage";

export default function HomePage() {
  const [wines, setWines] = useState([]);
  const [packs, setPacks] = useState([]);
  const [visibleWines, setVisibleWines] = useState(6);
  const [visiblePacks, setVisiblePacks] = useState(6);

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
  console.log(packs);

  return (
    <main>
      <div className="relative w-full">
        <img
          className="w-screen h-auto object-cover "
          src="https://mybartender.com/wp-content/uploads/2023/06/best-sweet-red-wine.png"
          alt="Garrafas de Vinho"
        />

        <div className="flex justify-center absolute inset-0 bg-gradient-to-t from-red-900 to-burgundy opacity-80 items-center text-5xl font-bold text-white">
          <span className="font-playfair">Wines & Wines</span>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
          Vinhos disponíveis
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
                <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
                {wine.grape} - {wine.brand}
                </h2>
                <p className="text-gray-400">Safra: {wine.year}</p>
                <p className="text-gray-400">Origem: {wine.origin}</p>
                <p className="text-gray-400">R$ {wine.price}</p>
                <Link
                  to={`/detalhesdovinho/wine/${wine._id}`}
                  className="text-red-900 hover:text-burgundy mt-2 block"
                >
                  Mais detalhes &rarr;
                </Link>
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
      <div className="relative mb-4"></div>
      <div>
        <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
          Pacotes disponíveis
        </h1>

        <div className="flex flex-wrap justify-center">
          {packs.slice(0, visiblePacks).map((pack) => {
            return (
              <div
                key={pack._id}
                className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4 text-center"
              >
                <h2 className="text-2xl font-playfair font-semibold text-red-900 mt-2">
                 {pack.title}
                </h2>


                <p className="text-gray-400">Origem: {pack.origin}</p>
                <p className="text-gray-400">{pack.wines}</p>
                <p className="text-gray-400">R$ {pack.price}</p>


                <Link
                  to={`/detalhespacotes/packs/${pack._id}`}
                  className="text-red-900 hover:text-burgundy mt-2 block"
                >
                  Mais detalhes &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {visiblePacks < packs.length && (
          <button
            onClick={() => setVisiblePacks(visiblePacks + 6)}
            className="mr-2 bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
          >
            Ver mais pacotes
          </button>
        )}
      </div>
    </main>
  );
}
