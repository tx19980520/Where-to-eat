import React from 'react';
import CanteenData from './canteen.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Gallery from './example.js'
var Data = eval(CanteenData);
const canteenList = Data.canteens//我们在这个位置导入我们的餐厅的数据
export class TotalBars extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(<div><img className="img_QNC" src="https://github.com/tx19980520/Where-to-eat/blob/master/pictures/where_to_eat.png?raw=true" /><ul className="nav nav-tabs nav-justified" >
  <li className="active"><Link to={'/'}>菜品大全</Link></li>
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
    <Link to={"/canteen"}><img src={img} width={400} height={300} className="img_CT"/></Link>
    <p className="text-left"><font style={{fontSize: 30}}>{name}</font></p>
    </div>
  );
}
}
class Canteens extends React.Component {
  render(){
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
  componentWillReceiveProps(nextProps){
        //当路由切换时
        if(this.props.location !== nextProps.location){
            window.scrollTo(0,0)
        }
    }
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
      <TotalBars />
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
  <Router>
    <Route component={CanteenRouter} />
  </Router>
  </div>
)
export default CanteenGallery
