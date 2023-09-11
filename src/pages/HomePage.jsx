import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios/api";
import PacksPage from "./PacksPage";

export default function HomePage() {
  const [wines, setWines] = useState([]);
  const [packs, setPacks] = useState([]);
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

  return (
    <main>
      <div className="relative mb-4">
        <img
          className="h-full w-full object-cover rounded-md"
          src="https://mybartender.com/wp-content/uploads/2023/06/best-sweet-red-wine.png"
        />
        <div className=" flex justify-center text-white absolute inset-0 bg-gradient-to-t from-black opacity-50 items-center">
          Vinhos & Vinhos
        </div>
      </div>
      <div>
        <h1>Vinhos disponíveis</h1>
        <div className="flex flex-wrap justify-center">
          {wines.map((wine) => {
            return (
              <div
                key={wine._id}
                className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
              >
                <h2>Marca: {wine.brand}</h2>
                <p>Safra: {wine.year}</p>
                <p>origin: {wine.origin}</p>
                <Link to="/detalhesdovinho/">Mais detalhes &rarr;</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative mb-4"></div>
      <div>
        <h1>Pacotes disponíveis</h1>
        <div className="flex flex-wrap justify-center">
          {packs.map((pack) => {
            return (
              <div
                key={pack._id}
                className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
              >
                <h2>{pack.title}</h2>
                <h3>{pack.type}</h3>
                <p>{pack.wines}</p>
                <p>{pack.price}</p>

                <Link to="/detalhesdopack/">Mais detalhes &rarr;</Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
