import MService from './request.jsx';
const ms = new MService();

export default class ProductService {
  // 获取商品列表
  getProductList(listParam) {
    let { category, pageNum, pageSize } = listParam
    console.log(category, pageNum)
    return ms.request({
      method: 'get',
      url: `/product/list${category}/pageNum=${pageNum}&pageSize=${pageSize}`
    });
  }
  // 添加商品到购物车
  addGood(id) {
    return ms.request({
      url: `/cart/add/${id}`
    });
  }
}