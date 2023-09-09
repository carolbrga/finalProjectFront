import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { Link } from "react-router-dom";

function WinePage(){
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
<h1>Vinhos disponíveis</h1>
    <div>
{wines.map((wine) =>{
    return (
        <div key={wine._id}>
<h2>{wine.brand} - {wine.grape}</h2>
<p>{wine.description}</p>
<p>{wine.origin}</p>
<p>{wine.year}</p>
<p>{wine.alcoholLevel}</p>
<p>{wine.category}</p>
<p>{wine.year}</p>
<p>{wine.price}</p>
<div>
    <Link to={`/detalhesdovinho/${wine._id}`}>Ver detalhes</Link>
</div>
        </div>
    )
})}

    </div>
    
    </>
)

}

export default WinePage;