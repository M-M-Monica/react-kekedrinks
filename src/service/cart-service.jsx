import MyService from './request.jsx';
const ms = new MyService();

export default class CartService {
  // 获取购物车商品列表
  getCartList() {
    return ms.request({
      method: 'get',
      url: `/cart/list`
    });
  }
  // 添加商品到购物车
  addGood(id) {
    return ms.request({
      url: `/cart/add/${id}`
    });
  }
  // 增加商品
  increase(id){
    ms.request({
      url: `/cart/increase/${id}`
    });
  }
  // 减少商品
  decrease(e) {
    let id = e.currentTarget.dataset.id
    let count = e.currentTarget.dataset.count
    if(count>1){
      ms.request({
        url: `/cart/decrease/${id}`
      })
    }
  }
  // 选择取消选择
  checkboxChange(id) {
    return ms.request({
      url: `/cart/select/${id}`
    });
  }
  // 删除商品
  deleteGood(id) {
    return ms.request({
      url: `/cart/delete/${id}`
    });
  }
}