/* eslint-disable no-useless-escape */

/**
 *  给正则传参方法：
 *  let n = 3
 *  new RegExp(`^\\d{${n}}$`)  \需要转义！！！ （在控制台写构造正则可实时查看最终的正则）
 **/

export default {
  /**
   * @description 纯数字 可正负 带小数
   * */
  number: (str: string): boolean => {
    return RegExp(/^-?\d*\.?\d+$/).test(str);
  },

  /**
   * @description n位的正整数
   * @param str 检测的字符串
   * @param n 要求的位数
   * @returns boolean
   */
  nPositiveInt: (str: string, n: number): boolean => {
    return new RegExp(`^\\d{${n}}$`).test(str);
  },

  /**
   * @description 至少n位正整数
   * @param str 检测的字符串
   * @param n 要求的位数
   * @returns boolean
   */
  nMorePositiveInt: (str: string, n: number): boolean => {
    return new RegExp(`^\\d{${n},}$`).test(str);
  },

  /**
   * @description  m-n位正整数
   * @param str 检测的字符串
   * @param m 要求的最小位数
   * @param n 要求的最大位数
   * @returns boolean
   */
  mnPositiveInt: (str: string, m: number, n: number): boolean => {
    return new RegExp(`^\\d{${m},${n}}$`).test(str);
  },

  /**
   * @description 整数
   */
  integer: (str: string): boolean => {
    return RegExp(/^-?\d+$/).test(str);
  },

  /**
   * @description 正整数
   */
  positiveInteger: (str: string): boolean => {
    return RegExp(/^\d+$/).test(str);
  },

  /**
   * @description 非正整数（负整数 + 0）
   */
  nonPositiveInteger: (str: string): boolean => {
    return RegExp(/^-[1-9]\d*|0$/).test(str);
  },

  /**
   * @description 负整数
   */
  negtiveInteger: (str: string): boolean => {
    return RegExp(/^-\d+$/).test(str);
  },

  /**
   * @description 正数
   */
  positive: (str: string): boolean => {
    return RegExp(/^\d*\.?\d+$/).test(str);
  },

  /**
   * @description 正数、负数、和小数
   */
  positiveNegative: (str: string): boolean => {
    return RegExp(/^(\-|\+)?\d+(\.\d+)?$/).test(str);
  },

  /**
   * @description 负数
   */
  negative: (str: string): boolean => {
    return RegExp(/^-\d*\.?\d+$/).test(str);
  },

  /**
   * @description 非负整数（正整数 + 0）
   */
  nonNegtiveInteger: (str: string): boolean => {
    return RegExp(/^[1-9]\d*|0$/).test(str);
  },

  /**
   * @description 非零的负整数
   */
  nonZeroNegativeInteger: (str: string): boolean => {
    return RegExp(/^\-[1-9][0-9]*$/).test(str);
  },

  /**
   * @description 非零的正整数
   */
  nonZeroPositiveInteger: (str: string): boolean => {
    return RegExp(/^\+?[1-9][0-9]*$/).test(str);
  },

  /**
   * @description 浮点数
   */
  floatPoint: (str: string): boolean => {
    return RegExp(/^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/).test(str);
  },

  /**
   * @description 正浮点数
   */
  positiveFloatingPoint: (str: string): boolean => {
    return RegExp(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/).test(str);
  },

  /**
   * @description  非正浮点数（负浮点数 + 0）
   */
  nonPositiveFloatingPoint: (str: string): boolean => {
    return RegExp(/^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$/).test(str);
  },

  /**
   * @description 负浮点数
   */
  negativeFloatingPointNumber: (str: string): boolean => {
    return RegExp(/^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/).test(str);
  },

  /**
   * @description 非负浮点数（正浮点数 + 0）
   */
  nonNegativeFloatingPointNumber: (str: string): boolean => {
    return RegExp(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/).test(str);
  },

  /**
   * @description 非零开头的最多带两位小数的数字
   */
  birth: (str: string): boolean => {
    return RegExp(/^([1-9][0-9]*)+(.[0-9]{1,2})?$/).test(str);
  },

  /**
   * @description 有1-4位小数的正实数
   */
  positiveRealNumber: (str: string): boolean => {
    return RegExp(/^[0-9]+(.[0-9]{1,4})?$/).test(str);
  },
};
