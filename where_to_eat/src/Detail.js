import React, { Component }from 'react';
import constantData from './canteen_4.json'
import {ReviewModel,Stars} from "./example.js"
var Data = eval(constantData);

const listData = Data.cateen_4[0].Timo;
export default class Others extends React.Component {
  constructor(props) {
    super(props);
    this.state={randomnum:3,indexList:[]}
  }
  RadomOthers(){
    var Range = this.props.totalnum;
    var Rand = Math.random();
    var final = Math.round(Rand*Range);
    this.setState({randomnum: final});
    this.setState({indexList:listData.slice(num,num+this.state.pageSize)})
  }
  render(){
    let price = 1;
    let img = 1;
    return(<div><p>Name:{ this.props.match.parmas.name }</p><ReviewModel /><Stars /></div>);
  }
}
