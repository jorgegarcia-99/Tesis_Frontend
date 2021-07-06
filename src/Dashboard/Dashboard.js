import React, { useEffect, useState } from "react";
import MainModule from "../MainModule/MainModule";
import ModuleSecond from "../ModuleSecond/ModuleSecond";
import ModuleDashboard from "../ModuleDashboard/ModuleDashboard";
import "./Dashboard.css";
export default function Dashboard() {
  const [shown, setShown] = useState(<MainModule></MainModule>);

  useEffect(() => {
    document.querySelector("#prim").style.background = "white";
  }, []);
  const changeViewSecond = () => {
    document.querySelector("#sec").style.background = "white";
    document.querySelector("#prim").style.background = "grey";
    document.querySelector("#thi").style.background = "grey";
    setShown(<ModuleSecond></ModuleSecond>);
  };
  const changeViewPrimary = () => {
    document.querySelector("#prim").style.background = "white";
    document.querySelector("#sec").style.background = "grey";
    document.querySelector("#thi").style.background = "grey";

    setShown(<MainModule></MainModule>);
  };
  const changeViewDashboard = () => {
    document.querySelector("#thi").style.background = "white";
    document.querySelector("#sec").style.background = "grey";
    document.querySelector("#prim").style.background = "grey";

    setShown(<ModuleDashboard></ModuleDashboard>);
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
          Prueba Tú
        </div>
        <div
          id="thi"
          style={{ cursor: "pointer" }}
          onClick={changeViewDashboard}
          className="bar"
        >
          Dashboard
        </div>
      </div>
      <div style={{ height: "85vh" }}>{shown}</div>
    </div>
  );
}
