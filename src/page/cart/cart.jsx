import React, { Component } from 'react';
import { message, Checkbox, Button } from 'antd';
import MyService from '../../service/request.jsx';
import CartService from '../../service/cart-service.jsx';
const ms = new MyService();
const cs = new CartService();
import './cart.scss';
import trash from '../../static/trash.png';
import de_pic from '../../static/de.png';
import in_pic from '../../static/in.png';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      total: 0,
      clickBtn: true
    };
	}
	componentDidMount() {
    this.loadCartList();
  }
  // 加载购物车列表
  loadCartList() {
    cs.getCartList().then(res => {
      let cartList = res
      let sum = 0
      let single
      if(cartList.length != 0){
        cartList.forEach((item)=>{
          single = item.CartList.status === 1 ? item.price*item.CartList.count : 0
          sum += single
          return sum
        })
      }
      this.setState({
        list: cartList,
        total: sum,
        clickBtn: sum>0?false:true
      })
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  deleteGood(id){
    cs.deleteGood(id).then(res => {
      message.success('删除成功');
      this.loadCartList();
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  selectChange(id){
    cs.checkboxChange(id).then(res => {
      this.loadCartList();
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  // 增加商品
  increase(id) {
    cs.increase(id).then(res => {
      this.loadCartList();
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  // 减少商品
  decrease(id,count) {
    if(count>1){
      cs.decrease(id).then(res => {
        this.loadCartList();
      }, errMsg => {
        ms.errorTips(errMsg)
      })
    }
  }
  goToPay(){
    let cart = this.state.list
    let goodsArr = []
    cart.forEach((item)=>{
      if(item.CartList.status === 1){
        goodsArr.push(item)
      }
    })
    this.props.history.push({
      pathname: '/order',
      query: {
        goodsArr: JSON.stringify(goodsArr),
        total: this.state.total
      }
    })
  }
	render() {
		return (
      <div id="cart_list">
        {
          this.state.list.map((item, index) => {
            return (
              <div className="list-item" key={item.id}>
                <Checkbox checked={item.CartList.status} onChange={()=>this.selectChange(item.id)}></Checkbox>
                <img className="pic" src={item.img} />
                <div className="list-item-info">
                  <span>{item.name}</span>
                  <span className="count">
                  <img src={de_pic} onClick={()=>this.decrease(item.id, item.CartList.count)}/>
                    <span>{item.CartList.count}</span>
                  <img src={in_pic} onClick={()=>this.increase(item.id)}/>
                  </span>
                  <span>单价：{item.price}</span>
                  <span>￥：{item.CartList.count*item.price}</span>
                </div>
                <img id="delete" src={trash} onClick={()=>this.deleteGood(item.id)}/>
              </div>
            );
          })
        }
        <div className="list-item sum">
          <span>合计</span>
          <span className="total">￥：{this.state.total}</span>
          <Button danger disabled={this.state.clickBtn} onClick={()=>this.goToPay()}>结算</Button>
        </div>
			</div>
		);
  }
}
