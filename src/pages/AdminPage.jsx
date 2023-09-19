import React, { useState, useEffect } from "react";
import api from "../axios/api";
import { Link } from "react-router-dom";

export default function AdminPage(){



return(
<div>

<h1>Admin</h1>

<div>
<Link
                to={`//delete-wine`}
                className="text-red-900 hover:text-burgundy mt-2 block"
              >
                Deletar Vinhos &rarr;
              </Link>
</div>

</div>

)


}