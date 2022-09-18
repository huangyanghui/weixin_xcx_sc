import request from '../../utils/request'
// 登录
export const wxloginApi = (data) => {
    return request(
        {
            data,
            url: '/users/wxlogin',
            method:'POST'
        }
    )
}

