import {useContext} from "react";
import {NotesContext} from "@/entities/note";
import Button from "@/shared/ui/Button";

const FilterNotes = (props) => {
  const {
    css,
  } = props

  const {
    filter,
    setFilter
  } = useContext(NotesContext)

  const showAllNotes = () => {
    setFilter('all')
  }

  const showCompletedNotes = () => {
    setFilter('completed')
  }

  const showUnCompletedNotes = () => {
    setFilter('active')
  }

  return (
    <div className={css.filter}>
      <Button
        className={`${css.filterButton} ${filter === 'all' ? css.active : ''}`}
        title='Все заметки'
        onClick={showAllNotes}
      >Все</Button>
      <Button
        className={`${css.filterButton} ${filter === 'completed' ? css.active : ''}`}
        title='Завершенные заметки'
        onClick={showCompletedNotes}
      >Выполненные</Button>
      <Button
        className={`${css.filterButton} ${filter === 'active' ? css.active : ''}`}
        title='Незавершенные заметки'
        onClick={showUnCompletedNotes}
      >Активные</Button>
    </div>
  )
}

export default FilterNotes