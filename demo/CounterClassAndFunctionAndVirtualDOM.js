import React, { Component, useState, useCallback } from "react"


/*
Explicación VirtualDOM
Es un objeto javascript donde se describen los “elementos” que se van a renderizar, una capa mas de abstracción que permite a React realizar
actualizaciones de forma eficiente comparando el estado anterior del Virtual DOM con el actual. Cada elemento es creado con la función: React.createElement()
Al ser un un objeto javascript es mucho más sencillo y eficiente determinar que elementos han sido modificados,
React utiliza un algoritmo de reconciliación https://reactjs.org/docs/reconciliation.html que determina
las partes del sub-tree que se deben actualizar cuando el estado de alguno de sus componentes cambia, este proceso es mucho más eficiente en
comparación a realizarlas mediante la utilización del API DOM.

Una vez confeccionado nuestro árbol de elementos lo vamos a poder adjuntar a algún HTML tag que funcione como contendor mediante la función: React.render()
*/
class Hello extends React.Component {
    render() {
        console.log(React.createElement('div', null, `Hello ${this.props.toWhat}`));
        return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
}

/*
React.render() va a ser llamado cada vez que se modifique el estado de nuestros componentes
*/
ReactDOM.render(
    React.createElement(Hello, { toWhat: 'World' }, null),
    document.getElementById('root')
);


// counter
export class CounterClass extends Component {
    state = { counter: 0 }
    render() {
        const { counter } = this.state
        return (
            <div>
                <span>{counter}</span>
                <button onClick={() => this.setState({ counter: counter + 1 })}>+</button>
                <button onClick={() => this.setState({ counter: counter - 1 })}>-</button>
            </div>
        );
    }
}

const functions = new Set();

export function CounterFunction() {
    const [counter, setCount] = useState(0)
    const [anotherCounter, setAnotherCount] = useState(0)

    const handleIncrementClick = useCallback(() => setCount(counter + 1), [counter])

    // when use useCallback only create function again when change arguments
    const doSomething = useCallback(() => alert(10), [anotherCounter])

    functions.add(doSomething)
    functions.add(handleIncrementClick) // in each re-render will create again all functions

    console.log(functions)
    return (
        <div>
            <span>{counter}</span>
            <button onClick={handleIncrementClick}>+</button>
            <button onClick={() => setCount(counter - 1)}>-</button>
        </div>
    )
}