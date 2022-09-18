import { goodsQsearchApi } from '../../api/search/searchList'
Page({

    data: {
        suggestion: [],
        history: [],
        historys: [],
      
    },
    // 搜索时调用推荐搜索列表
    async onChange(e) {
        if (!e.detail) return;
        const { data: { message } } = await goodsQsearchApi({ query: e.detail })
        this.setData({
            suggestion: message,
        })
        if (message.length) {
            if (this.data.history.length == 0 || !this.data.history.includes(e.detail)) {
                this.setData({
                    history: [...this.data.history, e.detail],
                    historys: [...this.data.historys, e.detail],
                })
                wx.setStorageSync('history', this.data.history)
            }

        }
    },
    // 清除搜索框触发，清空推荐搜索列表
    onClear() {
        this.setData({
            suggestion: []
        })
    },
    // 删除某个搜索历史
    onClose(e) {
        let arr = [...this.data.history]
        arr.splice(e.currentTarget.dataset.index, 1)
        this.setData({
            history: arr
        })
        wx.setStorageSync('history', this.data.history)
    },
    // 删除所有搜索历史
    delHis() {
        this.setData({
            historys: [],
            history: []
        })
        wx.setStorageSync('history', this.data.history)
    },
    // 点击某个搜索历史跳到商品列表页面
    async clickTag(e) {
        // 阻止冒泡
        if (this.data.history.length != this.data.historys.length) {
            this.setData({
                historys: [...this.data.history]
            })
            return
        } 
        wx.navigateTo({
          url: `/goods/list/index?query=${e.currentTarget.dataset.item}`
        })
    },
    // 点击推荐搜索列表数据
    clickItem(e) {
        wx.navigateTo({
            url: `/goods/detail/index?goods_id=${e.currentTarget.dataset.item.goods_id}`,
            success: () => {
                this.setData({
                    suggestion: []
                })
            }
        })
    },
    // 页面显示时获取缓存中的的搜索历史
    onShow() {
        let arr = wx.getStorageSync('history')
        this.setData({
            history: arr || [],
            historys: arr || [],
        })
    },
})