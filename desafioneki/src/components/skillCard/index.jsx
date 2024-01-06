// SkillCard.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const SkillCard = ({ id, nome, level, descricao, imagem, onDelete }) => {
  const deleteSkill = async () => {
    try {
      if (id) {
        await axios.delete(
          `https://65983642668d248edf244c68.mockapi.io/skill/${id}`
        );
        onDelete(id);
      } else {
        console.error("ID da skill não está definido");
      }
    } catch (error) {
      console.error("Erro ao excluir a skill", error);
    }
  };

  return (
    <div className="skill-card">
      <div>
        <h1 className="titulocard">{nome}</h1>
        <p>Level: {level}</p>
        <p>{descricao}</p>
        <img src={imagem} alt={nome} className="skill-image" />
      </div>
      <Link to={`/edit/${id}`}>
        <button className="botao-atualizar">Atualizar</button>
      </Link>
      <button className="botao-excluir" onClick={deleteSkill}>
        Excluir
      </button>
    </div>
  );
};

SkillCard.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  descricao: PropTypes.string.isRequired,
  imagem: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SkillCard;
