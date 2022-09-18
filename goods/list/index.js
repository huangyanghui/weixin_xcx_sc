import { goodsSearchListApi } from '../../api/search/searchList'
Page({

    data: {
        apiData: {
            query: '',
            cid: '',
            pagenum: 1,
            pagesize: 10
        },
        list: [],
        total: 0,
        flag: true,
        more: false,
        noData: false
    },

    onLoad(options) {
        this.setData({
            'apiData.query': decodeURIComponent(options.query) == 'undefined' ? '' : decodeURIComponent(options.query),
            'apiData.cid': options.cat_id || ''
        })
        this.getList()
    },
    // 获取列表数据
    async getList() {
        if (!this.data.flag) return
        wx.showLoading({
            title: '加载中',
        })
        this.setData({
            flag: false
        })
        const res = await goodsSearchListApi(this.data.apiData)
        if (this.data.apiData.pagenum == 1 && res.data.message.total < this.data.apiData.pagesize) {
            this.setData({
                more: true
            })
        }
        this.setData({
            list: [...this.data.list, ...res.data.message.goods],
            total: res.data.message.total,
            'apiData.pagenum': this.data.apiData.pagenum + 1,
            flag: true,
            noData: res.data.message.total ? false : true,

        })
        wx.hideLoading()

        return new Promise((res => {
            res('请求完成')
        }))


    },
    // 判断是否加载完成所有数据
    ifLoginF() {
        let ye = Math.ceil(this.data.total / this.data.apiData.pagesize)
        if (this.data.total && this.data.apiData.pagenum <= ye) {
            return true
        } else {
            return false

        }
    },
    // 点击商品跳转到商品详情页
    clickItem(e){
        wx.navigateTo({
          url: `/goods/detail/index?goods_id=${e.currentTarget.dataset.item.goods_id}`,
        })

    },
    // 彻底加载更多
    onReachBottom() {
        if (this.ifLoginF()) {
            this.getList()
        } else {
            this.setData({
                more: true
            })
        }
    },
    // 下拉刷新
    async onPullDownRefresh() {
        this.setData({
            'apiData.pagenum': 1,
            more: false,
            list: []
        })
        await this.getList()
        wx.stopPullDownRefresh()
    }
})