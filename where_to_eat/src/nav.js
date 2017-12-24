import React from 'react';
import CanteenData from './canteen.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Gallery from './example.js'
import './nav.css'
var Data = eval(CanteenData);
const canteenList = Data.canteens//我们在这个位置导入我们的餐厅的数据
export class TotalBars extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="col-md-12">
      <nav className="navbar navbar-inverse" role="navigation">
	<div className="container-fluid">
    <div className="navbar-header">
        <a className="navbar-brand"><Link to={'/'}><span>去哪吃</span></Link></a>
    </div>
    <div>
        <ul className="nav navbar-nav">
            <li className="active"><Link to={'/'}><span>去哪吃</span></Link></li>
            <li className='disable'><a href="javascript:alert('敬请期待！');">食堂实况</a></li>
            <li className='disable'><a href="javascript:alert('敬请期待！');">个性推荐</a></li>
            <li className="active">
            <div className="search">
            <form className="bs-example bs-example-form" >
            <div className="input-group text-center" style={{ width:200}}>
            <input type="text" className="form-control" placeholder="search..." />
            <span className="input-group-btn">
                 <button className="btn btn-default" type="submit">
                   search
                 </button>
               </span>
            </div>
            </form>
            </div>
            </li>
            <li className="active">
            <a type="button" href="javascript:alert('敬请期待！');">登陆/注册</a>
            </li>
        </ul>
    </div>
	</div>
</nav>
</div>);
  }
}//对于直接在react中加样式的一个尝试
var style_list={
    color:'black',
    fontSize:30,
    fontWeight:"normal"
}

class CanteenImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    const { name, img } = this.props;
  return (
    <div className="panel panel-default">
    <div className="panel-body">
    <Link to={"/canteen"}><div className="img_CT"><img src={img} className="CanteenImageSize thumbnail"/></div></Link>
    <p className="text-center" style={style_list}><span className="label label-warning">{name}</span></p>
    </div>
    </div>
  );
}
}
class Canteens extends React.Component {
  render(){
  return (
    <div className="panel panel-default">
    <div className="pannel-body">
    <ul>
    {canteenList.map(function (cont) {
        return (
                <div className="col-sm-6 col-md-4" >
                  <CanteenImage {...cont} />
              </div>)
              })}
            </ul>
		  </div>
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
      <div className="col-md-10 col-md-offset-1">
      <Switch location = {isModal ? this.previousLocation : location} >
      <Route exact path='/' component={Canteens}/>
      <Route path='/canteen' component={Gallery}/>
      </Switch>
      </div>
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
