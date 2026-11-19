import css from './RadioGroup.module.scss'
import type {ChangeEventHandler} from "react";
import type {RadioOption} from "@/shared/utils/types";

interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  valueActive: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const RadioGroup = (props: RadioGroupProps) => {

  const {
    name,
    legend,
    options,
    valueActive,
    onChange,
  } = props

  return (
    <fieldset className={css.fieldset}>
      <legend className={css.legend}>
        {legend}
      </legend>
      <div className={css.radioGroup}>
        {options.map(({value, text}) => {
          return (
            <div key={value}>
              <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={valueActive === value}
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