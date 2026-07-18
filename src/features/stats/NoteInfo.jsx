import Button from "../../shared/ui/Button/Button";

const NoteInfo = (props) => {
  const {
    total,
    done,
    onDeleteAllButtonClick,
  } = props

  const hasNotes = total > 0

  return (
    <div className="note__info">
      <div>Завершено {done} из {total}</div>
      {hasNotes && (
        <Button
          className="note__delete-all-button"
          title="Удалить все"
          onDeleteAllButtonClick={onDeleteAllButtonClick}
        />
      )}
    </div>
  )
}

export default NoteInfo