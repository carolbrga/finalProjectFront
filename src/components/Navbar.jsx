import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  //acessando as informações do context
  const { isLoggedIn, role } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    //localStorage.removeItem("userRole");

    navigate("/login");
  }

  //console.log(role);

  return (
    <nav className="bg-white py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-red-900 font-playfair"
          >
            <img
              className="h-16 w-16 rounded-full"
              src="https://img.freepik.com/fotos-gratis/copo-de-vinho-tinto-e-garrafa-no-balcao-de-bar_107420-65845.jpg?size=626&ext=jpg"
              alt="Wines & Wines"
            />
            Wines & Wines
          </Link>

          <div className="flex items-center space-x-4">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/signup"
                  className="text-gray-900 hover:text-red-900"
                >
                  Sign up
                </Link>
                <Link to="/login" className="text-gray-900 hover:text-red-900">
                  Log in
                </Link>
              </>
            )}

            {isLoggedIn === true && (
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 hover:text-red-900"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="text-gray-900 hover:text-red-00"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

/* VERSÃO DA NAVBAR SEM AS CLASSES */
/* 
   <nav>
      <div>
         <Link to="/">
            <div>
               <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
               />
               <span>Dev Suport</span>
            </div>
         </Link>
         <div>
            {isLoggedIn === false && (
               <>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Log in</Link>
               </>
            )}

            {isLoggedIn === true && (
               <>
                  <button onClick={handleLogout}>Logout</button>
                  <Link to="/profile">Profile</Link>
               </>
            )}
         </div>
      </div>
   </nav>
*/
