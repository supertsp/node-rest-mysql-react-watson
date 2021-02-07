import './App.css';
import React from 'react';

class App extends React.Component {
  
  render() {
    let teste = "oi";

    return (
      <div className="app">
        
        <div className="left-panel">
          <form>
            <div className="form-item">
              <label forName="comentario">Comentário</label>
              <textarea id="comentario">{teste}</textarea>
            </div>

            <div className="form-item">
              <button>Cadastrar</button>
            </div>

          </form>
        </div>
        
        <div className="right-panel">
          <h4 className="right-panel-title">Comentários</h4>

          <div className="comment-item">
            <div className="comment-item-text">
              <p>sfasfas asdfasfas df sdfs  sdfsdfs sdf sdfs df sfs sdfs dfdfsd rtet r trtyui </p>
            </div>
            <div className="comment-item-button">
              <button>Ouvir</button>
              <button>Excluir</button>
            </div>
          </div>

          <div className="comment-item">
            <div className="comment-item-text">
              <p>sfasfas asdfasfas df sdfs  sdfsdfs sdf sdfs df sfs</p>
            </div>
            <div className="comment-item-button">
              <button>Ouvir</button>
              <button>Excluir</button>
            </div>
          </div>

          <div className="comment-item">
            <div className="comment-item-text">
              <p>sfasfas asdfasfas df sdfs  sdfsdfs sdf sdfs df sfs</p>
            </div>
            <div className="comment-item-button">
              <button>Ouvir</button>
              <button>Excluir</button>
            </div>
          </div>

         




        </div>

      </div>
    );
  }

}

export default App;
