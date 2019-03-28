import React, { Component } from 'react'
import {
    Card,Form, Input, Button,DatePicker
  } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class TodoForm extends Component {
  render() {
    return (
        <Card title="添加待办事项">
        <Form>
          <Form.Item>
            <Input placeholder="输入代办事项" />
          </Form.Item>
          <Form.Item>
            <RangePicker size={'default'} showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => this.handleAddTodo()} >新增代办事项</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
