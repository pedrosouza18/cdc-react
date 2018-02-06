import React, {Component} from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
//import $ from 'jquery';

class App extends Component {

  constructor(){
    //Chamando o construtor de Component
    super();
    //No react todo componente tem um estado, e no contrutor voce inicializa através da variavel state
    this.state = {lista: [], nome: '', email: '', senha: ''};

    //Precisa usar essa função bind para ele usar o bind do react, pois ele vem sempre null
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  //Função para fazer logica após a função render executar, é mais certo pois gasta menos recursos.
  //usada quando o componente acabou de ser montado
  //Uma outra função é o componentWillMount(), que será chamada antes da invocação do render().
  componentDidMount(){
    //let urlLocal = fetch('http://localhost:8080/api/autores');
    let urlProd = fetch('https://cdc-react.herokuapp.com/api/autores');
    urlProd
    //urlLocal
      .then(data => data.json())
      .then(data => this.setState({lista: data}))
      .catch(error => error);
  }

  enviaForm(event){
    event.preventDefault();

    fetch('https://cdc-react.herokuapp.com/api/autores', {
      method: 'post',
      body: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(data => data.json())
    .then(data => {
      //Alterando o estado da lista passando a response para ela
      this.setState({lista: data});
    })
    .catch(error => error);
  }

  //Metodos para alterar o estado das variáveis
  setNome(event) {
    //nome: event.target.value , pegando os valores digitados
    this.setState({nome: event.target.value});
  }

  setEmail(event) {
    this.setState({email: event.target.value});
  }

  setSenha(event) {
    this.setState({senha: event.target.value});
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
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                {/* onChange={this.setNome} precisa do metodo onChenge para setar o valor do elemento*/}
                <InputCustomizado htmlFor="nome" id="nome" type="text" name="nome" value={this.state.nome} label="Nome" onChange={this.setNome}/>
                <InputCustomizado htmlFor="email" id="email" type="email" name="email" value={this.state.email} label="Email" onChange={this.setEmail}/>
                <InputCustomizado htmlFor="senha" id="senha" type="password" name="senha" value={this.state.senha} label="Senha" onChange={this.setSenha}/>
                <SubmitCustomizado type="submit" name="Gravar"/>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map((autor) => {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
