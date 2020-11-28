import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Statistic, Card, Row, Col, Typography } from 'antd';
import './cart.scss';
import trash from '../../static/trash.png'

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [
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
    }
	}
	componentDidMount() {
    //this.loadCount();
  }
  loadCount(){
    this.state.list = [
      {
        id: 1,
        img: 'img/d1.png',
        name: '青苹果乐园',
        num: 1,
        price: 12
      },
      {
        id: 2,
        img: 'img/d2.png',
        name: '青苹果乐园',
        num: 13,
        price: 12
      },
      {
        id: 1,
        img: 'img/d3.png',
        name: '青苹果乐园',
        num: 11,
        price: 12
      },
      {
        id: 2,
        img: 'img/d4.png',
        name: '青苹果乐园',
        num: 1,
        price: 12
    }]
  }
	render() {
		return (
      <div id="cart_list">
        {
          this.state.list.map((item, index) => {
            return (
              // <Link key={index} to={'/detail/' + item.get('id')}>
                <div className="list-item">
                  <img className="pic" src={item.img} />
                  <div className="list-item-info">
                    <span>{item.name}</span>
                    <span>数量：{item.num}</span>
                    <span>单价：{item.price}</span>
                    <span>￥：{item.price}</span>
                  </div>
                  <img id="delete" src={trash} />
                </div>
              // </Link>
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
