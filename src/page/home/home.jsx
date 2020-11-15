import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Statistic, Card, Row, Col, Typography } from 'antd';
import './home.scss';
import ke from '../../static/ke.png'

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      customer: '',
      product: '',
      order: '',
    }
	}
	componentDidMount() {
    //this.loadCount();
  }
	render() {
		return (
			<img src={ke} className="site-logo" />
		);
	}
}
