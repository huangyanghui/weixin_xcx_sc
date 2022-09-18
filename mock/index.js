// 1待付款，2，未发货  3待收货 ， 4退款/退货,5收货
let arr = [
    {
        id: 1,
        goods_name: "AIJIA 车载冰箱 4L迷你车载小冰箱 车家两用冷藏保鲜 加热保温车载冰箱",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 1,
        type: '1.5m床四件套【被套105x200建议拍2套换洗】；休闲罗马',
        goods_big_logo: "http://image5.suning.cn/uimg/b2c/newcatentries/0070118448-000000000165989474_1_800x800.jpg",

    },
    {
        id: 2,
        goods_name: "捷欧得热卖车载冰箱 冷热两用 6升汽车小冰箱 多用途迷你车载便携杜嘉仓库",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 5,
        type: '白色12寸',
        goods_big_logo: "http://image4.suning.cn/uimg/b2c/newcatentries/0070147285-000000000861213975_1_800x800.jpg"
    },
    {
        id: 3,
        goods_name: "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
        goods_price: 1918.00,
        goods_number: 11,
        goods_actual_price: 1916.49,
        state: 4,
        type: '55英寸 4K超高清量子点',
        goods_small_logo: "http://image2.suning.cn/uimg/b2c/newcatentries/0070137950-000000000189309077_2_400x400.jpg"
    },
    {
        id: 4,
        goods_name: "AIJIA 车载冰箱 4L迷你车载小冰箱 车家两用冷藏保鲜 加热保温车载冰箱",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 1,
        type: '冷暖 蓝色',
        goods_big_logo: "http://image5.suning.cn/uimg/b2c/newcatentries/0070118448-000000000165989474_1_800x800.jpg",

    },
    {
        id: 5,
        goods_name: "捷欧得热卖车载冰箱 冷热两用 6升汽车小冰箱 多用途迷你车载便携杜嘉仓库",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 2,
        type: '白色12寸',
        goods_big_logo: "http://image4.suning.cn/uimg/b2c/newcatentries/0070147285-000000000861213975_1_800x800.jpg"
    },
    {
        id: 6,
        goods_name: "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
        goods_price: 1918.00,
        goods_number: 11,
        goods_actual_price: 1916.49,
        state: 3,
        type: '55英寸 4K超高清量子点',
        goods_small_logo: "http://image2.suning.cn/uimg/b2c/newcatentries/0070137950-000000000189309077_2_400x400.jpg"
    },
    {
        id: 7,
        goods_name: "AIJIA 车载冰箱 4L迷你车载小冰箱 车家两用冷藏保鲜 加热保温车载冰箱",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 1,
        type: '冷暖 蓝色',
        goods_big_logo: "http://image5.suning.cn/uimg/b2c/newcatentries/0070118448-000000000165989474_1_800x800.jpg",

    },
    {
        id: 8,
        goods_name: "捷欧得热卖车载冰箱 冷热两用 6升汽车小冰箱 多用途迷你车载便携杜嘉仓库",
        goods_price: 198.00,
        goods_number: 1,
        goods_actual_price: 196.49,
        state: 2,
        type: '白色12寸',
        goods_big_logo: "http://image4.suning.cn/uimg/b2c/newcatentries/0070147285-000000000861213975_1_800x800.jpg"
    },
    {
        id: 9,
        goods_name: "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
        goods_price: 1918.00,
        goods_number: 11,
        goods_actual_price: 1916.49,
        state: 3,
        type: '55英寸 4K超高清量子点',
        goods_small_logo: "http://image2.suning.cn/uimg/b2c/newcatentries/0070137950-000000000189309077_2_400x400.jpg"
    },
]

export const getOrderApi = (ids) => {
    return new Promise(((res) => {
        if (ids == 1) {

            let newarr = arr.filter(i => i.state == 1)
            res(newarr)
        } else if (ids == 2) {
            let newarr = arr.filter(i => i.state == 3 || i.state == 2)
            res(newarr)
        } else if (ids == 3) {
            let newarr = arr.filter(i => i.state == 4)
            res(newarr)
        }
        else {
            res(arr)
        }
    }))
}