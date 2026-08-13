import Button from "@/shared/ui/Button";
import {useContext} from "react";
import {NotesContext} from "@/entities/note";

const FilterNotes = (props) => {
  const {
    css,
  } = props

  const {
    notes,
    isShowAllNotes,
    isShowCompletedNotes,
    isShowUnCompletedNotes,
    setIsShowAllNotes,
    setIsShowCompletedNotes,
    setIsShowUnCompletedNotes,
  } = useContext(NotesContext)

  const showAllNotes = () => {
    setIsShowAllNotes(true)
    setIsShowCompletedNotes(false)
    setIsShowUnCompletedNotes(false)
  }

  const showCompletedNotes = () => {
    setIsShowAllNotes(false)
    setIsShowCompletedNotes(true)
    setIsShowUnCompletedNotes(false)
  }

  const showUnCompletedNotes = () => {
    setIsShowAllNotes(false)
    setIsShowCompletedNotes(false)
    setIsShowUnCompletedNotes(true)
  }

  return (
    <div className={css.filter}>
      <Button
        className={`${css.filterButton} ${isShowAllNotes === true ? css.active : ''}`}
        title='Всё заметки'
        onClick={showAllNotes}
      >Все</Button>
      <Button
        className={`${css.filterButton} ${isShowCompletedNotes === true ? css.active : ''}`}
        title='Завершенные заметки'
        onClick={showCompletedNotes}
      >Завершенные</Button>
      <Button
        className={`${css.filterButton} ${isShowUnCompletedNotes === true ? css.active : ''}`}
        title='Незавершенные заметки'
        onClick={showUnCompletedNotes}
      >Незавершенные</Button>
    </div>
  )
}

export default FilterNotes