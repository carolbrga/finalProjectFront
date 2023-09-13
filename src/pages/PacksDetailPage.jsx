import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksDetailPage() {
  const [packsDetail, setPacksDetail] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getPacksDetail() {
      try {
        const response = await api.get(`/packs/get-pack/${params.id_pack}`);
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
      await api.put(`/user/add-pack-history`, { id_pack: params.id_pack });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Pacotes disponíveis</h1>

      <div>
        <div
          key={packsDetail._id}
          className=" flex flex-col items-center text-center justify-center bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transition-transform duration-300 mb-2 gap-2"
        >
          <h2>{packsDetail.title}</h2>
          <h3>{packsDetail.price}</h3>
          <h3>{packsDetail.type}</h3>
          <p>{packsDetail.wines}</p>
          <p>{packsDetail.description}</p>
          <p>{packsDetail.origin}</p>
          <p>{packsDetail.delivery}</p>
          <div>
            <button
              onClick={handlePacksHistory}
              className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
            >
              Favoritar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PacksDetailPage;
