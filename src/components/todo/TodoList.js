import React, {Component} from 'react';
import {Table} from 'antd';

export default class TodoList extends Component {
    render() {
        const columns = [{
                title: '代办事项',
                dataIndex: 'todoName',
                key: 'todoName'
            },
            {
                title: '添加日期',
                dataIndex: 'addDate',
                key: 'addDate'
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: () => < a href = "javascript:;" > 查看 </a>,
            },
        ];
        const data = [{
            key: '1',
            todoName: '学习react',
            addDate: '2019-3-26 21:53',
        }, {
            key: '2',
            todoName: '嘻嘻嘻',
            addDate: '2019-3-26 21:58',
        }];
        return (
            <>
                <Table columns={columns} dataSource={data} />
            </>
        )
    }
}