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
        const response = await api.get("/packs/get-all");
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
      <div className="relative mb-4">
        <img
          className="h-full w-full object-cover rounded-md"
          src="https://mybartender.com/wp-content/uploads/2023/06/best-sweet-red-wine.png"
        />
        <div className="flex justify-center absolute inset-0 bg-gradient-to-t from-black opacity-50 items-center text-5xl font-bold font-monserrat text-white">
          Wines & Wines
        </div>
      </div>
      <div>
        <h1 className="flex justify-center">Vinhos disponíveis</h1>
        <div className="flex flex-wrap justify-center">
          {wines.slice(0, visibleWines).map((wine) => {
            return (
              <div
                key={wine._id}
                className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
              >
                <img src={wine.photo} alt={wine.brand} />
                <h2>Marca: {wine.brand}</h2>
                <p>Safra: {wine.year}</p>
                <p>Origem: {wine.origin}</p>
                <Link to={`/detalhesdovinho/wine/${wine._id}`}>
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
      <div className="relative mb-4"></div>
      <div>
        <h1 className="flex justify-center">Pacotes disponíveis</h1>
        <div className="flex flex-wrap justify-center">
          {packs.slice(0, visiblePacks).map((pack) => {
            return (
              console.log(pack),
              (
                <div
                  key={pack._id}
                  className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
                >
                  <h2>{pack.title}</h2>
                  <h3>{pack.type}</h3>
                  <p>{pack.wines}</p>
                  <p>{pack.price}</p>

                  <Link to={`/detalhespacotes/packs/${pack._id}`}>
                    Ver detalhes &rarr;
                  </Link>
                </div>
              )
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
