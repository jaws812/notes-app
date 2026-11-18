import {useNotesActions, useNotesData} from "@/entities/note";
import Button from "@/shared/ui/Button";

interface FilterNotesProps {
  css: Record<string, string>;
}

const FilterNotes = (props: FilterNotesProps) => {
  const {
    css,
  } = props

  const {
    setFilter,
  } = useNotesActions()

  const {
    filter,
  } = useNotesData()

  return (
    <div className={css.filter}>
      <Button
        className={`${css.filterButton} ${filter === 'all' ? css.active : ''}`}
        title="Все заметки"
        onClick={() => setFilter('all')}
      >Все</Button>
      <Button
        className={`${css.filterButton} ${filter === 'completed' ? css.active : ''}`}
        title="Завершенные заметки"
        onClick={() => setFilter('completed')}
      >Выполненные</Button>
      <Button
        className={`${css.filterButton} ${filter === 'active' ? css.active : ''}`}
        title="Незавершенные заметки"
        onClick={() => setFilter('active')}
      >Активные</Button>
    </div>
  )
}

export default FilterNotes