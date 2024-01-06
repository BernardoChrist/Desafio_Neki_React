import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/login";
import Home from "./page/home";
import EditSkill from "./page/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:login" element={<Home />} />
        <Route path="*" element={<h1>Pagina não encontrada</h1>} />
        <Route path="/edit/:id" element={<EditSkill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
