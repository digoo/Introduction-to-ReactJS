import React, { Component } from "react";

import TechItem from './TechItem';

class TechList extends Component {
state = {
  newTech: '',
  techs: [ ]
};

// Executado assim que o componente aparece em tela
componentDidMount() {
  // Serve pra carregar as opcoes caso ao carregar o componente (Se não a tela fica sem as opcoes e ao adicionar algo novo é tudo resetado)
  const techs = localStorage.getItem('techs');

  // Check caso o techs seja vazio ou nao
  if (techs) {
    this.setState({ techs: JSON.parse(techs)});
  }

}

// Executado sempre que houver alterações nas props ou estado
// O componente recebe as propriedades antigas e o estado antigo como parametro
componentDidUpdate(_, prevState) {
  // se tal estado mudou, compara-se o prevProps com this.props
// Se houver alguma alteração nas propriedades em this.props
// Se houver alguma alteração no estado em this.state

// Verificar se o estado anterior esta diferente do estado atual
if (prevState.techs !== this.state.techs) {
  // Salvando alterações em local Storage, como não aceita array diretamente JSON.stringify vem para corrigir esse gap 
  localStorage.setItem('techs', JSON.stringify(this.state.techs))
}
}

// Executado quando o componente deixa de existir
componentWillUnmount() {
// Sera mto pouco utilizado, caso criemos um event listener, fica vendo evento de usuario (mouse), serve pra limpar sujeira caso tenhamos deixado
// algo pra tras, ele reseta para o estado original
}

handleInputChange = e =>  {
 this.setState({newTech: e.target.value });
}

handleSubmit = e => {
e.preventDefault();

this.setState({ 
  techs: [... this.state.techs, this.state.newTech],
  newTech: ''
});

}

handleDelete = (tech) => {
this.setState({ techs: this.state.techs.filter(t => t !== tech) })
}

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
      <ul>
        {this.state.techs.map(tech => (
        <TechItem 
        key={tech} 
        tech={tech} 
        onDelete={() => this.handleDelete(tech)} 
        /> 
        ))}
      </ul>
      <input 
      type="text" 
      name="" 
      id="" 
      onChange={this.handleInputChange} 
      value={this.state.newTech} 
      />
      <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;