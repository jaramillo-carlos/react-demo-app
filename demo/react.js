function Tenedor() {
  return <h1>Esto es un cuchillo</h1>
}

/*
class Tenedor extends React.Component {
  render() {
    return <h1>Esto es un tenedor</h1>
  }
}
*/

class Cuchillo extends React.Component {
  render() {
    return <h1>Esto es un cuchillo</h1>
  }
}

class Servilleta extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class Cubiertos extends React.Component {
  render() {
    return (
      <Servilleta>
        <Tenedor />
        <Cuchillo />
      </Servilleta>
    )
  }
}

// props, are for change content in components
class Copa extends React.Component {
  // To have states, you need declare constructor
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.state = {
      llena: false
    }
    // bind this methods to component
    this.tomar = this.tomar.bind(this)
    this.llenar = this.llenar.bind(this)
  }

  tomar() {
    this.state = {
      llena: false
    }
  }

  llenar() {
    this.state = {
      llena: true
    }
  }

  render() {
    return (
      <h1
      className={this.props.contenido}
      style={{backgroundColor: this.props.contenido === 'vino' ? 'red' : 'white' }}>
        La copa
        {this.state.llena ? ' tiene ' : ' tenia '}
        {this.props.contenido}
      </h1>)
  }
}

<Copa contenido="agua" />

class Pollo extends React.Component {
  render() {
    return (
      <h1>
        Esto es pollo
        {this.props.comido ? ' comido' : ' sin comer'}
      </h1>
    )
  }
}

class Arvejas extends React.Component {
  render() {
    return <h1>Esto son arvejas</h1>
  }
}

class Zanahorias extends React.Component {
  render() {
    return <h1>Esto son zanahorias</h1>
  }
}

class Plato extends React.Component {
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.state = {
      comido: false
    }
  }
  render() {
    if (this.state.comido) {
      return (
        <div>
          <Pollo comido={true} />
        </div>
      )
    } else {
      return (
        <div>
          <Pollo />
          <Arvejas />
          <Zanahorias />
          <Arvejas />
          <Zanahorias />
        </div>
      )
    }
  }
}

class Lugar extends React.Component {
  render() {
    return <h1>Acá come {this.props.persona}</h1>
  }
}

class Mesa extends React.Component {
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.state = {
      comensales: [
        { nombre: 'Carlos' },
        { nombre: 'Pepe' },
        { nombre: 'Francisco' },
        { nombre: 'Paula' },
        { nombre: 'Martina' },
        { nombre: 'Ignacio' },
        { nombre: 'Sofia' },
      ]
    }
  }

  render() {
    return this.state
      .map((comensal) => <Lugar persona={comensal.nombre} />);
  }

}

class Comanda extends React.Component {
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.state = {
      pedido: ''
    }
    this.actualizar = this.actualizar.bind(this);
  }

  actualizar(event) {
    this.setState({
      pedido: event.target.value
    })
  }

  render() {
    return (<Input type="text" onChange={this.actualizar} value={this.state.pedido} />)
  }

}

// ### Lifting StateUp ###
// When you need modify state in multiples component, you need lifting state up
// Because is an abstraction problem when a component modify siblings components
class Tenedor extends React.Component {
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.usar = this.usar.bind(this)
  }
  usar() {
    this.props.gestionarUso()
  }

  render() {
    return <button onClick={this.usar}>Tenedor</button>
  }
}

class Plato extends React.Component {
  render() {
    if (this.state.comido) {
      return (
        <h1>
          El plato está {this.props.comida}% lleno
        </h1>
      )
    }
  }
}

class Individual extends React.Component {
  constructor(props) {
    // send to parent class (React.Component to works on render)
    super(props)
    this.state = {
      comida: 100
    }
    this.comer = this.comer.bind(this)
  }
  comer() {
    this.setState(state => ({
      comida: comida -5
    }))
  }
  render() {
    return (
      <div>
        <Tenedor gestionarUso={this.comer} disabled={this.state.comida <= 0} />
        <Plato comida={this.state.comida} />
      </div>
    )
  }
}