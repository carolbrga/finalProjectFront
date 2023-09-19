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
      <h1 className="flex justify-start">Pacotes disponíveis</h1>

      <div className="flex flex-wrap justify-center">
        {packs.map((pack) => {
          return (
            <div
              className=" bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4"
              key={pack._id}
            >
              <h2>{pack.title}</h2>
              <h3>{pack.type}</h3>
              <p>{pack.wines}</p>
              <p>{pack.price}</p>
              <div>
                <Link to={`/detalhespacotes/packs/${pack._id}`}>
                  Ver detalhes
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
