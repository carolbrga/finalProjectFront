import React, { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  return (
    <>
      <h1 className="text-4xl font-playfair font-semibold text-center mt-8 mb-4 text-red-900">
        Admin
      </h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2">
          <div>
            <Link to="/create-wine">
              <button className="bg-white py-4 px-8 rounded-lg font-bold text-red-900 hover:bg-red-950 hover:text-white w-full max-h-36">
                <img
                  src="https://www.corneyandbarrow.com/media/catalog/product/placeholder/default/placeholder-image-base.jpeg"
                  alt="Wine img"
                  className="w-20 h-20 mx-auto mb-2"
                ></img>
                Criar Vinhos
              </button>
            </Link>
          </div>
          <div>
            <Link to="/create-pack">
              <button className="bg-white py-4 px-8 rounded-lg font-bold text-red-900 hover:bg-red-950 hover:text-white w-full max-h-36">
                <img
                  src="https://www.packagingsource.com/resize/Shared/Images/Product/Open-Style-Wine-Bottle-Carrier-Kraft-4-Bottle/open-style-wine-packaging.jpg?bw=1000&w=1000&bh=1000&h=1000"
                  alt="Pack img"
                  className="w-20 h-20 mx-auto mb-2"
                ></img>
                Criar Packs
              </button>
            </Link>
          </div>

          <div>
            <Link to="/delete-wine">
              <button className="bg-white py-4 px-8 rounded-lg font-bold text-red-900 hover:bg-red-950 hover:text-white w-full max-h-36">
                <img
                  src="https://www.corneyandbarrow.com/media/catalog/product/placeholder/default/placeholder-image-base.jpeg"
                  alt="Wine img"
                  className="w-20 h-20 mx-auto mb-2"
                ></img>
                Deletar Vinhos
              </button>
            </Link>
          </div>
          <div>
            <Link to="/delete-pack">
              <button className="bg-white py-4 px-8 rounded-lg font-bold text-red-900 hover:bg-red-950 hover:text-white w-full max-h-36">
                <img
                  src="https://www.packagingsource.com/resize/Shared/Images/Product/Open-Style-Wine-Bottle-Carrier-Kraft-4-Bottle/open-style-wine-packaging.jpg?bw=1000&w=1000&bh=1000&h=1000"
                  alt="Pack img"
                  className="w-20 h-20 mx-auto mb-2"
                ></img>
                Deletar Packs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
