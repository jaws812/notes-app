import css from './Field.module.scss'

const Field = (props) => {
  const {
    className,
    id,
    type,
    label,
    value,
    onInput,
    ref,
  } = props

  return (
    <div className={`${className} field`}>
      <label
        className={css.label}
        htmlFor={id}
      >{label}
      </label>
      <input
        className={css.input}
        id={id}
        autoComplete="off"
        type={type}
        value={value}
        onInput={onInput}
        ref={ref}
      />
      <span
        className={css.error}
        title="Ошибка!"
        style={{display: 'none'}}
      >Ошибка!</span>
    </div>
  )
}

export default Field

