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
      <h1 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 text-gray-900">
      {packsDetail.title}
      </h1>

      <div>
        <div
          key={packsDetail._id}
          className=" flex flex-col items-center text-center justify-center bg-white rounded-lg shadow-sm p-2 ring-1 ring-offset-2 ring-gray-200 transition-transform duration-300 mb-2 gap-2"
        >
          <h3>Tamanho: {packsDetail.type}</h3>
          <p>Origem: {packsDetail.origin}</p>
          <p>Forma de retirada: {packsDetail.delivery}</p>
          <h3>R${packsDetail.price}</h3>
          <p>Mais detalhes:{packsDetail.description}</p>
          <h2>Vinhos selecionados neste pack:</h2>
          <div className="flex flex-wrap justify-center">
            {packsDetail.wines?.map((wine) => (
              <div key={wine.id} className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-1 m-4 w-1/4 text-center">
                <img src={wine.photo} className="w-15" />
                <h3>{wine.grape}</h3>
                <p>Descrição deste pack: {wine.description}</p>
                <p>R${wine.price}</p>
                <Link to={`/detalhesdovinho/wine/${wine._id}`}
                className="text-red-900 hover:text-burgundy mt-2 block">
                  Ver detalhes
                </Link>
              </div>
            ))}{" "}
          </div>
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
