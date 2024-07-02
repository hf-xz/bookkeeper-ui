import { useTurnoverService } from '@/services/turnover'

import Input from './Input'

const Today = () => {
  /* 数据定义 */
  const [turnover, setTurnover] = useState<Turnover | null>(null)
  const [maoLi, setMaoLi] = useState<number>(0)

  /* 数据交互 */
  const { loadToday, saveToday, updateToday } = useTurnoverService()
  const loadingTody = useRef(false)
  const isUpdate = useRef(false)

  /* 表单渲染 */
  // 字段定义
  const inputList = useMemo(
    () =>
      [
        { key: 1, label: '体彩', field: 'tiCai' },
        { key: 2, label: '外店', field: 'waiDian' },
        { key: 3, label: '福彩', field: 'fuCai' },
        { key: 4, label: '其他', field: 'onePercent' }
      ] as { key: number; label: string; field: TurnoverFormField }[],
    []
  )

  // 表单
  const { register, handleSubmit, setValue } = useForm<TurnoverForm>()

  // 表单提交
  const submit: SubmitHandler<TurnoverForm> = _debounce(([data]) => {
    if (!turnover) {
      if (!isUpdate.current) saveToday(data, setTurnover)
      else updateToday(data, setTurnover, loadingTody)
    } else {
      console.log('[Today] updating...')
      isUpdate.current = true
      setTurnover(null)
    }
  }, 500)

  // 更新表单数据
  useEffect(() => {
    if (turnover) {
      for (const input of inputList) setValue(input.field, turnover[input.field])
      setMaoLi(
        (turnover.tiCai - turnover.waiDian) * 0.07 + turnover.fuCai + turnover.onePercent * 0.01
      )
    }
  }, [inputList, setValue, turnover])

  /* 初始化 */
  useEffect(() => {
    const init = async () => {
      await loadToday(setTurnover, loadingTody)
    }
    init()

    return () => {
      // 重置状态
      setTurnover(null)
      isUpdate.current = false
    }
  }, [loadToday])

  return (
    <>
      <h2>今日营业额</h2>
      <form onSubmit={handleSubmit(submit)} className="mt-4 flex flex-col gap-4">
        {inputList.map((input) => (
          <Input
            key={input.key}
            label={input.label}
            field={input.field}
            register={register}
            value={turnover?.[input.field]}
          />
        ))}
        <div>毛利： {maoLi.toFixed(2)}</div>
        <button type="submit" className="w-20 self-end">
          {turnover ? '修改' : '保存'}
        </button>
      </form>
    </>
  )
}

export default Today
