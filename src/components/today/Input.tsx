type Register = ReturnType<typeof useForm<TurnoverForm>>['register']

interface InputProps {
  label: string
  field: TurnoverFormField
  register: Register
  value?: number
}

const Input = ({ label, field, register, value }: InputProps) => {
  return (
    <div className="w-[270px]">
      <span>{label}：</span>
      <input
        disabled={!value}
        className="ml-2"
        type="number"
        {...register(field, { required: true })}
      />
    </div>
  )
}

export default Input
