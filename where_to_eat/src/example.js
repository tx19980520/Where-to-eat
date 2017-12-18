import React, { Component }from 'react';
import "./example.css"
export class Star extends React.Component {//路过点击和走开都要传值
  constructor(props) {
    super(props);
    this.state = {value:this.props.num,hold:0};
    this.handleStarClick= this.handleStarClick.bind(this);
    this.handleGoStar = this.handleGoStar.bind(this);
    this.handleLeaveStar = this.handleLeaveStar.bind(this);
  }
  handleStarClick() {//鼠标点击,同时会调用onmouseout,改变tempnum值点亮星星
    if (this.props.onSubmit) {
        const {value} = this.state
        this.props.onSubmit({value});
        alert("感谢您的评分");
        }
  }

  handleGoStar(){ //鼠标经过点亮星星。
       if(this.props.onSubmit){
         const {value} = this.state
         this.props.onSubmit({value});
       } //传入的值为正，就是finalnum
     }
     handleLeaveStar() { //鼠标离开时星星变暗
       if(this.props.onSubmit){
         this.setState({})
         const {hold} = this.state
         this.props.onSubmit(hold);
       }  //传入值为0，finalnum为tempnum,初始为0
     }
  render(){
    let list = <div></div>
    const show = this.props.show;
    if(show >= this.state.value || this.state.value == 1){
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
    this.state = {num:0,tempnum:0,finalnum:0};
    this.fnShow = this.fnShow.bind(this);
  }

  fnShow(comment) {
    if(!comment.value)
    {
      this.setState({num:comment.hold});
    }
    else{
      this.setState({num:comment.value});
    }
  }

  render(){
        return (
            <div>
            <Star num={1} show={this.state.num} onSubmit={this.fnShow} />
            <Star num={2} show={this.state.num} onSubmit={this.fnShow} />
            <Star num={3} show={this.state.num} onSubmit={this.fnShow} />
            <Star num={4} show={this.state.num} onSubmit={this.fnShow} />
            <Star num={5} show={this.state.num} onSubmit={this.fnShow} />
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
export class Commentline extends React.Component {
  static defaultProps = {
    comment:[]
  }
  render(){
    return(
      <div>
      <span>{this.props.comment.username} </span>
        <p>{this.props.comment.nowComment}</p>
      </div>
    );
  }
}
export class CommentList extends React.Component {
  static defaultProps = {
    comments: []
  }
  render() {
  return (
     <div>
       {this.props.comments.map((comment, i) =>
         <Commentline comment={comment} key={i} />
       )}
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
    alert(this.state.comments[0].nowComment)
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
      button = <NotReviewButton onClick={this.handleNotviewClick} />;
      review = <CommentInput isView={this.state.isView} onSubmit={this.handleSubmitComment}/>
      previous = <CommentList comments={this.state.comments} />;
    } else {
      button = <ReViewButton onClick={this.handleViewClick} />;
      previous = <CommentList comments={this.state.comments} />;
    }
    return (
      <div>
        {button}
        {review}
        {previous}
      </div>
    );
  }
}

function UserView(props) {
  return (<div><font>您的评论</font><textarea onChange={props.onChange}></textarea></div>);
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
    <input type="text" value={props.username} onChange={props.onChange}/> </div>);
}
function SubmitButton(props) {
    return (<button onClick={props.onClick}>
    提交
    </button>);
}
function ReViewButton(props) {
  return (
    <button onClick={props.onClick}>
      评论
    </button>
  );
}

function NotReviewButton(props) {
  return (
    <button onClick={props.onClick}>
      取消评论
    </button>
  );
}



export default class Catalog extends Component {
    render() {
        let data = [
            {"Name":111,"Price":2.5},
            {"Name":222,"Price":3.5},
        ];
        let list;
        list = data.map(function (item, index) {
                return (
                  <div>
                    <Example key={index} name={item.Name} price={item.Price}/>
                    <ReviewModel />
                    <Stars />
                  </div>
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
