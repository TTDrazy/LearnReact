import React, { Component } from "react";
import { Card, Button } from "antd";
import { withRouter, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@withRouter
@inject("userStore")
@observer
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            tel: ""
        };
    }
    componentDidMount() {
        let { showUserInfo } = this.props.userStore;
        if (!!showUserInfo[0]) {
            this.setState({
                name: showUserInfo[0].name,
                password: showUserInfo[0].password,
                tel: showUserInfo[0].tel
            });
        } else {
            this.setState({
                name: "",
                password: "",
                tel: ""
            });
        }
    }
    render() {
        if (!!this.state.name) {
            let { name } = this.state;
            return (
                <div>
                    <Card title={`Hello Dear , ${name}`}>
                        <div style={{padding:'0 0 3% 0'}}>您可以选择进入您的私人文章管理页面</div>
                        <Button type="primary">
                            <Link to="/article">跳转</Link>
                        </Button>
                    </Card>
                </div>
            );
        } else {
            return (
                <div>
                    <Card title="对不起，没有找到您的用户信息，请重新登录！">
                        <div style={{padding:'0 0 3% 0'}}>您可以选择重新登录</div>
                        <Button type="primary">
                            <Link to="/login">重新登录</Link>
                        </Button>
                    </Card>
                </div>
            );
        }
    }
}
export default Home;
