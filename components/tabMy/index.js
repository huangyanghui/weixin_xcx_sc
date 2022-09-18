
Component({
   
    properties: {
        tabList:Array,
        ids:String
    },

   
    data: {
       
    },

   
    methods: {
        clickItem(e){
            this.setData({
                ids:e.currentTarget.dataset.index
            })
            this.triggerEvent('tabClick',e.currentTarget.dataset.index)
        }
    }
})
