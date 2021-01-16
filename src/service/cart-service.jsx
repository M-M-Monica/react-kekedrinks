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
  // 增加商品
  increase(id){
    return ms.request({
      method: 'get',
      url: `/cart/increase/${id}`
    });
  }
  // 减少商品
  decrease(id) {
    return ms.request({
      method: 'get',
      url: `/cart/decrease/${id}`
    })
  }
  // 选择取消选择
  checkboxChange(id) {
    return ms.request({
      method: 'get',
      url: `/cart/select/${id}`
    });
  }
  // 删除商品
  deleteGood(id) {
    return ms.request({
      method: 'get',
      url: `/cart/delete/${id}`
    });
  }
}