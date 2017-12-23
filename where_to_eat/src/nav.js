import React, {
  Component
} from 'react';
import CanteenData from './canteen.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import App from './App.js';
import Gallery from './example.js'
import Detail from './example.js'
var Data = eval(CanteenData);
const canteenList = Data.canteens//我们在这个位置导入我们的餐厅的数据
export class TotalBars extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div><img src="https://github.com/tx19980520/Where-to-eat/blob/master/pictures/where_to_eat.png?raw=true" /><ul className="nav nav-tabs nav-justified">
  <li className="active"><a href="javascript:;">菜品大全</a></li>
  <li className='disable'><a href="javascript:alert('敬请期待！');">食堂实况</a></li>
  <li className='disable'><a href="javascript:alert('敬请期待！');">个性推荐</a></li>
</ul></div>);
  }
}
class CanteenImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    const { name, img } = this.props;
  return (
    <div>
    <Link to={"/canteen"}><img src={img} /></Link>
    <p>{name}</p>
    </div>
  );
}
}
class Canteens extends React.Component {
  render(){
    const { name, img } = this.props;
  return (
    <div>
    <ul>
    {canteenList.map(function (cont) {
        return (
                <div>
                  <CanteenImage {...cont} />
              </div>)
              })}
            </ul>
          </div>);
}
}
class CanteenRouter extends React.Component {
  previousLocation = this.props.location
  //####################这一块不要动####################
  componentWillUpdate(nextProps) {
    const {
      location
    } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const {location} = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    ) //###########到这里下面的东西可以开始改了########################
    return ( <div >
      <Switch location = {isModal ? this.previousLocation : location} >
      <Route exact path='/' component={Canteens}/>
      <Route path='/canteen' component={Gallery}/>
      </Switch>
      </div>
    )
  }
}
const CanteenGallery=()=>(
  <div>
  <TotalBars />
  <Router>
    <Route component={CanteenRouter} />
  </Router>
  </div>
)
export default CanteenGallery
