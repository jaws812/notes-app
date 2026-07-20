import { memo } from 'react'
import Button from "../../shared/ui/Button/Button";

const NoteInfo = (props) => {
  const {
    total,
    done,
    onDeleteAllButtonClick,
    css,
  } = props

  const hasNotes = total > 0

  return (
    <div className={css.info}>
      <div>Завершено {done} из {total}</div>
      {hasNotes && (
        <Button
          className={css.deleteAllButton}
          title="Удалить все"
          onClick={onDeleteAllButtonClick}
        >Удалить все</Button>
      )}
    </div>
  )
}

export default memo(NoteInfo)