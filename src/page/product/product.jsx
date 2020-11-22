import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Space, Button } from 'antd';
const { Search } = Input;
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
const ms = new MyService();
const ps = new ProductService();
import './product.scss';

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      count: 1,
      pageNum: 1,
      listType: 'list'
    };
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
    if(this.state.listType === 'search') {
      listParam.name = this.state.name;
    }
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
	render() {
		return (
			<div>
        <Link to="/product/edit">
          <Button type="primary" className="btn">添加商品</Button>
        </Link>
			</div>
		);
	}
}