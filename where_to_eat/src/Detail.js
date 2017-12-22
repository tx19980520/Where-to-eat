import React, { Component }from 'react';
import constantData from './canteen_4.json'
import {ReviewModel,Stars} from "./example.js"
var Data = eval(constantData);

const listData = Data.cateen_4[0].甜魔烘焙;
export default class Detail extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    let price = 1;
    let img = 1;
    return(<div><p>Name:{ this.props.match.parmas.name }</p><ReviewModel /><Stars /></div>);
  }
}
