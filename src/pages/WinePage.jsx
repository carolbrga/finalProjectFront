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

      <h1 className="flex justify-start">Vinhos:</h1>
      <div className="flex flex-wrap justify-center">
        {wines.map((wine) => {
          return (
            <div
              className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
              key={wine._id}
            >
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 text-gray-900">
                {wine.grape} - {wine.brand}
              </h2>
              <img  src={wine.photo}/>
              <p>{wine.origin}</p>
              <p>{wine.year}</p>
              <p>{wine.price}</p>
              <div>
                <Link to={`/detalhesdovinho/${wine._id}`}>Ver detalhes</Link>
              </div>
            </div>
          );
        })}
      </div>

    </>
  );
}

export default WinePage;
