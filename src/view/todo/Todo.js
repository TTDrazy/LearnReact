import React, { Component } from 'react'
import TodoList from '../../components/todo/TodoList';
import { Button,Card } from 'antd';
import TodoRouter from '../../contants/TodoRouter'
export default class Todo extends Component {
    constructor(props){
        super(props);
    }
    handleAdd=()=>{
       this.props.history.push({pathname:TodoRouter.TODOADD});       
    }
    render() {
        let addToDoBtn = (<Button type="primary" onClick={()=>{this.handleAdd()}}>新增待办事项</Button>)
        return (          
            <>  
                <Card extra={addToDoBtn}>
                    <TodoList />
                </Card>
            </>
        )
    }
}
