import React, { Component } from 'react';
import Header from '../header/header.jsx';
import './layout.scss';

export default class Layout extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section className="layout">
        <div className="site-layout">
          <Header />
          <main className="site-layout-content">
            {this.props.children}
          </main>
        </div>
      </section>
    );
  }
}