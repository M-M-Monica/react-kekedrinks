import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Space, Button } from 'antd';
const { Search } = Input;
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
const ms = new MyService();
const ps = new ProductService();
import './product.scss';
import add from '../../static/add.png'
import d1 from '../../static/d1.png'
import d2 from '../../static/d2.png'
import d3 from '../../static/d3.png'
import d4 from '../../static/d4.png'
import s1 from '../../static/s1.png'
import s2 from '../../static/s2.png'
import s3 from '../../static/s3.png'
import s4 from '../../static/s4.png'
export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
      category: this.props.match.path,
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
    console.log(this.state.category)
    if(this.state.category === '/drinks'){
      this.state.list = []
      this.state.list = [
        {
          id: 1,
          img: 'img/d1.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 2,
          img: 'img/d2.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 1,
          img: 'img/d3.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 2,
          img: 'img/d4.png',
          name: '青苹果乐园',
          price: 12
      }]
    }else if(this.state.category === '/dessert'){
      this.state.list = []
      this.state.list = [
        {
          id: 1,
          img: 'img/s1.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 2,
          img: 'img/s2.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 1,
          img: 'img/s3.png',
          name: '青苹果乐园',
          price: 12
        },
        {
          id: 2,
          img: 'img/s4.png',
          name: '青苹果乐园',
          price: 12
      }]
    }
    // let listParam = {
    //   listType: this.state.listType,
    //   pageNum: this.state.pageNum
    // };
    // if(this.state.listType === 'search') {
    //   listParam.name = this.state.name;
    // }
    // ps.getProductList(listParam).then(res => {
    //   this.setState({
    //     count: res.count,
    //     list: res.rows
    //   });
    // }, errMsg => {
    //   ms.errorTips(errMsg)
    // });
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
			<div id="product_list">
        {
          this.state.list.map((item, index) => {
            return (
              // <Link key={index} to={'/detail/' + item.get('id')}>
                <div className="list-item">
                  <img className="pic" src={item.img} />
                  <div className="list-item-info">
                    <p>{item.name}</p>
                    <p>￥：{item.price}</p>
                  </div>
                  <img id="add" src={add} />
                </div>
              // </Link>
            );
          })
        }
        {/* <Link to="/product/edit">
          <Button type="primary" className="btn">添加商品</Button>
        </Link> */}
			</div>
		);
	}
}