import request from '../../utils/request'
export const categoriesApi = () => {
    return request(
        {
            url: '/categories',
        }
    )
}
