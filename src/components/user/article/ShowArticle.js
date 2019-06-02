import React, { Component } from "react";
import { Table, Button } from "antd";
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
                this.setState({
                    article: allArticle
                });
            });
    }
    removeArticle(key) {
        console.log(key);
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
                render: ({ key }) => (
                    <>
                        <Button type="primary">
                            <Link to="/article/see">查看</Link>
                        </Button>
                        <Button type="info">
                            <Link to="/article/edit">编辑</Link>
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => {
                                this.removeArticle(key);
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
                <Table columns={columns} dataSource={this.state.article} />
                <Button type="primary" style={{ margin: "0 auto" }}>
                    <Link to="/article/add">新增文章</Link>
                </Button>
            </>
        );
    }
}
export default ShowArticle;
