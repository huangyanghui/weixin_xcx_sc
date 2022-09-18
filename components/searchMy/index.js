let dsq = 1
Component({
    properties: {
        isSearch: {
            type: Boolean,
            value: true
        },
       
    },
    data: {
        value:null
    },

    methods: {
        onClick() {
            if (this.properties.isSearch) {
                wx.navigateTo({
                    url: `/search/searchList/index`,
                })
            }
        },
     
        onChange(e) {
            clearTimeout(dsq)
            dsq = setTimeout(() => {
                this.triggerEvent('onChange', e.detail)
            }, 500)
        },
        onClear(){
            this.triggerEvent('onClear')
        }
    },
    pageLifetimes:{
        hide:function(){
            this.setData({
                value:null
            })
        }
    }

})
