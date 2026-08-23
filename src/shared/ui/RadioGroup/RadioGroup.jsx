import css from './RadioGroup.module.scss'

const RadioGroup = (props) => {

  const {
    name,
    priorityVariables,
    activePriority,
    setActivePriority,
  } = props

  const onChange = (event) => {
    setActivePriority(event.target.value)
  }

  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>
        Выберите приоритет заметки:
      </legend>
      <div className={css.radioGroup}>
        {priorityVariables.map(({value, text}, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={activePriority === value}
                onChange={onChange}
              />
              <label
                className={css.label}
                htmlFor={value}
              >{text}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export default RadioGroup