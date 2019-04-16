import React, { Component } from 'react';
import {Card,Form, Input, Button,DatePicker} from 'antd';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import TodoRouter from "../../contants/TodoRouter";

@withRouter
@inject("todoStore")
@observer
class TodoEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      todo:'',
      todoDate:''
    }
  }

componentDidMount(){
  if(!! this.props.location.state){
    let {query} = this.props.location.state;
    let {todoStore} = this.props;
    if(!! query){
      let {key} = query;
      let todoItem = todoStore.GetItemByKey(key);
      if(!! todoItem){
        this.setState({
          todo:todoItem.todo,
          todoDate:todoItem.todoDate
        })
      }
    }
  }
}
handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
}
handleDate(date, dateString) {
  this.setState({ todoDate: dateString });
}
editItem(key,data){
  let {todoStore} = this.props;
  todoStore.EditItemByKey(key,data);
  this.props.history.push({pathname:TodoRouter.TODO})
}

  render() {
    let key = this.props.location.state.query.key;
    return (
        <Card title="修改待办事项">
        <Form>
          <Form.Item>
            <Input  name="todo" value={this.state.todo} onChange={this.handleChange.bind(this)}/>
          </Form.Item>
          <Form.Item>
            <DatePicker onChange={this.handleDate.bind(this)} value={moment(this.state.todoDate, "YYYY/MM/DD HH:mm:SS")}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => {this.editItem(key,this.state)}}>修改事项</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default TodoEdit;