import React, { Component }from 'react';
import constantData from './canteen_4.json';
import {Switch,Route,Link} from 'react-router-dom'
import "./example.css";

var Data = eval(constantData);
const Timonum = Data.canteen_4[0].TimoNum;
const listData = Data.canteen_4[0].Timo;
export class Star extends React.Component {//路过点击和走开都要传值
  constructor(props) {
    super(props);
    this.state = {value:this.props.num,hold:0};
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleGoStar = this.handleGoStar.bind(this);
    this.handleLeaveStar = this.handleLeaveStar.bind(this);
  }
  handleStarClick() {//鼠标点击,同时会调用onmouseout,改变tempnum值点亮星星
    if (this.props.onSubmit) {
        const {value} = this.state
        let hold = 1;
        this.props.onSubmit({value,hold});
        alert("感谢您的评分");
        }
  }

  handleGoStar(){ //鼠标经过点亮星星。
       if(this.props.onSubmit){
         const {value,hold} = this.state
         this.props.onSubmit({value,hold});
       } //传入的值为正，就是finalnum
     }
     handleLeaveStar() { //鼠标离开时星星变暗
       if(this.props.onSubmit){
         const {hold} = this.state
         this.props.onSubmit(hold);
       }
     }
  render(){
    let list = <div></div>
    const show = this.props.show;
    if(show >= this.state.value || this.state.value === 1){
      list=<li class="star light" onClick={this.handleStarClick} onMouseOver={this.handleGoStar} onMouseOut={this.handleLeaveStar}><a href="javascript:;">  </a></li>
    }
    else{
      list=<li class="star" onClick={this.handleStarClick} onMouseOver={this.handleGoStar} onMouseOut={this.handleLeaveStar}><a href="javascript:;">  </a></li>
    }
    return(list);
  }
}
export class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {num:0.0,tempnum:0,statistic:0.0,clicknum:0};
    this.StarsShow = this.StarsShow.bind(this);
  }

  StarsShow(comment) {
    if(comment.hold === 0)
    {
      this.setState({num:comment.value});
    }
    else if(comment.hold === 1){
      this.setState({num:comment.value});//这个地方先改变纯粹是为了样式
      let newclick = this.state.clicknum+1;
      let newnum = (this.state.statistic*this.state.clicknum+comment.value)*1.0/newclick;
      this.setState({statistic:newnum});
      this.setState({clicknum:newclick});
      this.setState({num:newnum});
    }
  }

  render(){
        return (
            <div>
            <p>评分：{this.state.statistic}</p>
            <Star num={1} show={this.state.num} onSubmit={this.StarsShow} />
            <Star num={2} show={this.state.num} onSubmit={this.StarsShow} />
            <Star num={3} show={this.state.num} onSubmit={this.StarsShow} />
            <Star num={4} show={this.state.num} onSubmit={this.StarsShow} />
            <Star num={5} show={this.state.num} onSubmit={this.StarsShow} />
            </div>
        );
  }
}
export class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.state = {isView:this.props.isView, username:"Tony",nowComment:""};
  }
  changeComment(event) {
    this.setState({nowComment: event.target.value});
  }
  changeUser(event) {
  this.setState({username: event.target.value});
}
  handleSubmitClick() {
    if (this.props.onSubmit) {
        this.setState({isView: false});
        const {username, nowComment } = this.state
        this.props.onSubmit({username, nowComment})
        }
      this.setState({nowComment:""});
  }
  render() {
    let submit = <div></div>;
    let username = <div></div>;
    submit = <SubmitButton onClick={this.handleSubmitClick} />;
    username = <UserName username={this.state.username} onChange={this.changeUser}/>;
    return (
      <div>
      {username}
        <Views isView={this.props.isView} onChange={this.changeComment}/>
        {submit}
      </div>
    );
  }
}
//本来我们这个地方是再使用了一次封装来作展示
export class CommentList extends React.Component {
  static defaultProps = {
    comments: []
  }
  render() {
  return (
     <div className="panel panel-warning">
      <div className="panel-heading">
        <h4 className="panel-title">评论区</h4>
      </div>
      <div className="panel-body">
      <table class="table">
        <th>用户</th><th>评论</th>
       {this.props.comments.map((comment, i) =>
         <tr>
         <td>{comment.username} </td>
           <td>{comment.nowComment}</td>
         </tr>
       )}
       </table>
       </div>
     </div>
   );
 }
}
export class ReviewModel extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleNotviewClick = this.handleNotviewClick.bind(this);
    this.handleSubmitComment= this.handleSubmitComment.bind(this);
    this.state = {isView: false ,comments:[]};
  }
  handleSubmitComment (comment) {
    if (!comment.username) return alert('请输入用户名');
    if (!comment.nowComment) return alert('请输入评论内容');
    this.state.comments.push(comment);
    this.setState({
      comments: this.state.comments
    });
    this.setState({isView: false});
  }
  handleViewClick() {
    this.setState({isView: true});
  }

  handleNotviewClick() {
    this.setState({isView: false});
  }

  render() {
    const isView = this.state.isView;
    let previous = <div>noi</div>;
    let button = null;
    let review = <div></div>;
    if (isView) {
      button = <NotReviewButton  onClick={this.handleNotviewClick} />;
      review = <CommentInput isView={this.state.isView} onSubmit={this.handleSubmitComment}/>
      previous = <CommentList comments={this.state.comments} />;
    } else {
      button = <ReViewButton onClick={this.handleViewClick} />;
      previous = <CommentList comments={this.state.comments} />;
    }
    return (
      <div>
        {button}
        <br />
        <br />
        {review}
        {previous}
      </div>
    );
  }
}

function UserView(props) {
  return (<div><font>您的评论</font><textarea className="form-control" style={{ width:300}} rows="3" onChange={props.onChange}></textarea></div>);
}

function UserNotView(props) {
  return <div></div>;
}

function Views(props) {
  const isView = props.isView;
  if (isView) {
    return <UserView onChange={props.onChange}/>;
  }
  return <UserNotView />;
}
function UserName(props) {
  return(<div><font>用户名</font>
    <input type="text" className="form-control"  style={{ width:200}}  value={props.username} onChange={props.onChange}/> </div>);
}
function SubmitButton(props) {
    return (<button onClick={props.onClick}>
    提交
    </button>);
}
function ReViewButton(props) {
  return (
    <button type="button" className="btn btn-warning" onClick={props.onClick}>
      评论
    </button>
  );
}

function NotReviewButton(props) {
  return (
    <button type="button" className="btn btn-primary" onClick={props.onClick}>
      取消评论
    </button>
  );
}


export  class ListBox extends Component {
    constructor(props){
        super(props);
        this.pageNext=this.pageNext.bind(this);
        this.setPage=this.setPage.bind(this);
        this.state = {
            indexList:[],//当前渲染的页面数据
            totalData:listData,
            current: 1, //当前页码
            pageSize:4, //每页显示的条数
            goValue:0,  //要去的条数index
            totalPage:0,//总页数
        };

    }

    componentWillMount(){
        this.setState({
            totalPage:Math.ceil( this.state.totalData.length/this.state.pageSize),
        })
        this.pageNext(this.state.goValue)

    }

    //设置内容
    setPage(num){
        this.setState({
            indexList:this.state.totalData.slice(num,num+this.state.pageSize)
        })
    }
    pageNext (num) {
        this.setPage(num)
    }
    render() {
        return (<div>
                    <ul>
                        {this.state.indexList.map(function (cont) {
                            return (
                              <div>
                              <List {...cont} />
                          </div>)
                        })}
                    </ul>
                    <PageButton { ...this.state } pageNext={this.pageNext} />
                  </div>
        );
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.Thick = this.Thick.bind(this);
        this.Thin = this.Thin.bind(this);
        this.state = {Ison:"noton"}
    }
Thick(){
  this.setState({Ison:"ison"});
}
Thin(){
  this.setState({Ison:"noton"});
}
    render() {
        const { idd, name, price, img } = this.props
        let path = '/canteen/detail/'+this.props.name;
        return (
            <li id={idd} className={this.state.Ison} onMouseOver={this.Thick} onMouseOut={this.Thin}>
                <br></br>
                    <div>
                        <Link to={path}>
                              <img className="imgSize" src={ img }/>
                        </Link>
                        <p>Name:{ name }</p>
                        <p>Price:{ price }</p>
                    </div>
            </li>
        );
    }
}

class PageButton extends Component {

    constructor(props) {
        super(props);
        this.setNext=this.setNext.bind(this);
        this.setUp=this.setUp.bind(this);
        this.state={
            num: 0,
            pagenum:this.props.current
        }
    }
    setNext(){
        if(this.state.pagenum < this.props.totalPage){
            this.setState({
                num:this.state.num + this.props.pageSize,
                pagenum:this.state.pagenum + 1
            },function () {
                this.props.pageNext(this.state.num)
            })
        }
    }

    //上一页
    setUp(){
        if(this.state.pagenum > 1){
            this.setState({
                num:this.state.num - this.props.pageSize,
                pagenum:this.state.pagenum - 1
            },function () {
                this.props.pageNext(this.state.num)
            })
        }
    }

    render() {
        return (
            <div>
            <ul className='pager'>
            <li className="previous">
                <button onClick={ this.setUp } ><span className="glyphicon glyphicon-backward" style={{color:'rgb(251,206,45)'}}>上一页</span></button>
              </li>
              <li><span>{ this.state.pagenum }页/ { this.props.totalPage }页</span></li>
                <li className='next'>
                <button onClick={ this.setNext }><span className="glyphicon glyphicon-forward" style={{color:"rgb(251,206,45)" }}> 下一页</span></button>
              </li>
            </ul>
            <hr style={{height:"1px",border:"none",color:"#fbce2d"}} />
			</div>
        );
    }
}
export class ModalRouter extends React.Component {
  previousLocation = this.props.location
  //####################这一块不要动####################
  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/canteen' component={ListBox}/>
          <Route path='/canteen/detail/:data' component={Detail} >
            <Route path='/canteen/detail/:data' component={Detail} />
          </Route>
        </Switch>
      </div>
    )
  }
}
const Detail =({match})=>{
  var price = ""
  var img = ""
  listData.map(function(cont){
    if(cont.name === match.params.data)
    {
      price = cont.price;
      img = cont.img;
    }
  })//We enter a new page here, contributor can add something here. --tx
  return(<div>
    <ScrollToTop>
      <h4><font style={{fontSize: 20}}>{match.params.data}</font></h4>
      <img src={img} />
      <p>price:{price}</p>
      <ReviewModel />
      <Stars />
      <br />
      <Others totalnum={Timonum} />
    </ScrollToTop>
      </div>);
}

class Others extends React.Component {
  constructor(props) {
    super(props);
    var Range = this.props.totalnum;
    var final = Math.floor(Math.random()*Range)
    if(final+4>this.props.totalnum)
    {
      this.state={randomnum:final,indexList:listData.slice(final-4,final)}
    }
    else{
      this.state={randomnum:final,indexList:listData.slice(final,final+4)}
    }
  }
  render(){
    let others = this.state.indexList.map(function (cont){
      return(<div><Link to={"/canteen/detail/"+cont.name}><img src={cont.img} /></Link><p>name:{cont.name}  price:{cont.price}</p>
      </div>);
    })
    return(<div><br /><p>其他推荐</p>{others}</div>);
  }
}
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}
const Gallery = () => (
  <div class="panel panel-default">
  <div class="panel-body">
    <Route component={ModalRouter} />
  </div>
  </div>
)
export default Gallery
