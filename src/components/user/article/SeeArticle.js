import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { message, Layout, Typography, Button } from "antd";

@withRouter
class SeeArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            articleName: "",
            author: "",
            date: "",
            content: ""
        };
    }
    componentDidMount() {
        const { query } = this.props.location.state;
        const { id } = query;
        if (!!id) {
            axios
                .get(`http://5bd30967c8f9e400130cb86b.mockapi.io/article/${id}`)
                .then(res => {
                    let article = res.data;
                    this.setState({
                        id: article.id,
                        articleName: article.articleName,
                        author: article.author,
                        date: article.date,
                        content: article.content
                    });
                });
        } else {
            message.warning("操作失败！");
        }
    }
    render() {
        const { Title } = Typography;
        const { Header, Content } = Layout;
        let { articleName, author, date, content } = this.state;
        let normalDate = new Date(parseInt(date) * 1000)
            .toLocaleString()
            .replace(/:\d{1,2}$/, " ");
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
                        {articleName}
                    </Title>
                </Header>
                <Content style={{ backgroundColor: "pink", padding: "5%" }}>
                    <h3>{content}</h3>
                    <br />
                    <h4
                        style={{
                            textAlign: "right"
                        }}
                    >
                        作者：{author}
                        <br />
                        最后修改日期：{normalDate}
                    </h4>
                </Content>
                <Button type="primary" style={{ margin: " 2% 0 0 45%" }}>
                    <Link to="/article">返回</Link>
                </Button>
            </>
        );
    }
}

export default SeeArticle;
