import React, { Component }from 'react';
export class ReviewModel extends React.Component {
  constructor(props) {
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleNotviewClick = this.handleNotviewClick.bind(this);
    this.state = {isView: false};
  }

  handleViewClick() {
    this.setState({isView: true});
  }

  handleNotviewClick() {
    this.setState({isView: false});
  }

  render() {
    const isView = this.state.isView;

    let button = null;
    if (isView) {
      button = <NotReviewButton onClick={this.handleNotviewClick} />;
    } else {
      button = <ReViewButton onClick={this.handleViewClick} />;
    }

    return (
      <div>
        <Views isView={isView} />
        {button}
      </div>
    );
  }
}

function UserView(props) {
  return <textarea>Welcome back!</textarea>;
}

function UserNotView(props) {
  return <div></div>;
}

function Views(props) {
  const isView = props.isView;
  if (isView) {
    return <UserView />;
  }
  return <UserNotView />;
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
