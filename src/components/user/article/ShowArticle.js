import React, { Component } from "react";
import { Table, Button, message } from "antd";
import { withRouter, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import axios from "axios";

@withRouter
@inject("userStore")
@observer
class ShowArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: []
        };
    }

    componentDidMount() {
        let { showUserInfo } = this.props.userStore;
        let author = "";
        if (!!showUserInfo[0]) {
            author = showUserInfo[0].name;
        }
        axios
            .get("http://5bd30967c8f9e400130cb86b.mockapi.io/article")
            .then(res => {
                let allArticle = res.data;
                allArticle = allArticle.filter(item => item.author === author);
                allArticle.map(item => {
                    let normalDate = new Date(parseInt(item.date) * 1000)
                        .toLocaleString()
                        .replace(/:\d{1,2}$/, " ");
                    item.date = normalDate;
                });
                this.setState({
                    article: allArticle
                });
            });
    }
    removeArticleById(id) {
        if (!!id) {
            const newArticle = this.state.article.filter(
                item => item.id !== id
            );
            this.setState({
                article: newArticle
            });
            axios
                .delete(
                    `http://5bd30967c8f9e400130cb86b.mockapi.io/article/${id}`
                )
                .then(message.success(`删除文章编号：${id}的文章成功！`));
        } else {
            message.warning("操作无效！");
        }
    }
    goToSeeArticle(id) {
        if (!!id) {
            this.props.history.push(
                { pathname: "/article/see" },
                {
                    query: {
                        id: id
                    }
                }
            );
        } else {
            message.warning("操作无效！");
        }
    }
    goToEditArticle(id) {
        if (!!id) {
            this.props.history.push(
                { pathname: "/article/edit" },
                {
                    query: {
                        id: id
                    }
                }
            );
        } else {
            message.warning("操作无效！");
        }
    }

    render() {
        const columns = [
            {
                title: "文章编号",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "文章标题",
                dataIndex: "articleName",
                key: "articleName"
            },
            {
                title: "创建/修改时间",
                dataIndex: "date",
                key: "date"
            },
            {
                title: "操作",
                key: "operation",
                render: ({ id }) => (
                    <>
                        <Button
                            type="primary"
                            onClick={() => this.goToSeeArticle(id)}
                        >
                            查看
                        </Button>
                        <Button
                            type="info"
                            onClick={() => this.goToEditArticle(id)}
                        >
                            编辑
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => {
                                this.removeArticleById(id);
                            }}
                        >
                            删除
                        </Button>
                    </>
                )
            }
        ];
        return (
            <>
                <Table
                    columns={columns}
                    dataSource={this.state.article}
                    key={Math.random()}
                />
                <Button type="primary" style={{ margin: " 2% 0 0 45%" }}>
                    <Link to="article/add">新增文章</Link>
                </Button>
            </>
        );
    }
}
export default ShowArticle;
