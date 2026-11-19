import css from './Field.module.scss'
import type {InputEventHandler, Ref} from "react";

interface FieldProps {
  className: string;
  id: string;
  type: string;
  label: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  value: string;
  error: string;
  onInput: InputEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  ref?: Ref<HTMLInputElement | HTMLTextAreaElement>;
}

const Field = (props: FieldProps) => {
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
        ref={(element: HTMLInputElement | HTMLTextAreaElement | null) => {
          if (typeof ref === 'function') {
            return ref(element)
          }

          if (ref) {
            ref.current = element
          }
        }}
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