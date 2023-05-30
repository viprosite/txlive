import md5 from "js-md5";

export default class TXLive {
  constructor() {
    this.TXLivePusherClass = null  // 引入js后挂载在全局对象上的属性
    this.livePusher = null; // TXLivePusherClass的实例

  }

  /**
   * @description 动态创建引入腾讯云直播SDK脚本
   */
  _initSdkScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://video.sdk.qcloudecdn.com/web/TXLivePusher-2.0.6.min.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        this.TXLivePusherClass = TXLivePusher;   // TXLivePusher为引入js后挂载在全局对象上的属性
        this.livePusher = new TXLivePusher();
        resolve(true);
      };
      script.onerror = (e) => reject(e);
    });
  }
  /**
   * 动态创建播放器SDK所需script和style 暂不考虑失败情况
   */
  _initPlayerSdkScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.v4.8.0.min.js";
      document.body.appendChild(script);
      script.onload = () => {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute(
          "href",
          "https://web.sdk.qcloud.com/player/tcplayer/release/v4.8.0/tcplayer.min.css"
        );
        document.getElementsByTagName("head")[0].appendChild(link);
        link.onload = () => {
          resolve(true);
        };
      };
    });
  }


  /**
   * @description 检测设备支持情况
   * @param TXLivePusher 静态方法，传入 TXLivePusher 类
   * @returns  {
   *   "isWebRTCSupported": "支持 WebRTC",
   *   "isH264EncodeSupported": "支持 H264 编码",
   *   "isH264DecodeSupported": "支持 H264 解码",
   *   "isMediaDevicesSupported": "支持获取媒体设备及媒体流",
   *   "isScreenCaptureSupported": "支持屏幕采集",
   *   "isMediaFileSupported": "支持获取本地媒体文件流",
   * };
   */
  checkDeviceSupport() {
    if (this.TXLivePusherClass) {
      return this.TXLivePusherClass.checkSupport();
    } else {
      return "TXLivePusher 未初始化完成";
    }
  }

  /**
   * @description 创建推流和拉流地址  用于前端自测，实际地址由后端生成
   * @params params:{
   *   pushHost, 推流域名
    *  pullHost, 拉流域名
    *  appName, app名字
    *  streamName, stream名字
    *  expireDate, 过期时间 string|number
    *  pushKey, 推流鉴权key
    *  pullKey, 拉流key
   * }
   * @returns {pushUrl:string, pullUrl:string[]}
   */
  createPushPullUrl(params) {
    let {
      pushHost,
      pullHost,
      appName,
      streamName,
      expireDate,
      pushKey,
      pullKey,
    } = params;
    let pushUrl = "";
    const pullUrls = [];
    expireDate =
      typeof expireDate === "string"
        ? new Date(expireDate).getTime()
        : expireDate;
    expireDate = Math.round(expireDate / 1000);
    const hexExpireTime = expireDate.toString(16);
    console.log(hexExpireTime);
    // 如果推流域名配置需要鉴权
    const pushUrlPre = `webrtc://${pushHost}/${appName}/${streamName}`;
    if (pushKey) {
      const txSecret = md5(pushKey + streamName + hexExpireTime);
      pushUrl = `${pushUrlPre}?txSecret=${txSecret}&txTime=${hexExpireTime}`;
    } else {
      pushUrl = `${pushUrlPre}`;
    }

    // 如果拉流域名配置需要鉴权
    const pullUrlPre = `://${pullHost}/${appName}/${streamName}`;
    if (pullKey) {
      const txSecret = md5(pullKey + streamName + hexExpireTime);
      pullUrls.push(
        `webrtc${pullUrlPre}?txSecret=${txSecret}&txTime=${hexExpireTime}`,
        `rtmp${pullUrlPre}?txSecret=${txSecret}&txTime=${hexExpireTime}`,
        `http${pullUrlPre}.flv?txSecret=${txSecret}&txTime=${hexExpireTime}`,
        `http${pullUrlPre}.m3u8?txSecret=${txSecret}&txTime=${hexExpireTime}`
      );
    } else {
      pullUrls.push(
        `webrtc${pullUrlPre}`,
        `rtmp${pullUrlPre}`,
        `http${pullUrlPre}.flv`,
        `http${pullUrlPre}.m3u8`
      );
    }
    return { pushUrl, pullUrls };
  }







}
