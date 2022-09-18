// pages/home/home.js

import { swiperdataApi,catitemsApi,floordataApi } from '../../api/pages/home'
Page({

    data: {
        swiperList: [],
        catitemsList:[],
        floordataList:[]
    },

    getSwiperList() {
        return swiperdataApi().then(res => {
            this.setData({
                swiperList:res.data.message
            })
           
        })
    },
    getCatitemsList() {
        return catitemsApi().then(res => {
            this.setData({
                catitemsList:res.data.message
            })
        })
    },
    getFloordataList() {
        return floordataApi().then(res => {
            this.setData({
                floordataList:res.data.message
            })
        })
    },
    clickFloor(e){
        let query = e.target.dataset.item.navigator_url.split('?')[1]
        wx.navigateTo({
          url: '/goods/list/index?'+query,
        })
    },
    async onLoad(options) {
        wx.showLoading({
          title: '加载中',
        })
        await  Promise.all([this.getSwiperList(),this.getCatitemsList(),this.getFloordataList()])
        wx.hideLoading()
    },

    onReady() {

    },

    onShow() {

    },


    onHide() {

    },

    onUnload() {

    }
})