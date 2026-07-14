import './Field.module.scss'

const Field = (props) => {
  const {
    className,
    id,
    type,
    label,
    value = "",
  } = props

  return (
    <div className="note__field field">
      <label
        className={`field ${className}`}
        htmlFor={id}
      >{label}
      </label>
      <input
        className="field__input"
        id={id}
        autoComplete="off"
        type={type}
        value={value}
      />
      <span
        className="field__error"
        title="Ошибка!"
        style={{display: 'none'}}
      >Ошибка!</span>
    </div>
  )
}

export default Field

