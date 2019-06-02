import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            rePassword: "",
            tel: ""
        };
    }
    getData(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleRegister() {
        let { name, password, rePassword, tel } = this.state;
        if (!name) {
            message.info("您的用户名不能为空！");
            //用户名只能输入5-20个以字母开头、可带数字、“_”、“.”的字串
        } else if (!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.exec(name)) {
            message.warning(
                "您的用户名必须为以字母开头，并且为5-20位（可含数字，“_”、“.”）！"
            );
        } else if (!password) {
            message.info("您的密码不能为空！");
            //密码只能输入6-20个字母、数字、下划线
        } else if (!/^(\w){6,20}$/.exec(password)) {
            message.warning("您的密码必须为6-20位（可含数字，字母，下划线）！");
        } else if (!rePassword) {
            message.info("您再次输入的密码不能为空！");
        } else if (rePassword !== password) {
            message.warning("您的密码两次输入的不符！");
        } else if (!tel) {
            message.info("您的手机号码不能为空！");
            //手机号以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
        } else if (/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
            axios
                .post(`http://5bd30967c8f9e400130cb86b.mockapi.io/user`, {
                    name,
                    password,
                    tel
                })
                .then(() => {
                    message.success("注册成功！");
                    this.setState({
                        name: "",
                        password: "",
                        rePassword: "",
                        tel: ""
                    });
                });
        } else {
            message.warning(
                "您的手机号必须以1开头，第二位为3/4/5/7/8中任一一个，且长度为11位的纯数字！"
            );
        }
    }
    render() {
        let { name, password, rePassword, tel } = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 }
        };
        return (
            <div>
                <Form
                    layout="horizontal"
                    style={{ width: "60%", margin: "0 auto" }}
                >
                    <Form.Item label="用户名" {...formItemLayout}>
                        <Input
                            placeholder="请输入用户名"
                            name="name"
                            onChange={e => {
                                this.getData(e);
                            }}
                            value={name}
                        />
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                        <Input
                            type="password"
                            placeholder="请输入密码"
                            name="password"
                            onChange={e => {
                                this.getData(e);
                            }}
                            value={password}
                        />
                    </Form.Item>
                    <Form.Item label="确认密码" {...formItemLayout}>
                        <Input
                            type="password"
                            placeholder="请再次输入密码"
                            name="rePassword"
                            onChange={e => {
                                this.getData(e);
                            }}
                            value={rePassword}
                        />
                    </Form.Item>
                    <Form.Item label="电话号码" {...formItemLayout}>
                        <Input
                            placeholder="请输入电话号码"
                            name="tel"
                            onChange={e => {
                                this.getData(e);
                            }}
                            value={tel}
                        />
                    </Form.Item>
                    <Form.Item
                        {...buttonItemLayout}
                        style={{ margin: "0 30% 0 30%" }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                this.handleRegister();
                            }}
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create()(Register);
