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

  const titleStyle = {
    fontFamily: "Playfair Display, serif",
    fontSize: "2rem",
    color: "#7c2d12",
  };
  const cardTitleStyle = {
    fontFamily: "Playfair Display, serif",
    fontSize: "1.5rem",
    color: "#7c2d12",
  };

  const cardTextStyle = {
    fontFamily: "Lora, serif",
    fontSize: "1rem",
  };

  const companyNameStyle = {
    fontFamily: "Playfair Display, serif",
    fontSize: "4rem",
    fontWeight: "bold",
  };


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
      <div className="relative w-full">
        <img
          className="w-screen h-auto object-cover "
          src="https://mybartender.com/wp-content/uploads/2023/06/best-sweet-red-wine.png"
          alt="Garrafas de Vinho"
        />

        <div className="flex justify-center absolute inset-0 bg-gradient-to-t from-red-900 to-burgundy opacity-80 items-center text-5xl font-bold text-white">
          <span style={companyNameStyle}>Wines & Wines</span>
        </div>
      </div>
      <div>
        <h1
          style={titleStyle}
          className="text-4xl font-semibold text-center mt-8 mb-4 text-burgundy"
        >
          Vinhos disponíveis
        </h1>
        <div className="flex flex-wrap justify-center">
          {wines.map((wine) => {
            return (
              <div
                key={wine._id}
                className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4"
              >
                <img src={wine.photo} className="w-full rounded-md" />
                <h2
                  style={cardTitleStyle}
                  className="text-2xl font-semibold text-burgundy mt-2"
                >
                  Marca: {wine.brand}
                </h2>
                <p style={cardTextStyle} className="text-gray-400">
                  Safra: {wine.year}
                </p>
                <p style={cardTextStyle} className="text-gray-400">
                  Origem: {wine.origin}
                </p>
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
      </div>
      <div className="relative mb-4"></div>
      <div>
        <h1
          style={titleStyle}
          className="text-4xl font-semibold text-center mt-8 mb-4 text-burgundy"
        >
          Pacotes disponíveis
        </h1>
        <div className="flex flex-wrap justify-center">
          {packs.map((pack) => {
            return (
              <div
                key={pack._id}
                className="bg-white rounded-lg shadow-lg p-4 mx-4 my-4 w-1/4"
              >
                <h2
                  style={cardTitleStyle}
                  className="text-2xl font-semibold text-burgundy mt-2"
                >
                  {pack.title}
                </h2>
                <h3 style={cardTextStyle} className="text-gray-400">
                  {pack.type}
                </h3>
                <p style={cardTextStyle} className="text-gray-400">
                  {pack.wines}
                </p>
                <p style={cardTextStyle} className="text-gray-400">
                  {pack.price}
                </p>

                <Link
                  to={`/detalhespacotes/packs/${pack._id}`}
                  className="text-red-900 hover:text-burgundy mt-2 block"
                >
                  Ver detalhes
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
