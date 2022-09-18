import request from '../../utils/request'
export const swiperdataApi = () => {
    return request(
        {
            url: '/home/swiperdata',
        }
    )
}
export const catitemsApi = () => {
    return request(
        {
            url: '/home/catitems',
        }
    )
}
export const floordataApi = () => {
    return request(
        {
            url: '/home/floordata',
        }
    )
}