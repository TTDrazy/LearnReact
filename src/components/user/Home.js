import React, { Component } from 'react'
import {Button} from 'antd';
import {withRouter,Link} from 'react-router-dom';
import { inject, observer, toJS } from "mobx-react";

@withRouter
@inject('userStore')
@observer
class Home extends Component {
constructor(props){
    super(props);
    this.state = {
        user:[]
    }
}
componentDidMount() {
    let {showUserInfo} = this.props.userStore;
    console.log(showUserInfo);
    this.setState({
          user: 1
      })
}


  render() { 
     if(!!this.state.user){
        return (
        <div>
            Hello Dear,
            {this.state.user}!
        </div>
        )
    }else{
        return (
            <div>
                对不起，没有找到您的用户信息，请重新登录！
                <Button><Link to='/login'>去登录界面</Link></Button>
            </div>
        )
    }
  }
}
export default Home;