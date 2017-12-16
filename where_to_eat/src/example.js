import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Catalog extends Component {
    render() {
        var items = [];
        for( var i = 0; i < 24; i++) {
            items.push(<Example name={i} price={i} comm={i}/>);
        }
        return (
            <div>
                { items }
            </div>
        )
    }
}

export  class Example extends Component {
    render() {
        return (
            <div>
                <p>Name:{ this.props.name }</p>
                <p>Price:{ this.props.price }</p>
                <p>Comment:{ this.props.comm }</p>
            </div>
        )
    }
}

//export default example;