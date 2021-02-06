import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  
  render() {
    return (
      <div className="app">
        
        <div className="left-panel">
          <form>
            <div>
              <label forName="comentario">Comentário</label>
            </div>
            <div>
              <textarea id="comentario"></textarea>
            </div>
            <div>
              <button>Cadastrar</button>
            </div>
          </form>
        </div>
        
        <div className="rigth-panel">
          direita
        </div>

      </div>
    );
  }

}

export default App;
