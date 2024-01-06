import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState({
    nome: "",
    level: "",
    descricao: "",
    imagem: "",
  });

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(
          `https://65983642668d248edf244c68.mockapi.io/skill/${id}`
        );
        setSkill(response.data);
      } catch (error) {
        console.error("Erro ao obter detalhes da skill", error);
      }
    };

    fetchSkill();
  }, [id]);

  const handleUpdateSkill = async () => {
    try {
      if (!skill.nome || !skill.level) {
        alert("Nome e Level são campos obrigatórios.");
        return;
      }
      await axios.put(
        `https://65983642668d248edf244c68.mockapi.io/skill/${id}`,
        skill
      );
      alert("Atualização feita com sucesso!");
      navigate(`/home/:login`);
    } catch (error) {
      console.error("Erro ao atualizar a skill", error);
    }
  };

  return (
    <div>
      <div className="body">
        <h1 className="titulo-edit">Editar Skill</h1>
        <form className="body-form">
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome da Skill"
              name="nome"
              value={skill.nome}
              onChange={(e) => setSkill({ ...skill, nome: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="level">Level:</label>
            <input
              type="text"
              id="level"
              placeholder="Level da Skill"
              name="level"
              value={skill.level}
              onChange={(e) => setSkill({ ...skill, level: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              placeholder="Descrição"
              name="descricao"
              value={skill.descricao}
              onChange={(e) =>
                setSkill({ ...skill, descricao: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="imagem">Imagem:</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              placeholder="URL da Imagem"
              value={skill.imagem}
              onChange={(e) => setSkill({ ...skill, imagem: e.target.value })}
            />
          </div>
        </form>
        <div className="botao">
          <button type="button" onClick={handleUpdateSkill}>
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSkill;
