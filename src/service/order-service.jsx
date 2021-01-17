import MService from './request.jsx';
const ms = new MService();

export default class OrderService {
  // 生成订单
  createOrder(goodsArr, total){
    return ms.request({
      url: '/order/create',
      data: {
        goodsArr,
        total
      }
    })
  }
  // 支付订单
  goToPay(id){
    return ms.request({
      method: 'get',
      url: `/order/pay/${id}`
    })
  }
  // 取消订单
  cancelOrder(id){
    return ms.request({
      method: 'get',
      url: `/order/cancel/${id}`
    })
  }
  // 获取订单详情
  // getOrderDetail(orderId) {
  //   return ms.request({
  //     method: 'post',
  //     url: '/manage/order/detail',
  //     data: {
  //       id: orderId
  //     }
  //   });
  // }
}