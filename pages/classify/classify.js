import { categoriesApi } from '../../api/pages/classify'
Page({
    data: {
        categoriesList: [],
        SecondaryHeadings: {},
        active: 0,
        isDivider: false,
        scrollTop: 0
    },
    // 获取所有数据
    async getCategoriesList() {
        const res = await categoriesApi()
        this.setData({
            categoriesList: res.data.message,
            SecondaryHeadings: res.data.message[this.data.active],
            isDivider: true
        })

    },
    // 点击右边内容跳转到商品列表页
    clickChildrenItem(e) {
        wx.navigateTo({
            url: `/goods/list/index?cat_id=${e.currentTarget.dataset.item.cat_id}`,
        })
    },
    // 一级分类变更右边内容
    onChange(e) {
        this.setData({
            active: e.detail,
            SecondaryHeadings: this.data.categoriesList[e.detail],
            scrollTop: 0
        })
    },
    
    async onLoad(options) {
        wx.showLoading({
            title: '加载中',
        })
        await Promise.all([this.getCategoriesList()])
        wx.hideLoading()
    },
})