import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage  from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import WineDetailPage from "./pages/WineDetailPage";
import WinePage from "./pages/WinePage";
import PacksPage from "./pages/PacksPage";
import PacksDetailPage from "./pages/PacksDetailPage";
import ProtectRoute from "./components/ProtectRoute";
function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          {/* Rotas que não devem ser protegidas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
       



               {/* Rota protegida */}
               <Route
                  path="/profile"
                  element={<ProtectRoute Component={ProfilePage} />}
               />
               <Route path="/todosvinhos" element={<ProtectRoute Component={WinePage}/>}/>
               <Route path="/detalhesdovinho" element={<ProtectRoute Component={WineDetailPage}/>}/>
               <Route path="/todospacotes" element={<ProtectRoute Component={PacksPage}/>}/>
               <Route path="/detalhespacotes" element={<ProtectRoute Component={PacksDetailPage}/>}/>
               
            </Routes>
         </div>

      </div>
  );
}

export default App;
