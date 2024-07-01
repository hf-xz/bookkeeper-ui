import { SubmitHandler, useForm } from 'react-hook-form'

type Form = {
  tiCai: number
  waiDian: number
  fuCai: number
  onePercent: number
}

const Today = () => {
  const { register, handleSubmit } = useForm<Form>()

  const onSubmit: SubmitHandler<Form> = (data) => {
    const date = dayjs().format('YYYY-MM-DD')
    Fetch.post('turnover', { ...data, date }).then((res) => {
      console.log(res.data)
      // Handle res
    })
  }

  return (
    <>
      <h2>今日营业额</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register('tiCai', { required: true })} />
        <input type="number" {...register('waiDian', { required: true })} />
        <input type="number" {...register('fuCai', { required: true })} />
        <input type="number" {...register('onePercent', { required: true })} />
        <button type="submit">提交</button>
      </form>
    </>
  )
}

export default Today
