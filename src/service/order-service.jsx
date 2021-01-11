import MService from './request.jsx';
const ms = new MService();

export default class OrderService {
  // 生成订单
  createOrder(){
    let cart = this.data.cart
    let total = this.data.total
    let cartList = []
    cart.forEach((item)=>{
      if(item.CartList.status === 1){
        cartList.push(item)
      }
    })
    wx.navigateTo({
      url: `/pages/pay/pay?cart=${JSON.stringify(cartList)}&total=${total}`
    })
    return ms.request({
      url: '/order/create',
      data: {
        goodsArr,
        total
      },
    })
  }
  // 支付订单
  goToPay(){
    return ms.request({
      url: `/order/pay/${this.data.order.id}`
    })
  }
  // 取消订单
  cancelOrder(){
    return ms.request({
      url: `/order/cancel/${this.data.order.id}`
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