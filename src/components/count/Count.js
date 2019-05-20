import React, { Component } from 'react';
import {Button,Alert} from 'antd';
import { inject, observer } from "mobx-react";

@inject('countStore')
@observer
class Count extends Component {
  constructor(props){
    super(props);
  }
  handlerIncrease(){
    this.props.countStore.Increase();
  }
  handlerDecrease(){
    this.props.countStore.Decrease();
  }
  render() {
    let {ShowNumber} = this.props.countStore;
    return (
      <div>
        <Button type = "primary" shape = "round" onClick = {()=> this.handlerIncrease()}>+</Button>
        <Button type = "primary" shape = "round" onClick = {()=> this.handlerDecrease()}>-</Button>
        <Alert style={{ margin: '16px 0' }} message={ShowNumber} />
      </div>
    )
  }
}
export default Count;