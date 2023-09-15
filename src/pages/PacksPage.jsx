import { useEffect, useState, useParams } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksPage() {
  const [packs, setPacks] = useState([]);
  const params = useParams();

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
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
        Pacotes disponíveis
      </h1>

      <div>
        {packs.map((pack) => {
          return (
            <div key={pack._id}>
              <h2>{pack.title}</h2>
              <h3>{pack.type}</h3>
              <p>{pack.wines}</p>
              <p>{pack.price}</p>
              <div>
                <Link to={`/detalhesdopack/${pack._id}`}>Ver detalhes</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PacksPage;
