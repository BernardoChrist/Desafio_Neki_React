import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./style.css";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const entrar = async () => {
    try {
      //requisição
      const response = await axios.get(
        "https://65983642668d248edf244c68.mockapi.io/usuario"
      );

      //verifica se existe usuario e senha
      const usuarioEncontrado = response.data.find(
        (usuario) => usuario.login === login && usuario.senha === senha
      );

      if (usuarioEncontrado) {
        const info = {
          login,
          senha,
        };
        localStorage.setItem("info", JSON.stringify(info));
        alert("Login efetuado com sucesso!");
        navigate("/home/" + login);
      } else {
        alert("Login ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro na requisição para a API", error);
    }
  };

  const cadastrar = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await axios.post("https://65983642668d248edf244c68.mockapi.io/usuario", {
        login,
        senha,
      });
      setIsModalOpen(false);
      setSenha("");
      setLogin("");
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div>
      <div className="login">
        <form className="form">
          <h1 className="txtlogin">Faça seu login</h1>
          <p className="usuario">Usuário</p>
          <input
            type="text"
            placeholder="Digite seu usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="inputField"
          />
          <br />
          <p className="senha">Senha</p>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="inputField"
          />
          <br />
          <button className="botaouniversal" type="button" onClick={entrar}>
            Entrar
          </button>
          {/* Botão para abrir o modal de cadastro */}
          <button
            className="botaocadastrar"
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            Cadastrar
          </button>
        </form>
      </div>
      {/* Modal de cadastro */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bodymodal"
      >
        <div className="corpomodal">
          <h2 className="usuario">Cadastro de Novo Usuário</h2>
          <p className="textos">Usuário:</p>
          <input
            type="text"
            placeholder="Digite o usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            // className="inputField"
          />
          <br />
          <p className="textos">Senha:</p>
          <input
            type="password"
            placeholder="Digite a senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            // className="inputField"
          />
          <br />
          <p className="textos">Confirmar Senha:</p>
          <input
            type="password"
            placeholder="Digite a senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            // className="inputField"
          />
          <br />
          <button
            className="botaovoltar"
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setSenha("");
              setLogin("");
              setConfirmarSenha("");
            }}
          >
            Voltar
          </button>
          <button className="botaouniversal" type="button" onClick={cadastrar}>
            Cadastrar
          </button>
        </div>
      </Modal>
    </div>
  );
}
