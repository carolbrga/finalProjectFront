import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WinePage(){
    const navigate = useNavigate();
const [wines, setWines] = useState([]);

useEffect(() => {
async function getWines() {
const response = await api.get("/wine/get-all")
}

}, []);

return (
    <div>
<h1>Vinhos disponíveis</h1>
    </div>
)

}

export default WinePage;