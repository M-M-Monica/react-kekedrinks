import MyService from './request.jsx';
const ms = new MyService();

export default class LoginService {
  // 检查登录接口的数据是不是合法
  checkLoginInfo(loginInfo) {
    let tel = loginInfo.tel,
        password = loginInfo.password;
    // 判断用户名为空
    if(tel.length !== 11) {
      return {
        status: false,
        msg: '手机号不合法！'
      }
    }
    // 判断密码为空
    if(typeof password !== 'string' || password.length ===0) {
      return {
        status: false,
        msg: '密码不能为空！'
      }
    }
    return {
      status: true,
      msg: '验证通过'
    }
  }
  login(loginInfo) {
    let token = ms.getStorage('token');
    if (!token) {
      return ms.request({
        method: 'post',
        url: '/token',
        data: loginInfo
      });
    }else {
      return ms.request({
        method: 'post',
        url: '/verify',
        data: {
          token: token
        }
      });
    }
  }
}