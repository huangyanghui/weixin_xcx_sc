import { directionDriving, wl } from '../api/orders/index'

import Dialog from '@vant/weapp/dialog/dialog';
Page({
    data: {
        polyline: [],
        longitude: '102.65998355253441',
        latitude: '35.427035974621',
        markers: [],
        wlInfo: {},
        Loading: true,
        ifZK: false

    },

    async onLoad(options) {
        wx.showLoading({
            title: '加载中',
        })
        // 获取订单信息
        const data = await wl(options.id)
        // 获取设置地图信息
        const res = await directionDriving({
            from: data.from,
            to: data.to
        })
        this.setPolyline(res)
        data.steps = data.steps.reverse()
        this.setData({
            markers: [
                {
                    id: '1',
                    latitude: data.from.split(',')[0],
                    longitude: data.from.split(',')[1],
                    iconPath: '/images/6起点.png',
                    width: "50rpx",
                    height: "50rpx"
                },
                {
                    id: '2',
                    latitude: data.to.split(',')[0],
                    longitude: data.to.split(',')[1],
                    iconPath: '/images/9终点.png',
                    width: "50rpx",
                    height: "50rpx"
                }
            ],
            wlInfo: data,
            Loading:false
        })
        wx.hideLoading()
    },
     // 设置polyline
     setPolyline(res) {
        let coors = res.data.result.routes[0].polyline;
        //解压
        for (var i = 2; i < coors.length; i++) {
            coors[i] = coors[i - 2] + coors[i] / 1000000;
        }
        //划线 
        var b = [];
        for (var i = 0; i < coors.length; i = i + 2) {
            b[i / 2] = {
                latitude: coors[i],
                longitude: coors[i + 1]
            };
        }
        this.setData({
            polyline: [{
                points: b,
                color: "#c00000",  //线的颜色
                width: 4,
                dottedLine: false,
            }]
        })
    },
    // 展开
    clickZk() {
        this.setData({
            ifZK: true
        })
    },
    // 复制
    fz() {
        let _this = this
        wx.setClipboardData({
            data: _this.data.wlInfo.ddh,
            success: (res) => {
                wx.hideToast()
                Dialog.alert({
                    title: '复制成功，订单编号：',
                    confirmButtonText:'知道了',
                    message: _this.data.wlInfo.ddh,
                })
            }
        })
    },

   
});