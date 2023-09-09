import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../axios/api";
export default function HomePage() {
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

  return (
    <main>
      <div className="relative mb-4">
        <img
          className="h-full w-full object-cover rounded-md"
          src="https://mybartender.com/wp-content/uploads/2023/06/best-sweet-red-wine.png"
        />
      </div>
      <div>
        <h1>Vinhos disponíveis</h1>
        <div>
          {wines.map((wine) => {
            return (
              <div
                key={wine._id}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2"
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
    </main>
  );
}
