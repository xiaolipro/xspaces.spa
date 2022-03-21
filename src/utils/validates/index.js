/**
 * @author antinew 2357729423@qq.com
 * @description 判断是否是数组
 * @param arg
 * @returns {arg is any[]|boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 * @author antinew 2357729423@qq.com
 * @description 路径是外部资源
 * @date 2022-02-07 16:30:17
 */
export function isExternalUri(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
