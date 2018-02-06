import React, {Component} from 'react';

//Variável props pega todos as propriedades dos componentes ajudando a fazer reuso
export default class InputCustomizado extends Component {

    render(){
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}/>
            </div>
        );
    }
}