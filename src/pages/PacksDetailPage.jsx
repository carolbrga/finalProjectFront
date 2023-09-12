import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksDetailPage() {
  const [packsDetail, setPacksDetail] = useState([]);

  useEffect(() => {
    async function getPacksDetail() {
      try {
        const response = await api.get("/packs/all");
        console.log(response.data);
        setPacksDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPacksDetail();
  }, []);

  console.log(packsDetail);

  return (
    <div>
      <h1>Pacotes disponíveis</h1>

      <div>
        {packsDetail.map((packDetail) => {
          return (
            <div key={packDetail._id}>
              <h2>{packDetail.title}</h2>
              <h3>{packDetail.price}</h3>
              <h3>{packDetail.type}</h3>
              <p>{packDetail.wines}</p>
              <p>{packDetail.description}</p>
              <p>{packDetail.origin}</p>
              <p>{packDetail.delivery}</p>
              <div>
                <Link to={`/detalhesdopack/${packDetail._id}`}>
                  Ver detalhes
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PacksDetailPage;
