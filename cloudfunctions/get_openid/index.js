// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'cloud1-9gij6v4x5d436728' }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()// 一定需要，用来判断_openid
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}