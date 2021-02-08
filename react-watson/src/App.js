import './App.css';
import React from 'react';
import Validator from './libs/Validator';
import axios from 'axios';
// import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
// import { IamAuthenticator } from 'ibm-watson/auth';

// const textToSpeech = new TextToSpeechV1({
//   authenticator: new IamAuthenticator({
//     apikey: 'ERjFGLJ68Xg8ABj1mED66Pi_hNLlvtm10AhN7nQ36031',
//   }),
//   serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/edfd6ca1-9a4e-41ad-9184-e2404a0fcf52',
// });


class App extends React.Component {
  
  state = {
    comments: []
  }

  constructor(props) {
    super(props);
    
    console.log('constructor');
    // this.getListOfComments(null, true);
  }

  callApiCommentsList = (event) => {
    axios.get(`http://localhost:8080/api/v1/comments`)
      .then(response => {
        console.log("api respondeu ok: ", response);
        //text: JSON.stringify(response.data?.data),

        if (Validator.isAxiosResponseOkAndHasData(response)) {
          this.setState({
            comments: response?.data?.data
          });          
        }

      });
  }

  callApiCommentsCreate = (event) => {
    const newText = event.target[0].value;
    event.target[0].value = "";

    axios.post(`http://localhost:8080/api/v1/comments`, { text: newText })
      .then(response => {
        console.log("api respondeu ok: ", response);

        this.callApiCommentsList(event);
      });
  }

  callApiCommentsDelete = (event) => {
    const idText = event.target.parentNode.parentNode.children[0].children[1].value;

    axios.delete(`http://localhost:8080/api/v1/comments/${idText}`)
      .then(response => {
        console.log("api respondeu ok: ", response);

        this.callApiCommentsList(event);
      });
  }



  //qdo renderizado no início
  componentDidMount() {
    console.log("chamando api List");
    this.callApiCommentsList();
  }

  eventHandler_submitFormNewComment = (event) => {
    event.preventDefault();
    console.log("submit", event.target[0].value);
    this.callApiCommentsCreate(event)
  }

  eventHandler_submitFormNewComment = (event) => {
    event.preventDefault();
    console.log("submit - FormNewComment", event.target[0].value);
    this.callApiCommentsCreate(event)
  }

  eventHandler_buttonListen = (event) => {
    console.log("button Listen", event);    
  }

  eventHandler_buttonDelete = (event) => {
    console.log("button Delte");

    this.callApiCommentsDelete(event)
  }

  render() {
    return (
      <div className="app">
        
        <div className="left-panel">
          <form onSubmit={(event) => this.eventHandler_submitFormNewComment(event)} key="formNewComment">
            <div className="form-item">
              <label htmlFor="comentario">Novo Comentário</label>
              <textarea id="comentario" />
            </div>

            <div className="form-item">
              <button type="submit">Cadastrar</button>
            </div>

          </form>
        </div>
        
        <div className="right-panel">
          <h4 className="right-panel-title">Comentários</h4>

          {
            this.state.comments.map(comment =>

              <div className="comment-item" key={comment.id + "comment-item"}>
                <div className="comment-item-text">
                  <p>{comment.text}</p>
                  <input type="hidden" name="idComment" value={comment.id} />
                </div>
                <div className="comment-item-button">
                  <button onClick={(event) => this.eventHandler_buttonListen(event)}>Ouvir</button>
                  <audio type="audio/mp3"></audio>
                  <button onClick={(event) => this.eventHandler_buttonDelete(event)}>Excluir</button>
                </div>
              </div>

            )
          }

        </div>

      </div>
    );
  }

}

export default App;
