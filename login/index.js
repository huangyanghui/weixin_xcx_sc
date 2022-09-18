import { createStoreBindings } from 'mobx-miniprogram-bindings'
import store from '../store/index'
import { wxloginApi } from '../api/login/index'
Page({
    data: {
        url: '',
        parameter: {}
    },

    onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['token', 'userInfo'],
            actions: ['setToken', 'setUserInfo', 'setActive']
        })
        this.getParameter(options)
    },

    async goLogin() {
        try {
            let obj = {}
            const [loginData, userInfo] = await Promise.all([wx.p.login(), wx.p.getUserProfile({ desc: 'desc' }).catch(err => {
                this.goURL('取消授权', 'error')

            })])
            obj = {
                code: loginData.code,
                iv: userInfo.iv,
                signature: userInfo.signature,
                rawData: userInfo.rawData,
                encryptedData: userInfo.encryptedData
            }
            // 没有权限所有写死一个token
            //    const r =  await  wxloginApi(obj)
            this.setUserInfo(userInfo.userInfo)
            wx.setStorageSync('userInfo', userInfo.userInfo)
            this.setToken('111')
            wx.setStorageSync('token', '111')

            this.goURL('登录成功')
        } catch (err) {

        }

    },
    // 解密路径参数并且设置
    getParameter(options) {
        let back = decodeURIComponent(options.back).split('?')
        let parameter = back[1] ? back[1].split('&') : []
        let obj = {}
        for (let i in parameter) {
            obj[parameter[i].split('=')[0]] = parameter[i].split('=')[1]
        }
        this.setData({
            url: back[0],
            parameter: obj
        })

    },
    // 跳转
    goURL(title, type) {
        wx.showToast({
            title: title,
            icon: 'loading'
        })
        setTimeout(() => {
            if (type == 'error') {
                if (this.data.parameter.error == 1) {
                    wx.switchTab({
                        url: '/pages/home/home',
                    })
                    this.setActive('/pages/home/home')
                } else {
                    if (this.data.parameter.urlType == 'tabBar') {
                        this.setActive(this.data.url)
                    }
                    wx.switchTab({
                        url: this.data.url,
                    })
                }
            } else {
                if (this.data.parameter.urlType == 'tabBar') {
                    this.setActive(this.data.url)
                }
                wx.switchTab({
                    url: this.data.url,
                })

            }


        }, 800)

    }
})