import MService from './request.jsx';
const ms = new MService();

export default class UserService {
  changeUserInfo(userInfo){
    return ms.request({
      url: '/user/update',
      data: {
        userInfo
      }
    })
  }
  // 获取我的订单
  showMyOrder(){
    return ms.request({
      method: 'get',
      url: '/order/list'
    })
  }
  goToPay(id){
    return ms.request({
      method: 'get',
      url: `/order/pay/${id}`
    })
  }
}