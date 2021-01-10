import React, { Component } from 'react';
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
import CartService from '../../service/cart-service.jsx';
const ms = new MyService();
const ps = new ProductService();
const cs = new CartService();
import './product.scss';

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
      //category: this.props.match.path,
      list: [],
      count: 1,
      pageNum: 1,
      listType: this.props.match.path
    };
    this.addGood = this.addGood.bind(this);
	}
  componentDidMount() {
    this.loadProductList();
  }
  // 加载商品列表
  loadProductList() {
    let listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    };
    ps.getProductList(listParam).then(res => {
      this.setState({
        count: res.count,
        list: res.rows
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    });
  }
  addGood(id){
    cs.addGood(id).then(res => {
      console.log('addgood', res)
      // this.setState({
      //   count: res.count,
      //   list: res.rows
      // });
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
	render() {
		return (
			<div id="product_list">
        {
          this.state.list.map((item, index) => {
            return (
              <div className="list-item">
                <img className="pic" src={item.img} />
                <div className="list-item-info">
                  <p>{item.name}</p>
                  <p>￥：{item.price}</p>
                </div>
                <img id="add" src={add} onClick={this.addGood(item.id)}/>
              </div>
            );
          })
        }
			</div>
		);
	}
}