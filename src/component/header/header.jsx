import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import MyService from '../../service/request.jsx';
import LoginService from '../../service/login-service.jsx';
const ms = new MyService();
const ls = new LoginService();
import './header.scss';
import logo from '../../static/drink.png';
import cart from '../../static/cart.png';
import my from '../../static/my.png';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      tel: ms.getStorage('userTel')
    }
  }
  onLogout(){
    ls.logout().then(res => {
      ms.removeStorage('userTel');
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  render(){
  	const menu=(
      <Menu>
        <Menu.Item>
          <Link to="/order">
            我的订单
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/address">
            修改地址
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login" onClick={this.onLogout}>
            退出登录
          </Link>
        </Menu.Item>
      </Menu>
    );
    return(
      <header className="site-layout-header">
        <div className="header-item">
            <img src={logo} className="logo"></img>
            <span>KEKE Drinks</span>
          {/*<Link to="/home">
          </Link>*/}
        </div>
        <div className="header-item">
          <ul className="sider-menu" role="menu">
            <NavLink exact activeClassName="item-selected" to="/drinks">
            <li>Drinks</li>
            </NavLink>
            <NavLink activeClassName="item-selected" to="/dessert">
              <li>Dessert</li>
            </NavLink>
            <NavLink activeClassName="item-selected" to="/aboutus">
              <li>About us</li>
            </NavLink>
            <NavLink activeClassName="item-selected" to="/card">
              <li>Card</li>
            </NavLink>
          </ul>
        </div>
        <div className="header-item">
        {/*
          this.state.tel
          ?(
            <div>
              <Link to="/cart" onClick={this.onLogout}>
                <img src={cart} className="img-cart"/>
              </Link>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  <img src={my} />
                  <CaretDownOutlined />
                </a>
              </Dropdown>
            </div>
            )
          :(
            <div>
              <Link to="/signin" className="ant-dropdown-link">
                <Button type="primary">Sign in</Button>
              </Link>
              <Link to="/signup" className="ant-dropdown-link">
                <Button type="primary">Sign up</Button>
              </Link>
            </div>
            )
        */}
            <div>
              <Link to="/cart" onClick={this.onLogout}>
                <img src={cart} className="img-cart"/>
              </Link>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  <img src={my} />
                  <CaretDownOutlined />
                </a>
              </Dropdown>
            </div>
        </div>
      </header>
    );
  }
}