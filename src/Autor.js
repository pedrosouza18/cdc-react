import React, {Component} from 'react';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

    constructor(){
        super();
        //No react todo componente tem um estado, e no contrutor voce inicializa através da variavel state
         this.state = {nome: '', email: '', senha: ''};

        //Precisa usar essa função bind para ele usar o bind do react, pois ele vem sempre null
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
                //Alterando o estado da lista passando a response para ela através de um parametro usado na class de box
                //this.props.callBackAtualizaListagem(data);

                //Nova forma
                //disparar um aviso geral de novaListagem disponivel, como se voce estivesse publicando um anuncio, precisa passar o topico e o obj
                PubSub.publish('atualiza-lista-autores', data);
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

    render(){
        return (
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
                {/* onChange={this.setNome} precisa do metodo onChange para setar o valor do elemento*/}
                <InputCustomizado htmlFor="nome" id="nome" type="text" name="nome" value={this.state.nome} label="Nome" onChange={this.setNome}/>
                <InputCustomizado htmlFor="email" id="email" type="email" name="email" value={this.state.email} label="Email" onChange={this.setEmail}/>
                <InputCustomizado htmlFor="senha" id="senha" type="password" name="senha" value={this.state.senha} label="Senha" onChange={this.setSenha}/>
                <SubmitCustomizado type="submit" name="Gravar"/>
              </form>

            </div>
        );
    }
}

class TabelaAutor extends Component {

    render() {
        return (
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
                    this.props.lista.map((autor) => {
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
        );
    }
}

export default class AutorBox extends Component {

    constructor(){
        super();
        this.state = {lista : []};

        //Metodo antigo para atualizar a lista
        //this.atualizaListagem = this.atualizaListagem.bind(this);
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

        //Metodo para ouvir os topicos publicados
        //Preciso fazer o bind desse metodo pois o this dele está null
        PubSub.subscribe('atualiza-lista-autores', (topico, novaLista) => {
            this.setState({lista: novaLista});
        });
    }

    //Metodo antigo
    // atualizaListagem(novaLista){
    //     this.setState({lista: novaLista});
    // }

    render(){
        return (
            <div>
                {/*Este componente recebe um parametro que e uma funcao que recebe uma lista*/}
                {/*Antiga forma - <FormularioAutor callBackAtualizaListagem={this.atualizaListagem}/>*/}
                <FormularioAutor />
                {/*Este componente recebe a lista como parametro*/}
                <TabelaAutor lista={this.state.lista}/>
            </div>
        );
    }
}