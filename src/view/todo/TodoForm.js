import React, { Component } from 'react'
import {
    Card,Form, Input, Button,DatePicker
  } from 'antd';
const { RangePicker} = DatePicker;
import { observer, inject } from 'mobx-react';

@inject("todoStore")
@observer

 class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo:'',
      todoDate:[]
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleChangeDate=(dates,dateStrings)=>{
    this.setState({
      todoDate:this.state.todoDate.push(dateStrings)
    })
  }
  handleAddTodo=()=>{
    this.props.todoStrore.Add(this.state);
  } 

  render() {
    return (
        <Card title="添加待办事项">
        <Form>
          <Form.Item>
            <Input placeholder="输入代办事项" name="todo" value={this.state.todo} onChange={this.handleChange.bind(this)}/>
          </Form.Item>
          <Form.Item>
            <RangePicker showTime onChange={this.handleChangeDate.bind(this)}/>
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
