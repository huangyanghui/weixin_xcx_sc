import { createStoreBindings } from 'mobx-miniprogram-bindings'
import store from '../../store/index'
Page({
    data: {
        ordersList:[
            {
                text:'全部订单',
                ic:'/images/dd.png',
                id:'0'
            },
            {
                text:'待付款',
                ic:'/images/dfk.png',
                id:'1'
            },
            {
                text:'待收货',
                ic:'/images/dsh.png',
                id:'2'
            },
            {
                text:'退款/退货',
                ic:'/images/tk.png',
                id:'3'
            },
           
        ]
    },
    onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['token', 'userInfo'],
            actions: ['setToken', 'setUserInfo', 'setActive']
        })
    },
    // 退出登录
    quit() {
        wx.showToast({
            title: '退出登录',
            icon: 'loading',
            duration: 500
        })
        setTimeout(() => {
            this.setUserInfo({})
            this.setToken('')
            this.setActive('/pages/home/home')
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            wx.switchTab({
                url: '/pages/home/home',
            })
        }, 500)
    },
    //    收货地址
    clickAddReceiptInfo() {
        wx.p.chooseAddress()

    },
    // 点击订单
    clickOrders(e){
        wx.navigateTo({
          url: `/orders/index?id=${e.currentTarget.dataset.item.id}`,
        })
    },
    // 去百度
    gobaidu(){
        wx.navigateTo({
          url: '/pages/webV/webV',
        })
    }


})