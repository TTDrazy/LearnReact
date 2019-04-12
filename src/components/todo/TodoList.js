import React, {Component} from 'react';
import {Table} from 'antd';
import { observer, inject } from "mobx-react";

@inject("todoStore")
@observer
class TodoList extends Component {
constructor(props){
    super(props);
    this.state = {
        data:[]
    }
}
componentDidMount(){
    this.setState({
        data:this.props.todoStore.List
    })
}

    render() {
        const columns = [{
                title: '代办事项',
                dataIndex: 'todo',
                key: 'todo'
            },
            {
                title: '截止日期',
                dataIndex: 'todoDate',
                key: 'todoDate'
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => < a href = "javascript:;" > 查看 </a>,
            },
        ];       
        return (
            <>
                <Table columns={columns} dataSource={this.state.data} />
            </>
        )
    }
}
export default TodoList;