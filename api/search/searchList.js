import request from '../../utils/request'
// 推荐搜索
export const goodsQsearchApi = (data) => {
    return request(
        {
            data,
            url: '/goods/qsearch',
        }
    )
}
// 商品列表搜索
export const goodsSearchListApi = (data) => {
    return request(
        {
            data,
            url: '/goods/search',
        }
    )
}
// 搜索商品详情
export const goodsDetailApi = (data) => {
    return request(
        {
            data,
            url: '/goods/detail',
        }
    )
}
