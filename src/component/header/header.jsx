import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import MyService from '../../service/request.jsx';
import LoginService from '../../service/login-service.jsx';
const ms = new MyService();
const ls = new LoginService();
import './header.scss';
//import './nav.scss';
import logo from '../../static/drink.png';

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
          <Link to="/login" onClick={this.onLogout}>
            我的订单
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login" onClick={this.onLogout}>
            修改个人信息
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
        </div>
        <div className="header-item">
          <ul className="sider-menu" role="menu">
            <NavLink exact className="sider-menu-item" activeClassName="item-selected" to="/drinks">
            <li>Drinks</li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/dessert">
              <li>Dessert</li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/aboutus">
              <li>About us</li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/card">
              <li>Card</li>
            </NavLink>
          </ul>
        </div>
        <div className="header-item">
        {
          this.state.tel
          ?(
            <div>
            <Link to="/cart" onClick={this.onLogout}>
              <img src="/img/cart.png" />
            </Link>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                <img src="/img/my.png" />
                <span>用户:{this.state.tel}</span>
                <DownOutlined />
              </a>
            </Dropdown>
            </div>)
          :(<div><Link to="/signin" className="ant-dropdown-link">Sign in</Link>
            <Link to="/signup" className="ant-dropdown-link">Sign up</Link></div>)
        }
        </div>
      </header>
    );
  }
}