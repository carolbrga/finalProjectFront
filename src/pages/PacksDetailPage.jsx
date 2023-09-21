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
        const responseUser = await api.get(`/user/profile`);
        console.log(responseUser);
        const historyArray = responseUser.data.history_pack;
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
      console.log(error);
    }
  }

  return (
    <>
<h1 className="text-2xl font-playfair font-semibold text-center mt-8 mb-4 text-gray-700">Sobre este pacote:</h1>
      <div className=" flex flex-col items-center text-center justify-center rounded-lg transition-transform duration-300 mb-2 gap-2">
      <h2 className="text-4xl font-playfair font-semibold text-red-900 mt-2">
        {packsDetail.title}
      </h2>
      <img className="max-h-96" src={packsDetail.photo}/>
        <div key={packsDetail._id}>
          <p className="text-gray-700 font-playfair text-xl">{packsDetail.description}</p>
          <p className="text-gray-700 font-playfair text-xl">Tamanho: {packsDetail.type}</p>
          <p className="text-gray-700 font-playfair text-xl">Origem: {packsDetail.origin}</p>
          <p className="text-gray-700 font-playfair text-xl">
            Forma de retirada: {packsDetail.delivery}
          </p>
          <p className="text-gray-700 font-playfair text-xl">Apenas R${packsDetail.price}</p>

          <h2 className="text-2xl font-playfair font-semibold text-red-900 my-2">
            Vinhos selecionados neste pack:
          </h2>
          <div className="flex flex-wrap justify-center">
            {packsDetail.wines?.map((wine) => (
              <div
                key={wine.id}
                className="bg-white rounded-lg shadow-sm p-2  ring-1 ring-offset-2 ring-gray-200 transform hover:scale-95 transition-transform duration-300 mb-2 m-4 w-1/4 text-center"
              >
                <img src={wine.photo} className="w-165" />
                <p className="font-playfair font-semibold text-red-900">
                  {wine.grape} - {wine.brand}
                </p>
                <p className="text-gray-700 mt-2 font-playfair ">
                  {wine.description}
                </p>
                <p className="text-gray-400 mt-2 ">Safra: {wine.year}</p>
                <p className="text-gray-400  mt-2">Origem: {wine.origin}</p>
                <p className="text-gray-400 mt-2">
                  Nível de álcool: {wine.alcoholLevel}%
                </p>
                <p className="text-gray-400 mt-2">Preço fora do pacote R${wine.price}</p>
                <Link
                  to={`/detalhesdovinho/wine/${wine._id}`}
                  className="text-red-900 hover:text-burgundy mt-2 block"
                >
                  Mais detalhes &rarr;
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
                className=" bg-amber-950 my-2 py-2 px-4 rounded-lg text-white hover:bg-amber-900"
              >
                Remover dos favoritos
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PacksDetailPage;
