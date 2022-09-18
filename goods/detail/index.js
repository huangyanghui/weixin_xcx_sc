import { goodsDetailApi } from '../../api/search/searchList'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import store from '../../store/index'
Page({
    data: {
        detail: {}
    },
    onLoad(options) {
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['commodityNum', 'carArr'],
            actions: ['setCarArr','setActive']
        })
        this.getDetail(options.goods_id)

    },
    // 获取商品详情
    async getDetail(goods_id) {
        wx.showLoading({
            title: '加载中',
        })
        const res = await goodsDetailApi({ goods_id: goods_id })
        res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img/g, '<img style="display:block;"')

        this.setData({
            detail: res.data.message
        })
        wx.hideLoading()
    },
    //    点击轮播图预览
    clickImge(e) {
        let arr = this.data.detail.pics.map(i => {
            return i.pics_big
        })
        wx.previewImage({
            urls: arr,
            current: arr[e.currentTarget.dataset.index]
        })
    },
    // 点击加入购物车
    addCar() {
        let arr = JSON.parse(JSON.stringify(this.data.carArr))
        let index = arr.findIndex(i => i.goods_id == this.data.detail.goods_id)
        if (index == -1) {
            arr.push({
                goods_price:this.data.detail.goods_price,
                goods_name:this.data.detail.goods_name,
                goods_big_logo:this.data.detail.goods_big_logo,
                goods_id:this.data.detail.goods_id,
                carNum: 1,
                flag:false
            })
        } else {
            arr[index].carNum += 1
        }
        this.setCarArr(arr)
        wx.setStorageSync('carArr', JSON.stringify(arr))

    },
    // 去购物车页面
    goCart(){
        wx.switchTab({
          url: '/pages/shoppingCart/shoppingCart',
        })
        this.setActive( '/pages/shoppingCart/shoppingCart')
    },

    onUnload() {
        // 清理
        this.storeBindings.destroyStoreBindings();
    }


})