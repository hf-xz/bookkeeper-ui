/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 防抖，函数连续触发，只执行一次
 * @param func 执行函数
 * @param wait 延迟（ms）
 * @param immediate 立即执行？
 * @returns 防抖函数
 */
export function _debounce(func: (...args: any[]) => any, wait: number, immediate: boolean = false) {
  let timeout: number | undefined
  return function (...args: any[]) {
    clearTimeout(timeout)
    if (immediate && !timeout) func(args)
    timeout = setTimeout(() => {
      timeout = undefined
      if (!immediate) func(args)
    }, wait)
  }
}

/**
 * 节流，函数连续触发，每隔一段时间执行一次
 * @param func 执行函数
 * @param timeFrame 时间片（ms）
 * @returns 节流函数
 */
export function _throttle(func: (...args: any[]) => any, timeFrame: number) {
  let lastTime = 0
  return function (...args: any[]) {
    const now = new Date().getTime()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}
