import React from "react";
import "./ModuleSecond.css";
import Axios from "axios";
import swal from 'sweetalert';

export default class MainModule extends React.Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      text: "",
      result: "Ingresa texto",
      loading: false
    }
  }

  analizeAsync = async () =>{

    try{
      if(this.state.text == undefined || this.state.text.trim() == ''){
        swal({
          title: 'Error',
          text: 'Ingrese un texto a predecir.',
          icon: "error",
          buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
        });
        throw 'El texto no puede estar vacío'
      }

      this.setState({
        loading: true
      })

      const dataModelo = {
        texto: this.state.text
      }

      const resModelo = await Axios.post('https://tp2scrapyrt.azurewebsites.net/demo', dataModelo, {timeout: 600000})
      console.log(resModelo)
      if(resModelo.data == undefined){
        throw 'Ocurrió un error al analizar el texto.'
      }

      this.setState({
        text: resModelo.data.texto,
        result: resModelo.data.resultado,
        loading: false
      })

    }catch(error){
      swal({
        title: 'Error',
        text: 'Ingrese un texto a predecir',
        icon: "error",
        buttons: {confirm: {text: 'OK', className: 'sweet-warning'}}
      });
      this.setState({
        text: "",
        result: "Ingresa texto",
        loading: false
      })
    }

  }

  render(){
    return (
    <div className="moduleSecond-container">
      <h1>Prueba la I.A</h1>
      <div className="pred">
        <label>Text: </label>
        <input 
          value={this.state.text}
          onChange={(e) => {
            this.setState({
              text: e.target.value
            })
          }}
          type="text">
        </input>
      </div>
      <button onClick={this.analizeAsync} className="predict">Predecir</button>
      <div className="prediction">
        <p>{(this.state.loading) ? <div>Cargando....</div>
            :this.state.result}</p>
      </div>
    </div>
    )
  }
}
// export default function ModuleSecond() {
//   return (
//     <div className="moduleSecond-container">
//       <h1>Prueba la I.A</h1>
//       <div className="pred">
//         <label>Text: </label>
//         <input type="text"></input>
//       </div>
//       <button className="predict">Predecir</button>
//       <div className="prediction">
//         <p>Positivo!</p>
//       </div>
//     </div>
//   );
// }
