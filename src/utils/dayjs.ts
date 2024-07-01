import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isLeapYear from 'dayjs/plugin/isLeapYear'

dayjs.extend(isLeapYear)
dayjs.extend(customParseFormat)

dayjs.locale('zh-cn')

export default dayjs
