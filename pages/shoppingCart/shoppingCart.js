
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import store from '../../store/index'
import Dialog from '@vant/weapp/dialog/dialog';
Page({
    data: {
        allIf: false,
        receiptTnfo: {}
    },
    onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['carArr', 'ifAll', 'total', 'flagTrueNum', 'token'],
            actions: ['setCarArr', 'setIfAll', 'setToken']
        })

    },
    onReady() {
        let receiptTnfo = wx.getStorageSync('receiptTnfo')
        receiptTnfo = receiptTnfo ? JSON.parse(receiptTnfo) : {}
        this.setData({
            allIf: this.data.ifAll,
            receiptTnfo: receiptTnfo
        })

    },
    onShow() {
        if (this.data.ifAll != 'undefined') {
            this.setData({
                allIf: this.data.ifAll
            })
        }
    },
    // 选择商品
    onChange(e) {
        this.setCarArrF(e.currentTarget.dataset.index, 1, e.detail)
    },

    // 滑动卡片操作
    onClose(event) {
        const { position, instance } = event.detail;
        switch (position) {
            case 'left':
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                    title: '删除',
                    message: '确认删除购物车中的该商品吗',
                }).then(() => {
                    this.setCarArrF(event.currentTarget.dataset.index, 2)
                    instance.close();
                }).catch(() => {
                    instance.close();
                });
                break;
        }
    },

    // 数量改变
    clickCarNum(e) {
        this.setCarArrF(e.currentTarget.dataset.index, 3, e.detail)
    },
    // 操作mobx-carArr 和本地-carArr 1选中，2删除，3改变数量,4是否全选
    setCarArrF(index, type, data) {
        let arr = JSON.parse(JSON.stringify(this.data.carArr))
        switch (type) {
            case 1:
                arr[index].flag = data
                break;
            case 2:
                arr.splice(index, 1)
                break;
            case 3:
                arr[index].carNum = data
                break;
            case 4:
                arr.map(i => i.flag = data)
                break;
        }
        this.setCarArr(arr)
        wx.setStorageSync('carArr', JSON.stringify(arr))
        if (type == 1) {
            setTimeout(() => {
                this.setData({
                    allIf: this.data.ifAll
                })
            }, 0)
        }
    },
    // 是否全部
    onAllChange(e) {
        this.setData({
            allIf: e.detail
        })
        this.setCarArrF(0, 4, e.detail)
    },
    // 添加收货地址
    async clickAddReceiptInfo() {
        const res = await wx.p.chooseAddress()
        if (res.errMsg == 'chooseAddress:ok') {
            this.setData({
                receiptTnfo: {
                    ...res
                }
            })
            wx.setStorageSync('receiptTnfo', JSON.stringify(res))
        }

    },
    // 提交订单
    clickSub() {
        let arr = this.data.carArr.filter(i => i.flag)
        // console.log(arr)
        // console.log(this.data.receiptTnfo)
        if (arr.length == 0) {
            wx.showToast({
                title: '请选择你要购买的商品',
                icon: 'error',
                duration: 500
            })
        } else if (!this.data.receiptTnfo.userName) {
            wx.showToast({
                title: '请添加收货地址',
                icon: 'error',
                duration: 500
            })
        } else if (!this.data.token) {
            let back =encodeURIComponent('/pages/shoppingCart/shoppingCart?urlType=tabBar')
            wx.navigateTo({
              url: `/login/index?back=${back}`,
            })
        } else {
            console.log('结算')
        }
    },


})