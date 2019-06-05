import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";
import { message, Layout, Typography, Input, Button } from "antd";
import moment from "moment";

@withRouter
@inject("userStore")
@observer
class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleName: "",
            author: "",
            date: "",
            content: ""
        };
    }
    componentDidMount() {
        let { showUserInfo } = this.props.userStore;
        if (!!showUserInfo[0]) {
            this.setState({
                author: showUserInfo[0].name
            });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitArticle = () => {
        if (!!this.state.author) {
            let nowDate =  moment().format("X");
            this.setState({
                date: nowDate
            });
            let { articleName, author, content } = this.state;
            console.log(this.state)
            axios
                .post(`http://5bd30967c8f9e400130cb86b.mockapi.io/article`, {
                    articleName,
                    author,
                    date:nowDate,
                    content
                })
                .then(() => {
                    message.success("添加成功！");
                    console.log(this.state)
                    this.props.history.push("/article");
                });
        }else{
            message.warning('操作失败！');
        }
    };

    render() {
        const { Title } = Typography;
        const { TextArea } = Input;
        const { Header, Content } = Layout;
        let { articleName, author, content } = this.state;
        return (
            <>
                <Header style={{ backgroundColor: "rgba(0,160,233,0.7)" }}>
                    <Title
                        level={3}
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            paddingTop: "1%"
                        }}
                    >
                        <Input
                            name="articleName"
                            value={articleName}
                            onChange={e => this.handleChange(e)}
                        />
                    </Title>
                </Header>
                <Content style={{ backgroundColor: "pink", padding: "5%" }}>
                    <h3>
                        <TextArea
                            autosize
                            name="content"
                            value={content}
                            onChange={e => this.handleChange(e)}
                        />
                    </h3>
                    <br />
                    <h4
                        style={{
                            textAlign: "right"
                        }}
                    >
                        作者：{author}
                    </h4>
                </Content>
                <Button
                    type="primary"
                    style={{ margin: " 2% 0 0 43%" }}
                    onClick={this.submitArticle}
                >
                    添加
                </Button>
                <Button type="default" style={{ margin: " 2% 30% 0 0" }}>
                    <Link to="/article">返回</Link>
                </Button>
            </>
        );
    }
}

export default AddArticle;
