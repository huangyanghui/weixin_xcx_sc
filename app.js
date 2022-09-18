// app.js
import { promisifyAll } from "miniprogram-api-promise"
const wxp = wx.p = {}
promisifyAll(wx, wxp)
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import store from './store/index'
App({
    returnStorageCarArr() {
        let a = wx.getStorageSync('carArr')
        if (a.length > 2) return JSON.parse(a);
        return []
    },
    onLaunch() {
        this.storeBindings = createStoreBindings(this, {
            store,
            actions: ['setCarArr']
        })
        this.setCarArr(this.returnStorageCarArr())
    },
    globalData: {
        userInfo: null,
    }
})
