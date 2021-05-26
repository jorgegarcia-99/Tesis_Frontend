import React, { useState } from "react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

export default function Login() {
  const [link, setLink] = useState(null);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const goToDashboard = () => {
    if (user.trim() == '') {
      swal({
        title: 'Error de inicio de sesión',
        text: 'No puede dejar en blanco el campo usuario',
        icon: "error",
        buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
      });
    } else if (pass.trim() == '') {
      swal({
        title: 'Error de inicio de sesión',
        text: 'No puede dejar en blanco el campo contraseña',
        icon: "error",
        buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
      });
    } else if (user != "admin") {
      swal({
        title: 'Error de inicio de sesión',
        text: 'El campo usuario es incorrecto, ingrese nuevamente',
        icon: "error",
        buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
      });
    } else if (pass != "admin") {
      swal({
        title: 'Error de inicio de sesión',
        text: 'El campo contraseña es incorrecto, ingrese nuevamente',
        icon: "error",
        buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
      });
    }  else if (user == "admin" && pass == "admin") {
      setLink(<Redirect to="/dashboard">Click Me</Redirect>);
    }
  };
  return (
    <div className="login-container">
      {link}
      <div className="login-box">
        <div className="login-logo"></div>
        <input
          onChange={(e) => setUser(e.target.value)}
          value={user}
          type="text"
          placeholder="Usuario"
        ></input>
        <input
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          values={pass}
          type="password"
          placeholder="Password"
        ></input>
        <button onClick={goToDashboard}>Ingresar</button>
        {/* <div className="forgot-password">
          Se olvido su contraseña? Click para recuperar
        </div> */}
      </div>
    </div>
  );
}
