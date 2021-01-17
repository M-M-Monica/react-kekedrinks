import React, { Component } from 'react';
import { Form, Input, Descriptions, Button, message} from 'antd';
const { Item } = Form;
import MyService from '../../service/request.jsx';
import OrderService from '../../service/order-service.jsx';
import UserService from '../../service/user-service.jsx';
const ms = new MyService();
const os = new OrderService();
const us = new UserService();
import './order.scss';

export default class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      user: {},
      order: {},
      goodsArr: this.props.location.query.goodsArr,
      total: this.props.location.query.total,
      showInfo: false
    };
    this.changeUserInfo = this.changeUserInfo.bind(this);
    this.onFinish = this.onFinish.bind(this);
	}
  componentDidMount() {
    let goods = this.state.goodsArr
    let goodsList = JSON.parse(goods)
    let good = []
    goodsList.forEach((item)=>{
      good.push({
        id: item.id,
        count: item.CartList.count
      })
    })
    this.setState({
      list: goodsList
    })
    this.createOrder(good, this.state.total)
  }
  // 加载商品列表
  createOrder(good, total) {
    os.createOrder(good, total).then(res => {
      this.setState({
        user: res.customer,
        order: res.order
      })
    })
  }
  goToPay(id){
    os.goToPay(id).then(res => {
      if(res.error_code == 0){
        message.success('支付成功');
        this.props.history.push({
          pathname: '/drinks'
        })
      }
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  cancelOrder(id){
    os.cancelOrder(id).then(res => {
      if(res.error_code == 0){
        message.success('取消成功');
        this.props.history.push({
          pathname: '/drinks'
        })
      }
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  changeUserInfo(){
    this.setState({
      showInfo: true
    });
  }
  onFinish(values){
    let userInfo = {
      name: values.name,
      tel: values.tel,
      address: values.address
    }
    us.changeUserInfo(userInfo).then(res => {
      if(res.error_code == 0){
        this.setState({
          user: userInfo,
          showInfo: false
        });
      }
    }, errMsg => {
      ms.errorTips(errMsg)
    })
	}
	render() {
		return (
			<div id="order">
        <Descriptions
          bordered
          title="订单信息"
        >
          <Descriptions.Item label="订单号">
            {this.state.order.id}
          </Descriptions.Item>
          <Descriptions.Item label="合计">
            {this.state.order.total}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
              {this.state.order.status > 1 ? '已支付' : '未支付'}
          </Descriptions.Item>
          <Descriptions.Item label="用户">
            {this.state.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="手机">
            {this.state.user.tel}
          </Descriptions.Item>
          <Descriptions.Item label="时间">
            {this.state.order.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="地址" span={3}>
            {this.state.user.address}
          </Descriptions.Item>
          <Descriptions.Item label="商品信息">
          {
            this.state.list.map((item, index) => {
              return (
                <p className="list-item">
                  <img className="pic" src={item.img} />
                  <span>{item.name}</span>
                  <span>数量：{item.CartList.count}</span>
                  <span>￥：{item.CartList.count*item.price}</span>
                </p>
              );
            })
          }
          </Descriptions.Item>
        </Descriptions>
        <Button danger onClick={this.changeUserInfo}>修改信息</Button>    
        <Button danger onClick={()=>this.cancelOrder(this.state.order.id)}>取消订单</Button>
        <Button danger onClick={()=>this.goToPay(this.state.order.id)}>提交订单</Button>
        {
          this.state.showInfo &&
          <div className="mask">
            <div className="user-info">
            <Form
              name="basic"
              onFinish={this.onFinish}
            >
              <Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input placeholder="请输入用户名" value={this.state.user.name}/>
              </Item>
              <Item
                name="tel"
                rules={[
                  {
                    required: true,
                    message: 'Please input your telephone number!',
                  },
                ]}
              >
                <Input placeholder="请输入手机号" value={this.state.user.tel}/>
              </Item>
              <Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <Input placeholder="请输入收货地址" value={this.state.user.address}/>
              </Item>
              <Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Item>
            </Form>
            </div>
          </div>
        }
      </div>
		);
	}
}