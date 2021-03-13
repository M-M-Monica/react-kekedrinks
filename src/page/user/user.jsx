import React, { Component } from 'react';
import { message, Button } from 'antd';
import MyService from '../../service/request.jsx';
import UserService from '../../service/user-service.jsx';
const ms = new MyService();
const us = new UserService();
import './user.scss';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: []
    };
	}
	componentDidMount() {
    this.loadOrderList();
  }
  // 加载购物车列表
  loadOrderList() {
    us.showMyOrder().then(res => {
      this.setState({
        list: res
      })
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  goToPay(id){
    us.goToPay(id).then(res => {
      if(res.error_code == 0){
        message.success('支付成功');
        this.loadOrderList();
      }
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
	render() {
		return (
      <div id="order_list">
        {
          this.state.list.map((item, index) => {
            return (
              <div key={item.id}>
                <p>
                  <span>订单号：{item.id}</span>
                  <span>合计￥：{item.total}</span>
                  <span>{item.createdAt}</span>
                  <span>状态：
                    {
                      item.status>1
                      ?(
                        <Button size="mini">已支付</Button>
                      )
                      :(
                        <span>
                        <Button size="mini">未支付</Button>
                        <Button size="mini" danger onClick={()=>this.goToPay(item.id)}>去支付</Button>
                        </span>
                      )
                    }
                  </span>
                </p>
                {
                  item.Products.map((ele, index) => {
                    return(
                      <div className="list-item" key={ele.id}>
                        <img className="pic" src={ele.img} />
                        <div className="list-item-info">
                          <span>{ele.name}</span>
                          <span>单价：{ele.price}</span>
                          <span>￥：{ele.OrderList.count*ele.price}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            );
          })
        }
			</div>
		);
  }
}
