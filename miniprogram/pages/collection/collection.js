// pages/collection/collection.js
import { formatTime } from '../../utils/index';
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: ["寻物", "寻主"],
        list: [],
        select: 0,
        login: false
    },


  getTab(e) {
    const select = e.detail;
    this.setData({
        select
    })
    this.onLoad();
  },

  toDetail(e) {
     let { item } = e.currentTarget.dataset;
    // 第一种:
    const id = item.id;
    delete item['_id'];
    item._id = id;
     wx.navigateTo({
        url: `../infoDetail/infoDetail?info=${JSON.stringify(item)}&from=collection`,
    })
    
    // 第二种: 
    // wx.navigateTo({
    //   url: `../infoDetail/infoDetail?id=${item._id}`,
    // })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { select } = this.data;
        const openid = wx.getStorageSync('openid');
        const login = wx.getStorageSync('login');
        this.setData({
            login
        })
        db.collection('collection').where({
            type: String(select),
            _openid: openid
        }).get({
            success: (res) => {
                const { data } = res;
                this.setData({
                    list: data.map(item => {
                        return {
                            ...item,
                            time: formatTime(item.time)
                        }
                    })
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                select: 3
            })
        }
        this.onLoad();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})