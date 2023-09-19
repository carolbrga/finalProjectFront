import React, { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {


  

  
  return (
    <div>
      <h1>Admin</h1>
<div className="flex flex-wrap justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 m-4 w-1/4 text-center">
     
      <Link to="/create-wine">
        <button className="flex flex-col items-center justify-center bg-amber-950 py-4 px-8 rounded-lg text-white hover:bg-amber-900"><img
            src="https://www.corneyandbarrow.com/media/catalog/product/placeholder/default/placeholder-image-base.jpeg"
            alt="Wine img"
            className="w-16 mr-2"></img>
            <br></br>
            Criar Vinhos
        </button>
      </Link>

      <Link to="/create-pack">
        <button className="flex flex-col items-center justify-center bg-amber-950 py-4 px-8 rounded-lg text-white hover:bg-amber-900"><img
            src="https://www.packagingsource.com/resize/Shared/Images/Product/Open-Style-Wine-Bottle-Carrier-Kraft-4-Bottle/open-style-wine-packaging.jpg?bw=1000&w=1000&bh=1000&h=1000"
            alt="Pack img"
            className="w-16 mr-2"></img>
            <br></br>
            Criar Packs
        </button>
      </Link>

      <Link to="/delete-wine">
        <button className="flex flex-col items-center justify-center bg-amber-950 py-4 px-8 rounded-lg text-white hover:bg-amber-900"><img
            src="https://www.corneyandbarrow.com/media/catalog/product/placeholder/default/placeholder-image-base.jpeg"
            alt="Wine img"
            className="w-16 mr-2"></img>
            <br></br>
            Deletar Vinhos
        </button>
      </Link>

      <Link to="/delete-pack">
        <button className="flex flex-col items-center justify-center bg-amber-950 py-4 px-8 rounded-lg text-white hover:bg-amber-900"><img
            src="https://www.packagingsource.com/resize/Shared/Images/Product/Open-Style-Wine-Bottle-Carrier-Kraft-4-Bottle/open-style-wine-packaging.jpg?bw=1000&w=1000&bh=1000&h=1000"
            alt="Pack img"
            className="w-16 mr-2"></img>
            <br></br>
            Deletar Packs
        </button>
      </Link>

      </div>
         </div> 
      </div>
    
  );
}
