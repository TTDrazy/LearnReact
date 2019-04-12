import React, { Component } from 'react'
import {Card,Form, Input, Button,DatePicker} from 'antd';
import { observer, inject } from 'mobx-react';
import TodoRouter from '../../../../educate/ReactFramework/src/contants/TodoRouter';

@inject("todoStore")
@observer

 class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo:'',
      todoDate:''
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleChangeDate=(date, dateString)=>{
    this.setState({
      todoDate:dateString
    })
  }
  handleAddTodo=()=>{
    this.props.todoStore.Add(this.state);
    this.props.history.push(TodoRouter.TODO);
  } 

  render() {
    return (
        <Card title="添加待办事项">
        <Form>
          <Form.Item>
            <Input placeholder="输入代办事项" name="todo" value={this.state.todo} onChange={this.handleChange.bind(this)}/>
          </Form.Item>
          <Form.Item>
            <DatePicker onChange={this.handleChangeDate.bind(this)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => this.handleAddTodo()} >新增代办事项</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default TodoForm;
