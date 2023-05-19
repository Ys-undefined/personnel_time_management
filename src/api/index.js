// 导出所有函数的请求函数
import Axios from 'axios'
import '../api/base'

const api={
 
  /*登录接口
  @paras
  username
  password
  请求方式 Post
  */
  toLogin(param){
    return Axios.post(base.host+base.login,param)

  },  
    /*登录接口
  @paras
  username
  password
  请求方式 Post
  */
  toUserInfo(param){

  }
}