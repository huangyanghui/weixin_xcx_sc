
import {getOrderApi} from '../../mock/index'
import request from '../../utils/request'
// 获取订单列表
export const getOrderListApi = (data) => {
   return getOrderApi(data)
}


// 规划路线
export const directionDriving = (data) => {
    const {from,to} =data
   return new Promise((res=>{
        wx.request({
          url: `https://apis.map.qq.com/ws/direction/v1/driving/?from=${from}&to=${to}&output=json&callback=cb&key=U3OBZ-7LCKX-SKZ4K-TEL4V-PHWG3-5UF2V`,
          success:(data)=>{
            res(data)
          }
        })
    }))
}
// 获取物流信息
export const wl =(id)=>{
    return new Promise((res)=>{
        res({
            to:'32.058473570874206,118.79453996022971',
            from: '23.08389183484959,111.36001481815083',
            ddh:'220827-1581239402214232',
            shhzd:'江苏省南京市浦口区华润万象公馆B7-1130',
            steps:[
                {
                    text:'您已提交订单，请等待系统确认',
                    desc:'2022-08-14 17:31:16'
                },
                {
                    text:'订单确认，已通商家配货',
                    desc:'2022-08-14 17:31:17'
                },
                {
                    text:'商家已打印拣货单',
                    desc:'2022-08-14 19:00:13'
                },
                {
                    text:'您的订单开始拣货',
                    desc:'2022-08-14 19:00:14'
                },
                {
                    text:'您的订单已验货完成',
                    desc:'2022-08-15 13:17:22'
                },
                {
                    text:'您的订单已打包完成',
                    desc:'2022-08-15 13:17:23'
                },
                {
                    text:'商家已发货，正在通知韵达快递取件',
                    desc:'2022-08-15 19:00:13'
                },
                {
                    text:'【梧州市】梧州市分拨营销市场部巧韵分部-游大个（15812394006）已揽收',
                    desc:'2022-08-15 19:35:27'
                },
                {
                    text:'【梧州市】已到达 广西梧州分拨交付中心（分拨对该快件已全面消毒）',
                    desc:'2022-08-15 21:38:01'
                },
                {
                    text:'【梧州市】已离开 梧州市分拨交付中心；发往 江苏南京浦口江北新区服务部',
                    desc:'2022-08-15 21:40:29'
                },
                {
                    text:'【南京市】已到达 江苏南京分拨交付中心',
                    desc:'2022-08-17 10:00:23'
                },
                {
                    text:'【南京市】江苏南京浦口江北新区服务部[025-66971807]派件员 黄田彪(1582313009) 正在为您派件。疫情期间快递各环节已消毒，快递小哥已接种疫苗，48小时核酸正常，今日测温正常，将佩戴口罩为您派送，（温馨提示您：戴口罩取快递，个人防护要牢记），【9527为韵达业务员外呼专属号码，请放心接听】',
                    desc:'2022-08-17 15:10:32'
                },
                {
                    text:'【代收点】 您的快递已签收，签收人在【南京万象公馆11栋L103店(已签收签收人凭取货码签收)】 领取，投诉电话：025-66970762。',
                    desc:'2022-08-17 20:10:01'
                }
            ]

        })
    })
}
