const BASEURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
export default (options) => {
    let { url, data, method, header } = options
    return new Promise((res, reg) => {
        wx.request({
            data,
            url: BASEURL + url,
            method: method || 'GET',
            header: header || {
                'content-type': 'application/json'
            },
            success(data) {
                res(data)
            },
            fail(err) {
                console.log(err, 'err')
                reg(err)
            },
            complete(res) {
                //    
            },
        })

    })
}