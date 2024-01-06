// Home.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/skill.png";
import axios from "axios";
import SkillCard from "../../components/skillCard/index";
import "./style.css";

const desc =
  "Imagem de um boneco com uma lampada a direita e uma engrenagem na esquerda";

export default function Home() {
  const { login } = useParams();
  const [usuario, setUsuario] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    nome: "",
    level: "",
    descricao: "",
    imagem: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const info = localStorage.getItem("info");

    if (info) {
      const usuarioInfo = JSON.parse(info);
      setUsuario(usuarioInfo.login);
    }

    axios
      .get("https://65983642668d248edf244c68.mockapi.io/skill")
      .then((response) => setSkills(response.data))
      .catch((error) => console.error("Erro na requisição para a API", error));
  }, []);

  const sair = () => {
    localStorage.removeItem("info");
    navigate("/");
  };

  const handleSkillDelete = (deletedId) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.id !== deletedId)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }));
  };

  const handleSkillSubmit = async () => {
    try {
      // Validar se nome e level não estão vazios
      if (!newSkill.nome || !newSkill.level) {
        setError("Nome e Level são campos obrigatórios.");
        return;
      }

      const response = await axios.post(
        "https://65983642668d248edf244c68.mockapi.io/skill",
        newSkill
      );

      setSkills((prevSkills) => [...prevSkills, response.data]);
      alert("Skill adionada com sucesso!");
      setNewSkill({
        nome: "",
        level: "",
        descricao: "",
        imagem: "",
      });
      setError("");
    } catch (error) {
      console.error("Erro ao cadastrar a skill", error);
    }
  };

  return (
    <div>
      <header className="header">
        <img src={logo} alt={desc} className="logo" />
        <h1 className="titulo">Suas Skills</h1>
        <h2 className="bemvindo">Bem-vindo, {usuario}!</h2>
        <button className="botaosair" onClick={sair}>
          Sair
        </button>
      </header>
      <div className="body-new-skill">
        <div className="new-skill-container">
          <div className="titulo-div">
            <h2 className="titulo-nova-skill">Cadastrar Nova Skill</h2>
          </div>
          <div className="new-skill-form">
            <div>
              <div className="campos">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  placeholder="Digite o nome"
                  id="nome"
                  name="nome"
                  value={newSkill.nome}
                  onChange={handleInputChange}
                />
              </div>

              <div className="campos">
                <label htmlFor="level">Level:</label>
                <input
                  type="text"
                  placeholder="Digite o level"
                  id="level"
                  name="level"
                  value={newSkill.level}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div className="campos">
                <label htmlFor="descricao">Descrição:</label>
                <input
                  type="text"
                  placeholder="Digite a descrição"
                  id="descricao"
                  name="descricao"
                  value={newSkill.descricao}
                  onChange={handleInputChange}
                />
              </div>
              <div className="campos">
                <label htmlFor="imagem">Imagem:</label>
                <input
                  type="text"
                  placeholder="Digite a URL da imagem"
                  id="imagem"
                  name="imagem"
                  value={newSkill.imagem}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button onClick={handleSkillSubmit}>Cadastrar</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>

      <div className="skills-container">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            id={skill.id}
            nome={skill.nome}
            level={skill.level}
            descricao={skill.descricao}
            imagem={skill.imagem}
            onDelete={handleSkillDelete}
          />
        ))}
      </div>
    </div>
  );
}
