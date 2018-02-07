import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css'; 
import AutorBox from './Autor'

//import $ from 'jquery';

class App extends Component {

  constructor(){
    //Chamando o construtor de Component
    super();
  }

  render() {
    return (
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Home</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Autor</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Livro</a>
              </li>

            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            {/* Juntamos 2 componentes que se ligam, o nome disso e Higher-order components*/}
            <AutorBox />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
