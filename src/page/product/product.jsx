import React, { Component } from 'react';
import { message, Pagination } from 'antd';
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
//import CartService from '../../service/cart-service.jsx';
const ms = new MyService();
const ps = new ProductService();
//const cs = new CartService();
import './product.scss';
import add from '../../static/add.png'

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      count: 1,
      pageNum: 1,
      pageSize: 4,
      category: this.props.match.path
    };
	}
  componentDidMount() {
    this.loadProductList();
  }
  // 加载商品列表
  loadProductList() {
    let listParam = {
      category: this.state.category,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    };
    console.log('listParam',listParam)
    ps.getProductList(listParam).then(res => {
      console.log('res',res)
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
    ps.addGood(id).then(res => {
      message.success('添加成功');
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
              <img id="add" src={add} onClick={()=>this.addGood(item.id)}/>
            </div>
          );
        })
      }
      <div className="page">
        <Pagination
          current={this.state.pageNum}
          pageSize={this.state.pageSize}
          total={this.state.count}
          onChange={(pageNum)=>this.onPageNumChange(pageNum)}
        />
      </div>
      </div>
		);
	}
}