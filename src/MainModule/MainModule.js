import React, { useState } from "react";
import DataView from "../DataView/DataView";
import "./MainModule.css";
import Axios from "axios";

const reactionsItems = {
  like: {
    value: 0,
    url: "https://iconape.com/wp-content/files/pk/59993/svg/facebook-reaction-like.svg",
  },
  love: {
    value: 0,
    url: "https://seeklogo.com/images/F/facebook-reaction-love-logo-FA246AF759-seeklogo.com.png",
  },
  heart: {
    value: 0,
    url: "https://seeklogo.com/images/M/me-importa-reaccion-facebook-logo-68A857528F-seeklogo.com.png",
  },
  laugh: {
    value: 0,
    url: "https://cdn.worldvectorlogo.com/logos/facebook-reaction-haha.svg",
  },
  wow: {
    value: 0,
    url: "https://cdn.worldvectorlogo.com/logos/facebook-wow.svg",
  },
  sad: {
    value: 0,
    url: "https://cdn-0.emojis.wiki/emoji-pics/facebook/pensive-face-facebook.png",
  },
  mad: {
    value: 0,
    url: "https://svgur.com/i/AAJ.svg",
  }
  

}

export default class MainModule extends React.Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      url: "",
      option: "",
      reactions: reactionsItems,
      option: "",
      comments: [],
      shares: 0,
      loading: false,
      comment_positive: 0,
      comment_negative: 0,
      comment_neutral: 0
    }
  }

  analizeAsync = async () =>{
    
    this.setState({
      loading: true
    })

    try {

      if(this.state.url == undefined || this.state.url.trim() == ''){
        alert('La url no puede ser vacía')
        this.setState({
          reactions: reactionsItems,
          comments:[],
          shares:0,
          loading:false,
          comment_positive: 0,
          comment_negative: 0,
          comment_neutral: 0
        })
        return 
        // throw('La url no puede ser vacía')
      }

      const dataPosts = {
        url: this.state.url
      }
      
      // Get Posts
      const resPosts = await Axios.post('http://localhost:5000/scrape', dataPosts, {timeout: 600000})
      console.log(resPosts.data)
      if(resPosts.data == undefined || resPosts.data.errors != undefined){
        // alert('Ocurrió un error al cargar los posts.')
        throw('Ocurrió un error al cargar los posts.')
        // return
      }

      // Process posts
      let current = this.state.reactions
      current.like.value = resPosts.data.reactions["1"] || "0"
      current.love.value = resPosts.data.reactions["2"] || "0"
      current.laugh.value = resPosts.data.reactions["4"] || "0"
      current.mad.value = resPosts.data.reactions["8"] || "0"
      current.heart.value = resPosts.data.reactions["16"] || "0"
      current.wow.value = resPosts.data.reactions["3"] || "0"
      current.sad.value = resPosts.data.reactions["7"] || "0"
      let newShares = resPosts.data.shares || "0"
      let newcomment_positive = resPosts.data.comments_positive || "0"
      let newcomment_negative = resPosts.data.comments_negative || "0"
      let newcomment_neutral = resPosts.data.comments_neutral || "0"
      
      // Process comments
      let newComments = resPosts.data.comments

      this.setState({
        reactions: current,
        shares: newShares,
        comments: newComments,
        comment_positive: newcomment_positive,
        comment_negative: newcomment_negative,
        comment_neutral: newcomment_neutral,
        loading:false
      })

    } catch (error) {
      console.log(error);
      alert('Ocurrió un error al cargar los posts.')
      this.setState({
        reactions: reactionsItems,
        comments:[],
        shares:0,
        loading:false,
        comment_positive: 0,
        comment_negative: 0,
        comment_neutral: 0
      })

    }
  }

  render(){
    return (
      <div className="main-container">
        <div className="main-first">
          <div className="main-options">
            <label>URL:</label>
            <div className = "flex">
              <input
                value={this.state.url}
                onChange={(e) => {
                  this.setState({
                    url: e.target.value
                  })
                }}
                style={{ width: "700px" }}
                type="text"
              ></input>
            
            {/* <div className="main-options">
              <label>Topico:</label>
              <select
                onChange={(e) => {
                  this.setState({
                    option: e.target.value
                  })
                }}
                value={this.state.option}
                name="cars"
                id="cars"
                style={{ width: "200px" }}
              >
                <option value="matricula">Matrícula</option>
                <option value="deportes">Deportes</option>
              </select>
            </div>
            <button
              onClick={() => {
                this.setState({
                  url:"",
                  option: ""
                })
              }}
              className="limpiar"
            >
              Limpiar
            </button> */}
            <button className="main-button" onClick={this.analizeAsync}>Analizar</button>
            </div>
          </div>
        </div>
        <div className="main-data">
          {
          (this.state.loading) ? <div>Cargando datos....</div>
            : <DataView 
                data={this.state.reactions} 
                comments={this.state.comments}
                shares={this.state.shares}
                comment_positive={this.state.comment_positive}
                comment_negative={this.state.comment_negative}
                comment_neutral={this.state.comment_neutral} />
          }
        </div>       
      </div>
    );
  }
}