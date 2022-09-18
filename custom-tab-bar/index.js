
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import store from "../store/index.js"
Component({
    options: {
        styleIsolation: "shared"
    },
    behaviors: [storeBindingsBehavior],

    storeBindings: {
        store,
        fields: ['active', 'commodityNum', 'token',],
        actions: ['setActive'],
    },

    data: {
        activeList: [
            {
                pagePath: "/pages/home/home",
                text: "首页",
                iconPath: "./images/home_iconPath.png",
                selectedIconPath: "./images/home_selectedIconPath.png"
            },
            {
                pagePath: "/pages/classify/classify",
                text: "分类",
                iconPath: "./images/classify_iconPath.png",
                selectedIconPath: "./images/classify_selectedIconPath.png"
            },
            {
                pagePath: "/pages/shoppingCart/shoppingCart",
                text: "购物车",
                iconPath: "./images/shoppingCart_iconPath.png",
                selectedIconPath: "./images/shoppingCart_selectedIconPath.png",
                info: 0
            },
            {
                pagePath: "/pages/personalCenter/personalCenter",
                text: "我的",
                iconPath: "./images/personalCenter_iconPath.png",
                selectedIconPath: "./images/personalCenter_selectedIconPath.png"
            },
        ]
    },
    methods: {
        onChange(e) {

            if (this.data.token) {
                wx.switchTab({
                    url: e.detail,
                })
                this.setActive(e.detail)
            } else {
                if (e.detail == '/pages/personalCenter/personalCenter') {
                    wx.navigateTo({
                        url: `/login/index?back=${encodeURIComponent(e.detail + '?urlType=tabBar&&error=1')}`,
                    })
                } else {
                    wx.switchTab({
                        url: e.detail,
                    })
                    this.setActive(e.detail)
                }

            }

        }
    },
    observers: {
        'commodityNum': function (n) {
            this.setData({
                'activeList[2].info': n
            })
        }
    }
})
