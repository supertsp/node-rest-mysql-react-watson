import './App.css';
import React from 'react';
import Validator from './libs/Validator';
import axios from 'axios';

class App extends React.Component {
  
  state = {
    comments: []
  }

  constructor(props) {
    super(props);    
  }

  callApiCommentsList = (event) => {
    axios.get(`http://localhost:8080/api/v1/comments`)
      .then(response => {
        console.log("\ncallApiCommentsList:: Response Ok: ", response);

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
        console.log("\ncallApiCommentsCreate:: Response Ok: ", response);

        this.callApiCommentsList(event);
      });
  }

  callApiCommentsDelete = (event) => {
    const idText = event.target.parentNode.parentNode.children[0].children[1].value;

    axios.delete(`http://localhost:8080/api/v1/comments/${idText}`)
      .then(response => {
        console.log("\ncallApiCommentsDelete:: Response Ok: ", response);

        this.callApiCommentsList(event);
      });
  }



  //qdo renderizado no início
  componentDidMount() {
    console.log("\ncomponentDidMount...");

    this.callApiCommentsList();
  }

  eventHandler_submitFormNewComment = (event) => {
    event.preventDefault();

    console.log("\neventHandler_submitFormNewComment:: Event: ", event);
    
    this.callApiCommentsCreate(event)
  }

  eventHandler_buttonListen = (event) => {
    console.log("eventHandler_buttonListen", event);    
  }

  eventHandler_buttonDelete = (event) => {
    console.log("eventHandler_buttonDelete");

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
