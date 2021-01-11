import MService from './request.jsx';
const ms = new MService();

export default class UserService {
  getUserList(pageNum) {
    return ms.request({
      method: 'get',
      url: '/user/info',
      data: {
        pageNum
      }
    });
  }
  // 获取我的订单
  showMyOrder(){
    return ms.request({
      methods: 'get',
      url: '/order/list'
    })
  }
  goToPay(id){
    return ms.request({
      url: `/order/pay/${id}`
    })
  }
}