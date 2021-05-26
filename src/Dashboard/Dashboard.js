import React, { useEffect, useState } from "react";
import MainModule from "../MainModule/MainModule";
import ModuleSecond from "../ModuleSecond/ModuleSecond";
import "./Dashboard.css";
export default function Dashboard() {
  const [shown, setShown] = useState(<MainModule></MainModule>);

  useEffect(() => {
    document.querySelector("#prim").style.background = "white";
  }, []);
  const changeViewSecond = () => {
    document.querySelector("#sec").style.background = "white";
    document.querySelector("#prim").style.background = "grey";
    setShown(<ModuleSecond></ModuleSecond>);
  };
  const changeViewPrimary = () => {
    document.querySelector("#prim").style.background = "white";
    document.querySelector("#sec").style.background = "grey";

    setShown(<MainModule></MainModule>);
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="nav">
        <div className="nav-logo"></div>
        <div className="nav-user"></div>
      </div>

      <div className="dashboard-bar">
        <div
          id="prim"
          style={{ cursor: "pointer" }}
          onClick={changeViewPrimary}
          className="bar"
        >
          Análisis
        </div>
        <div
          id="sec"
          style={{ cursor: "pointer" }}
          onClick={changeViewSecond}
          className="bar"
        >
          Prueba Tu
        </div>
      </div>
      <div style={{ height: "85vh" }}>{shown}</div>
    </div>
  );
}
