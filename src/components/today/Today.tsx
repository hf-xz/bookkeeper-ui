import Input from './Input'

const Today = () => {
  /* 数据定义 */
  const [turnover, setTurnover] = useState<Turnover | null>(null)

  /* 数据交互 */
  // 加载
  const loadingTody = useRef(false)
  const loadToday = async () => {
    if (loadingTody.current) return
    loadingTody.current = true

    const date = dayjs().format('YYYY-MM-DD')
    const req = Fetch.get(`turnover/date/${date}`).then(
      (res) => {
        setTurnover(res)
      },
      () => {
        return Promise.reject()
      }
    )
    toast.promise(req, {
      loading: '加载今日营业额...',
      success: '加载成功',
      error: '今日营业额加载失败'
    })
    await req
    loadingTody.current = false
  }

  // 保存
  const save = (data: TurnoverForm) => {
    const date = dayjs().format('YYYY-MM-DD')
    const req = Fetch.post('turnover', { ...data, date }).then(
      (res) => {
        console.log(res.data)
        // TODO Handle res
      },
      (err) => {
        if (err.error === 'Duplicate Error') return Promise.reject('今日营业额已存在')
        return Promise.reject(err.message)
      }
    )
    toast.promise(req, {
      loading: '保存中...',
      success: '保存成功',
      error: (err) => err.toString()
    })
  }

  /* 表单渲染 */
  // 字段定义
  const inputList = [
    { key: 1, label: '体彩', field: 'tiCai' },
    { key: 2, label: '外店', field: 'waiDian' },
    { key: 3, label: '福彩', field: 'fuCai' },
    { key: 4, label: '其他', field: 'onePercent' }
  ] as { key: number; label: string; field: keyof TurnoverForm }[]
  // 表单
  const { register, handleSubmit } = useForm<TurnoverForm>()
  const submit: SubmitHandler<TurnoverForm> = (data) => {
    save(data)
  }

  /* 初始化 */
  useEffect(() => {
    const init = async () => {
      // 加载数据
      await loadToday()
    }
    init()
  }, [])

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
        <button type="submit" className="w-20 self-end">
          保存
        </button>
      </form>
    </>
  )
}

export default Today
