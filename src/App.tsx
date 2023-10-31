import React, { useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [titulo, setTitulo] = useState("")
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  React.useEffect(() => {


    const endPoint = '/';
    // console.log(authData, "RENDER");

    api.get(endPoint, {
        validateStatus: status => {
            return status < 405;
        }
    }).then(({ data }) => {
        if (data.status === 404) {
            // console.log('listaItem: ' + data.message);
        } else {
            console.log("aqui está dentro do DATA", data)
            setTitulo(data)
            // console.log("aqui está o tipoPV", TipoPv)
        }  
    });
}, []);
  
  const onSubmit = () => {
    const endPoint = "/singUp";
    const body = {
      username: inputUser,
      email: inputEmail,
      password: inputPassword,
    };
    if (body.username === "" || body.email === "" || body.password === "") {
      alert("CAMPOS EM BRANCO \nfavor digitar todos os campos");
    } else {
      api
        .post(endPoint, body, {
          validateStatus: (status) => {
            return status < 405;
          },
        })
        .then(({ data }) => {
          if (data.status === 404) {
            console.log("error:" + data.messagem);
          } else {
            alert("Cadastro realizado com sucesso");
          }
        });
    }
  };

  return (
    <div className="container">
      <h1 className="title">{titulo.replace("<h1>","").replace("</h1>","")}</h1>
      <div className="boxCad">
        <h1 className="titleBox">Cadastro de usuairo</h1>
        <div className="inputs">
          <div className="containerInput">
            <input
              type="text"
              placeholder="Username"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
            />
          </div>
          <div className="containerInput">
            <input
              type="text"
              placeholder="Email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
          </div>
          <div className="containerInput">
            <input
              type="password"
              placeholder="Senha"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="boxButton">
          <button className="buttonCad" onClick={() => onSubmit()}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
