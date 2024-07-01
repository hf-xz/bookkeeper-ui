import { SubmitHandler, useForm } from 'react-hook-form'

type Form = {
  tiCai: number
  waiDian: number
  fuCai: number
  onePercent: number
}

const Today = () => {
  const { register, handleSubmit } = useForm<Form>()
  const [saveError, setSaveError] = useState('')

  const save: SubmitHandler<Form> = (data) => {
    const date = dayjs().format('YYYY-MM-DD')

    const req = Fetch.post('turnover', { ...data, date }).then(
      (res) => {
        console.log(res.data)
        // Handle res
      },
      (err) => {
        if (err.error === 'Duplicate Error') {
          setSaveError('今日营业额已存在')
        }
        return Promise.reject()
      }
    )

    toast.promise(req, {
      loading: '保存中...',
      success: <b>保存成功</b>,
      error: <b>{saveError}</b>
    })
  }

  return (
    <>
      <h2>今日营业额</h2>
      <form onSubmit={handleSubmit(save)} className="mt-4 flex flex-col gap-4">
        <div className="w-[270px]">
          <span>体彩：</span>
          <input className="ml-2" type="number" {...register('tiCai', { required: true })} />
        </div>
        <div className="w-[270px]">
          <span>外店：</span>
          <input className="ml-2" type="number" {...register('waiDian', { required: true })} />
        </div>
        <div className="w-[270px]">
          <span>福彩：</span>
          <input className="ml-2" type="number" {...register('fuCai', { required: true })} />
        </div>
        <div className="w-[270px]">
          <span>其他：</span>
          <input className="ml-2" type="number" {...register('onePercent', { required: true })} />
        </div>
        <button type="submit" className="w-20 self-end">
          保存
        </button>
      </form>
    </>
  )
}

export default Today
