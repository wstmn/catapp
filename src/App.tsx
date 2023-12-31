import {  BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import CatPage from "./pages/cat-page";
import ProfilePage from "./pages/profile-page";



export const App = ({ }) => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="cat" element={<CatPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;