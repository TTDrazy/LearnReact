import React, { Component } from 'react';
import axios from 'axios';
import {Link,withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message} from 'antd';
import { inject, observer } from "mobx-react";

@withRouter
@inject('userStore')
@observer
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      name:'',
      password:'',
      tel:''
    }
  }
  getData(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleLogin(){
    let{name,password} = this.state;
    if(!!name && !!password){
      axios.get(`http://5bd30967c8f9e400130cb86b.mockapi.io/user`)
        .then((res)=>{
          let personList = res.data;
          personList = personList.filter((item)=>item.name === name && item.password === password);
          if(personList.length > 0){
              message.success('登陆成功！');
              message.info('将在3s后为您跳转至个人中心！');
              setTimeout(() => {
                this.props.history.push('/user');
              }, 3000);
              this.props.userStore.SaveUserInfo(this.state);
              this.setState({
              name:'',
              password:''
            });
           }else{
            message.error('您的用户名或密码输入有误！');
          }
        })
      }else{
        message.warning('用户名和密码均不为空！');
      }
    }

  render() {
    let{name,password} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form style={{width:'30%',margin:'0 auto'}}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名不能为空！' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
              name="name" onChange={(e)=>{this.getData(e)}} setFieldsValue={name}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password" placeholder="密码"
              name="password" onChange={(e)=>{this.getData(e)}} setFieldsValue={password}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox style={{float:'left'}}>记住我</Checkbox>)}
          <a href="" style={{float:'right'}}>
             <Link to="/register">注册</Link>
          </a>
          <br/>
           <Button type="primary" htmlType="submit" style={{margin:'0 0 0 40%'}} className="login-form-button" onClick={()=>{this.handleLogin()}}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
    )
  }
}
export default Form.create()(Login);
