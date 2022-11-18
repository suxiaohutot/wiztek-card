// index.js
// 获取应用实例
const app = getApp()


Page({
  data:{
    phoneNum:'',//测试用的号码，并非真实号码
    showCard:null,
    name:'',
    imgUrl:'../../img/card1.png',
    companImgUrl:'../../img/compangQrCode.jpg',
    title:'',
    logoPng: '../../img/logo.png',
    part1Name:"杨涛", // 测试数据  姓名
    paer1Position: '营销中心负责人', //测试数据  职位
    position: '',
    companyName: '山东汇智科技发展有限公司', 
    QrCode: '', //测试数据 二维码 ../../img/SuBigCat.png
    tel: '', // c测试数据 手机号 186 1518 1688
    phoneA: '400 6991 675',
    email: '', // 测试数据 邮箱 yangtao@wiztek.com
    website: 'www.wiztek.cn',
    address: '济南市高新区汉峪金谷A4-3互联网大厦1902',
    // 经纬度
    latitude: 36.66098,
    longitude: 117.148499,
    isShowOld: null,
    isShowNew: null,
    showView: null,
    positionNum: null, // 职称字段 第一行几个字
    positionShowClass:''
  }, 
  onLoad(options){
    console.log(options)
    let that = this
    if(options.name){
      this.setData({
        showCard: options.id,
        imgUrl:`../../img/card${options.id}.png`, // 第一版名片 图片地址
        // title: `${options.name}名片`,
        name: options.name,
        position: options.position,
        // QrCode: `../../img/QrCode${options.id}.jpg`,
        QrCode: `../../img/compangQrCode.jpg`, //第二版名片地址
        phoneNum: options.phone,
        part1Name: options.name,
        email: options.email,
        // 判断是否使用 老版本 还是 新版本
        showView: options.showView == 1 ? true : false,
        showViewTo: options.showView,
        positionNum: options.positionNum,
      })
      wx.setNavigationBarTitle({
        title: `${options.name}名片`,
      })
    }
    // 云字体 黢黑黢黑的一个字体
    wx.loadFontFace(
      {
        family: 'FZSuXSLSJW',
        source: 'url("https://static.heytea.com/taro_trial/v1/font/WenYue-XinQingNianTi-NC-W8_1.otf")',
        success: res => {
          // console.log('font load success', res)
        },
        fail: err => {
          console.log('font load fail', err)
        }
      }
    )
  },
  // 长按 or 单击 号码响应函数
  phoneNumTap:function(){
    var that=this;
    // 提示呼叫号码还是将号码添加到手机通讯录
    wx.showActionSheet({
      itemList: ['呼叫','添加联系人'],
      success:function(res){
        if(res.tapIndex===0){
          // 呼叫号码
          wx.makePhoneCall({
            phoneNumber: that.data.phoneNum,
          })
        }else if(res.tapIndex==1){
          // 添加到手机通讯录
          wx.addPhoneContact({
            firstName: that.data.name,//联系人姓名
            mobilePhoneNumber: that.data.phoneNum,//联系人手机号
            organization: '山东汇智科技发展有限公司',  //公司名字
          })
        }
      }
    })
  },

  // 单击个人手机号码响应函数
  phoneNumTapClick:function(options){
  var that=this;
  // 提示呼叫号码还是将号码添加到手机通讯录
  wx.showActionSheet({
   itemList: ['呼叫','添加联系人'],
   success:function(res){
     console.log(res)
    if(res.tapIndex===0){
      // 呼叫号码
      wx.makePhoneCall({
        phoneNumber: that.data.phoneNum,
      })
    }else if(res.tapIndex==1){
      // 添加到手机通讯录
      wx.addPhoneContact({
        firstName: that.data.name,//联系人姓名
        mobilePhoneNumber: that.data.phoneNum,//联系人手机号
      })
    }
   }
  })
  },
  // 单击公司号码响应函数
  phoneNumTapPhone:function(options){
  var that=this;
  wx.showActionSheet({
   itemList: ['呼叫'],
   success:function(res){
   if(res.tapIndex===0){
    // 呼叫号码
    wx.makePhoneCall({
      phoneNumber: that.data.phoneA,
    })
   }
   }
  })
  },

  onShareAppMessage: function (res) {// 分享
    return { 
      title: this.data.title,
      path: `/pages/index/index?id=${this.data.showCard}&name=${this.data.name}&phone=${this.data.phoneNum}&position=${this.data.position}&email=${this.data.email}&positionNum=${this.data.positionNum}&showView=${this.data.showViewTo}`,
      success: function (res) {
        //console.log('/pages/order/detail/detail?goodsId=' + this.data.goodsInfo.id )
        // 转发成功
        //console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        //console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  // 地图相应函数
  toAddress(){
    let that = this
    // console.log('toAdress')
    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      name: that.data.companyName,
      address: that.data.address,
      scale: 28
    })
  },

 })



