import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function PacksDetailPage() {
  const [packsDetail, setPacksDetail] = useState([]);
  const [alreadyFavorite, setAlreadyFavorite] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    async function getPacksDetail() {
      try {
        const response = await api.get(`/packs/get-pack/${params.id_pack}`);
        console.log(response.data);
        setPacksDetail(response.data);
        const responseUser = await api.get(`/user/profile`)
        const historyArray = responseUser.data.history_pack;
        console.log(responseUser)
        const packFound = historyArray.find((pack) => {
            return pack._id === params.id_pack;
          });
          if (packFound) setAlreadyFavorite(true);
          
                
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

    async function handleRemovePackHistory() {
        try {
            await api.put(`/user/delete-pack-history`, { id_pack: params.id_pack });
      navigate("/profile");
        } catch (error) {
            console.log(error)
        }
    }
  
        

  return (
    <div>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 text-gray-900">
        Pacotes disponíveis
      </h1>

      <div>
        <div
          key={packsDetail._id}
          className=" flex flex-col items-center text-center justify-center bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transition-transform duration-300 mb-2 gap-2"
        >
          <h2>{packsDetail.title}</h2>
          <h3>{packsDetail.price}</h3>
          <h3>{packsDetail.type}</h3>
          <p>
            {packsDetail.wines?.map((wine) => (
              <div key={wine.id}>
                <img src={wine.photo} className="w-10" />
                <h3>{wine.grape}</h3>
                <p>{wine.description}</p>
                <p>Price: ${wine.price}</p>
              </div>
            ))}{" "}
          </p>
          <p>{packsDetail.description}</p>
          <p>{packsDetail.origin}</p>
          <p>{packsDetail.delivery}</p>
          <div>
            {alreadyFavorite === false && (
              <button
                onClick={handlePacksHistory}
                className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Favoritar esse pack{" "}
              </button>
            )}

            {alreadyFavorite && (
              <button
                onClick={handleRemovePackHistory}
                className=" bg-amber-950 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Remover dos favoritos
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PacksDetailPage;
