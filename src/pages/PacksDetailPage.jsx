import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksDetailPage() {
  const [packsDetail, setPacksDetail] = useState([]);

  const params = useParams();


  useEffect(() => {
    async function getPacksDetail() {
      try {
        const response = await api.get(`/packs/${params.id_packs}`);
        console.log(response.data);
        setPacksDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPacksDetail();
  }, []);

  console.log(packsDetail);

  async function handlePacksHistory() {
    try {
      await api.post(`"/add-pack-history/${params.id_packs}`);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h1>Pacotes disponíveis</h1>

      <div>
        
          return (
            <div key={packsDetail._id}>
              <h2>{packsDetail.title}</h2>
              <h3>{packsDetail.price}</h3>
              <h3>{packsDetail.type}</h3>
              <p>{packsDetail.wines}</p>
              <p>{packsDetail.description}</p>
              <p>{packsDetail.origin}</p>
              <p>{packsDetail.delivery}</p>
              <div>
                <button onClick={handlePacksHistory}>Favoritar</button>
              </div>
            </div>
          );
        
      </div>
    </div>
  );
}

export default PacksDetailPage;
