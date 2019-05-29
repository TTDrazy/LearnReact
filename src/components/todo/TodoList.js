import React, { Component } from "react";
import { Table, Button, message } from "antd";
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router-dom"; //将react-router 的 history、location、match 三个对象传入props对象上
import TodoRouter from "../../contants/TodoRouter";

@withRouter
@inject("todoStore")
@observer
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.setState({
            data: this.props.todoStore.List
        });
    }
    editToDoByKey(key) {
        this.props.history.push(
            { pathname: TodoRouter.TODOEDIT },
            {
                query: {
                    key: key
                }
            }
        );
    }
    removeTodoByKey(key) {
        this.props.todoStore.RemoveItemByKey(key);
        message.success("您已成功删除该项待办事项！");
    }

    render() {
        const columns = [
            {
                title: "代办事项",
                dataIndex: "todo",
                key: "todo"
            },
            {
                title: "截止日期",
                dataIndex: "todoDate",
                key: "todoDate"
            },
            {
                title: "操作",
                key: "operation",
                render: ({ key }) => (
                    <>
                        <Button
                            type="info"
                            onClick={() => this.editToDoByKey(key)}
                        >
                            编辑
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => this.removeTodoByKey(key)}
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
                    dataSource={this.props.todoStore.List}
                />
            </>
        );
    }
}
export default TodoList;
