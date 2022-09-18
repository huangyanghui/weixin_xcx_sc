import { getOrderListApi } from '../api/orders/index'
Page({


    data: {
        tabList: [
            {
                text: '全部订单',
                id: '0'
            },
            {
                text: '待付款',
                id: '1'
            },
            {
                text: '待收货',
                id: '2'
            },
            {
                text: '退款/退货',
                id: '3'
            }],
        ids: '',
        list: []
    },

    onLoad(options) {
        this.setData({
            ids: options.id
        })
        this.getList(options.id)
    },
    // 获取列表
    async getList(id) {
        const res = await getOrderListApi(id)
        this.setData({
            list:res
        })
    },
    // tab切换
    tabClick(e) {
        this.getList(e.detail)
    },
    // 查看物流
    logistics(e){
        wx.navigateTo({
          url: `/logistics/index?id=${e.currentTarget.dataset.item.id}`,
        })
    }

})