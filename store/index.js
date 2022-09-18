import {
    observable,
    action
} from "mobx-miniprogram";
export default observable({
    // 选中的tabBar路径
    active: '/pages/home/home',
    // token
    token:wx.getStorageSync('token'),
    // 用户信息
    userInfo:wx.getStorageSync('userInfo')||{},
    // 购物车数据
    carArr: [],
    // 购物车数量
    get commodityNum() {
        return this.carArr.reduce((t, i) => {
            return t + i.carNum
        }, 0)
    },
    // 是否全选
    get ifAll() {
        return this.carArr.every(i => i.flag)
    },
    //  总金额
    get total() {
        return this.carArr.reduce((t, i) => {
            if (i.flag) {
                return t + Number(i.goods_price) * Number(i.carNum)
            } else {
                return t
            }

        }, 0)
    },
    // 商品总数
    get flagTrueNum() {
        return this.carArr.reduce((t, i) => {
            if (i.flag) {
                return t + i.carNum

            } else {
                return t
            }
        }, 0)
    },
    setActive: action(function (active) {
        this.active = active
    }),
    setCarArr: action(function (carArr) {
        this.carArr = carArr
    }),
    setIfAll: action(function (ifAll) {
        this.ifAll = ifAll
    }),
    setToken:action(function(token){
        this.token =token
    }),
    setUserInfo:action(function(userInfo){
        this.userInfo=userInfo
    })

})
