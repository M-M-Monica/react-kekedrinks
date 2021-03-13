import React, { Component } from 'react';
import ke from '../../static/ke.png'

export default class Home extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<img src={ke} className="site-logo" />
		);
	}
}
