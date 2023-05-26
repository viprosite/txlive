export default {
  /**
   * @description 验证传入的str是否符合Email格式
   * @param str
   * @returns 符合Eamil格式返回true
   */
  email: (str: string): boolean => {
    return RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(str);
  },

  /** 根据工信部2019年最新公布的手机号段
   * @description 验证传入的str是否符合手机号码格式
   * @param str
   * @returns 符合返回true
   */
  phone: (str: string): boolean => {
    return RegExp(
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
    ).test(str);
  },

  /**
   * @description  中国移动
   */
  phoneYidong: (str: string): boolean => {
    return RegExp(
      /^1(34[0-8]|3[5-9\d]|440|4[78]\d|5[0-27-9]\d|70[356]|78\d|8[2-478]\d|98\d)\d{7}$/
    ).test(str);
  },

  /**
   * @description  中国联通
   */
  phoneLiantong: (str: string): boolean => {
    return RegExp(
      /^1(3[0-2]\d|4[56]\d|5[56]\d|66\d|70[4789]|71|7[56]\d|8[56]\d)\d{7}$/
    ).test(str);
  },

  /**
   * @description  中国电信
   */
  phoneDianxin: (str: string): boolean => {
    return RegExp(
      /^1(3[3]\d|349|410|49\d|53\d|70[0-2]|7[37]\d|740|8[019]\d|99\d)\d{7}$/
    ).test(str);
  },

  /**
   * @description  中国邮政编码（六位数）
   */
  postalCode: (str: string): boolean => {
    return RegExp(
      /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
    ).test(str);
  },

  /** 18位身份证
   * @description
   */
  idCard1: (str: string): boolean => {
    return RegExp(
      /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
    ).test(str);
  },

  /** 18位的新版身份证
   * @description
   */
  idCard2: (str: string): boolean => {
    return RegExp(
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    ).test(str);
  },

  /**
   * @description 验证是否是qq号 腾讯QQ号从10000开始
   * @param str
   * @returns
   */
  QQ: (str: string): boolean => {
    return RegExp(/[1-9][0-9]{4,}/).test(str);
  },

  /**
   * @description 微信号：6至20位，以字母开头，字母，数字，减号，下划线
   */
  weChat: (str: string): boolean => {
    return RegExp(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/).test(str);
  },

  /**
   * @description 验证是否是邮政编码 中国邮政编码为6位数字
   * @param str
   * @returns
   */
  postCode: (str: string): boolean => {
    return RegExp(/[1-9]\d{5}(?!\d)/).test(str);
  },

  /**
   * @description 银行卡
   */
  bankCard: (str: string): boolean => {
    return RegExp(/^([1-9]{1})(\d{15}|\d{18})$/).test(str);
  },

  /**
   * @description 文件的扩展名
   */
  fileExt: (str: string): boolean => {
    return RegExp(/^.*?\.(html|css|jpg)$/).test(str);
  },

  /**
   * @description 16进制颜色
   */
  hexColor: (str: string): boolean => {
    return RegExp(/#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/).test(str);
  },

  /**
   * @description 10进制值
   */
  decimal: (str: string): boolean => {
    return RegExp(/^d+.d+$/).test(str);
  },

  /**
   * @description JSON
   */
  json: (str: string): boolean => {
    return RegExp(/^\w+\(({[^()]+})\)$/).test(str);
  },

  /**
   * @description 中文名2到10位（字母，数字，下划线，减号）
   */
  chinaName: (str: string): boolean => {
    return RegExp(/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/).test(
      str
    );
  },

  /**
   * @description 4位或6位英文字符验证码
   */
  verificationCode: (str: string): boolean => {
    return RegExp(/^([a-zA-Z0-9]{4}|[a-zA-Z0-9]{6})$/).test(str);
  },

  /**
   * @description  html标签
   */
  htmlTag: (str: string): boolean => {
    return RegExp(/<(.*)>.*<\/\1>|<(.*) \/>/).test(str);
  },

  /**
   * @description  html注释
   */
  htmlNotes: (str: string): boolean => {
    return RegExp(/^!--[\s\S]*?-->$/).test(str);
  },

  //  html片段
  //  htmlFragment : (str: string): boolean => {
  //      return RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\\\\\1>|\\s+\\/>)$/
  //  ).test(str);
  //    },

  /**
   * @description  CSS属性
   */
  css: (str: string): boolean => {
    return RegExp(/^\\s*[a-zA-Z\\-]+\\s*[:]{1}\\s[a-zA-Z0-9\\s.#]+[;]{1}/).test(
      str
    );
  },

  /**
   * @description 普通电话、传真号码：可以"+"开头，除数字外，可含有"-"
   */
  fax: (str: string): boolean => {
    return RegExp(/^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/).test(str);
  },

  /**
   * @description 座机号，固定电话
   */
  telephone: (str: string): boolean => {
    return RegExp(/\d{3}-\d{8}|\d{4}-\d{7}/).test(str);
  },

  /**
   * @description 电话号码，正确格式：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
   */
  tel: (str: string): boolean => {
    return RegExp(/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/).test(str);
  },

  /**
   * @description 用户名正则，4到16位（字母，数字，下划线，减号）
   */
  userName: (str: string): boolean => {
    return RegExp(/^[a-zA-Z0-9_-]{4,16}$/).test(str);
  },

  /**
   * @description 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
   */
  password1: (str: string): boolean => {
    return RegExp(
      /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
    ).test(str);
  },

  /**
   * @description  6-16位字符，区分大小写（不能是9位以下的纯数字，不含空格），必须包含大写字母
   */
  password2: (str: string): boolean => {
    return RegExp(
      /^(?!\d{6,8}$)(?! )(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{6,16}$/
    ).test(str);
  },

  /**
   * @description 6-16个字符，区分大小写（不能是9位以下的纯数字，不含空格）
   */
  password3: (str: string): boolean => {
    return RegExp(
      /^(?!\d{6,8}$)(?! )(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_]{6,16}$/
    ).test(str);
  },

  /**
   * @description 6-20个字符，同时包含大、小写字母及数字，不可包含特殊字符
   */
  password4: (str: string): boolean => {
    return RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/).test(str);
  },

  /**
   * @description 全角标点符(可以有中文)
   */
  mark: (str: string): boolean => {
    return RegExp(/[\uFF00-\uFFFF]/).test(str);
  },

  /**
   * @description 中文、英文、数字包括下划线
   */
  zhEnNumber: (str: string): boolean => {
    return RegExp(/^[\\u4E00-\\u9FA5A-Za-z0-9_]+$/).test(str);
  },

  /**
   * @description 以字母开头，长度在6-18之间，只能包含字符、数字和下划线
   */
  beginLetter: (str: string): boolean => {
    return RegExp(/^[a-zA-Z]\w{5,17}$/).test(str);
  },

  /**
   * @description 是否含有 ^%&',;=?$\" 等字符
   */
  specialChar: (str: string): boolean => {
    return RegExp(/[^%&',;=?$\x22]+/).test(str);
  },

  /**
   * @description base64
   */
  base64: (str: string): boolean => {
    return RegExp(
      /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i
    ).test(str);
  },

  /**
   * @description 64位md5
   */
  md5: (str: string): boolean => {
    return RegExp(/^[a-f0-9]{64}$/).test(str);
  },

  /**
   * @description window下"文件夹"路径
   */
  windowFolder: (str: string): boolean => {
    return RegExp(/^[a-zA-Z]:\\(?:\w+\\?)*$/).test(str);
  },

  /**
   * @description window下"文件"路径
   */
  windowFile: (str: string): boolean => {
    return RegExp(/^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/).test(str);
  },

  /**
   * @description 视频链接地址
   */
  videoUrl: (str: string): boolean => {
    return RegExp(
      /^https?:\/\/.*?(?:swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i
    ).test(str);
  },

  /**
   * @description 图片链接地址
   */
  imgUrl: (str: string): boolean => {
    return RegExp(
      /^https?:\/\/.*?(?:gif|png|jpg|jpeg|webp|svg|psd|bmp|tif)$/i
    ).test(str);
  },

  /**
   * @description  统一社会信用代码
   */
  creditCode: (str: string): boolean => {
    return RegExp(/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/).test(
      str
    );
  },

  /**
   * @description 车牌号(新能源+非新能源)
   */
  licensePlate: (str: string): boolean => {
    return RegExp(
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    ).test(str);
  },

  /**
   * @description 新能源车牌号
   */
  newEnergy: (str: string): boolean => {
    return RegExp(
      /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/
    ).test(str);
  },

  /**
   * @description 非新能源车牌号
   */
  nonNewEnergy: (str: string): boolean => {
    return RegExp(
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    ).test(str);
  },

  /**
   * @description 护照（包含香港、澳门）
   */
  passportId: (str: string): boolean => {
    return RegExp(
      /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
    ).test(str);
  },

  /**
   * @description 检测传入的str字符串中有没有中文字符
   * @param str {string} 要检测的字符串
   * @returns str含有中文字符返回true，否则返回false
   */
  hasZh: (str: string): boolean => {
    return RegExp(/[\u4e00-\u9fa5]+/).test(str);
  },

  /**
   * @description 只允许中文
   * @param str {string}
   * @returns str只有中文返回true
   */
  onlyZh: (str: string): boolean => {
    return RegExp(/^[\u4e00-\u9fa5]+$/).test(str);
  },

  /**
   * @description 只允许中文，英文字母，数字
   * @param str
   * @returns str只有中文或字母或数字或三者组合返回true
   */
  zhEnNum: (str: string): boolean => {
    return RegExp(/^[\u4e00-\u9fa5A-Za-z0-9]+$/).test(str);
  },
};
