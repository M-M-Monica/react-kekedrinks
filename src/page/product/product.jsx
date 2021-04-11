import React, { Component } from 'react';
import { message, Pagination } from 'antd';
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
const ms = new MyService();
const ps = new ProductService();
import './product.scss';
import add from '../../static/add.png'

class Product extends Component {
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
            <div className="list-item" key={item.id}>
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

//import { connect } from 'react-redux';
//import store from '../../store';
//onClick={this.props.test}
//const mapDispatchToProps = (dispatch)=>{
//  return {
//    test(e){
//      const action = {
//        type: 'add_goods'
//      }
//      dispatch(action)
//    }
//  }
//}
//connect(null, mapDispatchToProps)(Product)

export default Product