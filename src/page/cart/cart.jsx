import React, { Component } from 'react';
import MyService from '../../service/request.jsx';
import CartService from '../../service/cart-service.jsx';
const ms = new MyService();
const cs = new CartService();
import './cart.scss';
import trash from '../../static/trash.png'

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      count: 0,
      list: []
    }
	}
	componentDidMount() {
    this.loadCartList();
  }
  // 加载购物车列表
  loadCartList() {
    ps.getCartList().then(res => {
      this.setState({
        count: res.count,
        list: res.rows
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  deleteGood(id){
    cs.deleteGood(id).then(res => {
      console.log('deleteGood', res)
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  selectChange(id){
    cs.checkboxChange(id).then(res => {
      console.log('deleteGood', res)
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  // 增加商品
  increase(id) {
    cs.increase(id).then(res => {
      console.log('increase', res)
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  // 减少商品
  decrease(id) {
    let count = e.currentTarget.dataset.count
    if(count>1){
      cs.decrease(id).then(res => {
        console.log('decrease', res)
      }, errMsg => {
        ms.errorTips(errMsg)
      })
    }
  }
	render() {
		return (
      <div id="cart_list">
        {
          this.state.list.map((item, index) => {
            return (
              <div className="list-item">
                <img className="pic" src={item.img} />
                <div className="list-item-info">
                  <span>{item.name}</span>
                  <span>数量：{item.num}</span>
                  <span>单价：{item.price}</span>
                  <span>￥：{item.price}</span>
                </div>
                <img id="delete" src={trash} onClick={this.deleteGood(item.id)}/>
              </div>
            );
          })
        }
        <div className="list-item sum">
          <span>合计</span>
          <span className="total">￥：item.price</span>
          <button id="pay" className="btn btn-danger" disabled>结算</button>
        </div>
			</div>
		);
  }
}
