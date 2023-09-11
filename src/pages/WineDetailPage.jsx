import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function WineDetailPage() {
  const params = useParams();
  console.log(params.id_wine);
  return (
    <div>
      <h1>Detalhes do vinho</h1>
    </div>
  );
}
export default WineDetailPage;
