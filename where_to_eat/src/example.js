import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export default class Catalog extends Component {
    render() {
        let data = [
            {"Name":111,"Price":2.5},
            {"Name":222,"Price":3.5},
        ];
        let list;
        list = data.map(function (item, index) {
                return (
                    <Example key={index} name={item.Name} price={item.Price}/>
                )
            });

        return (
            list
        );
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