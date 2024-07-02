import { MutableRefObject } from 'react'

export const useTurnoverService = () => {
  const getService = useCallback(() => {
    const load = async (
      date: string,
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      loading: MutableRefObject<boolean>,
      silent: boolean = false
    ) => {
      if (loading.current) return
      loading.current = true

      console.log('[turnover] load', date)
      const req = Fetch.get(`turnover/date/${date}`)
        .then(
          (res) => {
            dataSetter(res)
            return '加载成功'
          },
          (err) => {
            if (err.code === 404) {
              return '营业额不存在'
            }
            return Promise.reject('营业额加载失败')
          }
        )
        .finally(() => {
          loading.current = false
        })
      if (!silent)
        toast.promise(req, {
          loading: '加载营业额...',
          success: (data) => data.toString(),
          error: (err) => err.toString()
        })
    }

    const loadToday = async (
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      loading: MutableRefObject<boolean>,
      silent: boolean = false
    ) => {
      const date = dayjs().format('YYYY-MM-DD')
      return load(date, dataSetter, loading, silent)
    }

    const save = async (
      date: string,
      data: TurnoverForm,
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      silent: boolean = false
    ) => {
      console.log('[turnover] save', date, data)
      const req = Fetch.post('turnover', { ...data, date }).then(
        (res) => {
          dataSetter(res)
          return '保存成功'
        },
        (err) => {
          if (err.error === 'Duplicate Error') return Promise.reject('今日营业额已存在')
          return Promise.reject(err.message)
        }
      )
      if (!silent)
        toast.promise(req, {
          loading: '保存中...',
          success: (data) => data.toString(),
          error: (err) => err.toString()
        })
      return req
    }

    const saveToday = async (
      data: TurnoverForm,
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      silent: boolean = false
    ) => {
      const date = dayjs().format('YYYY-MM-DD')
      return save(date, data, dataSetter, silent)
    }

    const update = async (
      date: string,
      data: TurnoverForm,
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      loading: MutableRefObject<boolean>,
      silent: boolean = false
    ) => {
      console.log('[turnover] update', date, data)
      const req = Fetch.put(`turnover/date/${date}`, { ...data }).then(
        () => {
          loadToday(dataSetter, loading, true)
          return '更新成功'
        },
        (err) => Promise.reject(err.message)
      )
      if (!silent)
        toast.promise(req, {
          loading: '更新中...',
          success: (data) => data.toString(),
          error: (err) => err.toString()
        })
      return req
    }

    const updateToday = async (
      data: TurnoverForm,
      dataSetter: React.Dispatch<React.SetStateAction<Turnover | null>>,
      loading: MutableRefObject<boolean>,
      silent: boolean = false
    ) => {
      const date = dayjs().format('YYYY-MM-DD')
      return update(date, data, dataSetter, loading, silent)
    }

    return {
      load,
      loadToday,
      save,
      saveToday,
      update,
      updateToday
    }
  }, [])
  const service = useMemo(getService, [getService])
  return service
}
