import css from './Field.module.scss'

const Field = (props) => {
  const {
    className,
    id,
    type,
    label,
    rows,
    cols,
    maxLength,
    value,
    error,
    onInput,
    ref,
  } = props

  const Component = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`${className} ${css.field}`}>
      <label
        className={css.label}
        htmlFor={id}
      >{label}
      </label>
      <Component
        className={`
          ${css.input} 
          ${error ? css.isInvalid : ''} 
          ${type === 'textarea' ? css.textarea : ''}
        `}
        id={id}
        autoComplete="off"
        type={type}
        rows={rows}
        cols={cols}
        maxLength={maxLength}
        value={value}
        onInput={onInput}
        ref={ref}
      />
      {error && (
        <span
          className={css.error}
          title={error}
        >{error}</span>
      )}
    </div>
  )
}

export default Field

