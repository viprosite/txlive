/* eslint-disable no-control-regex */
export default {
  // 全角:每个全角字符占用两字节空间
  fullAngle: (str: string): boolean => {
    return RegExp(/[^\uFF00-\uFFFF]/g).test(str);
  },

  fullAngle_1: (str: string): boolean => {
    return RegExp(/[^\x00-\xff]/g).test(str);
  },

  // 半角:每个半角字符占用一字节空间(一字节有8位)，共256个编码空间
  halfAngle: (str: string): boolean => {
    return RegExp(/[\x00-\xff]/g).test(str);
  },

  // 空白行
  blank: (str: string): boolean => {
    return RegExp(/\n\s*\r/).test(str);
  },

  // 首尾空白字符
  blankSpace: (str: string): boolean => {
    return RegExp(/^\s*|\s*$/).test(str);
  },

  // 带有~的字符
  wave: (str: string): boolean => {
    return RegExp(/[^~\x22]+/i).test(str);
  },

  // xml文件
  xml: (str: string): boolean => {
    return RegExp(/^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/).test(str);
  },

  // 由26个英文字母组成的字符串
  english: (str: string): boolean => {
    return RegExp(/^[A-Za-z]+$/).test(str);
  },

  // 由数字和26个英文字母组成的字符串
  englishNumber: (str: string): boolean => {
    return RegExp(/^[A-Za-z0-9]+$/).test(str);
  },

  // 由数字、26个英文字母或者下划线组成的字符串
  englishNumberSymbol: (str: string): boolean => {
    return RegExp(/^\w+$/).test(str);
  },

  // URL
  url: (str: string): boolean => {
    return RegExp(
      /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)??&?[a-zA-Z0-9_-](\?)?)*)*$/i
    ).test(str);
  },

  // URI
  uri: (str: string): boolean => {
    return RegExp(/[a-zA-z]+:\/\/[^\s]*/).test(str);
  },

  // 匹配双字节字符(包括汉字在内, 一个双字节字符长度计2，ASCII字符计1)
  doubleCharacter: (str: string): boolean => {
    return RegExp(/[^\x00-\xff]/).test(str);
  },

  // ASCII
  ascii: (str: string): boolean => {
    return RegExp(/\x20-\x7f/).test(str);
  },

  // GBK下的中文
  gbkChina: (str: string): boolean => {
    return RegExp(/\xa1-\xff/).test(str);
  },

  // 中文
  china: (str: string): boolean => {
    return RegExp(/[\u4E00-\u9FA5]/).test(str);
  },

  // Unicode编码中的汉字范围
  chinaChar: (str: string): boolean => {
    return RegExp(/^[\u2E80-\u9FFF]+$/).test(str);
  },

  // 韩文
  korean: (str: string): boolean => {
    return RegExp(/^\x3130-\x318F$/).test(str);
  },

  // 日文
  japanese: (str: string): boolean => {
    return RegExp(/^\u0800-\u4e00$/).test(str);
  },
};
