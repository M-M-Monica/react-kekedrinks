import MService from './request.jsx';
const ms = new MService();

export default class ProductService {
  // 获取商品列表
  getProductList(listParam) {
    let { category, pageNum } = listParam
    return ms.request({
      method: 'get',
      url: `/product/list/${category}/${pageNum}`
    });
  }
  // 获取商品详情
  // getProductDetail(productId) {
  //   return ms.request({
  //     method: 'post',
  //     url: '/manage/product/detail',
  //     data: {
  //       id : productId
  //     }
  //   });
  // }
}