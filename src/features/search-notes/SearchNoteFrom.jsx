import Field from "@/shared/ui/Field";
import {useContext} from "react";
import {NotesActionsContext, NotesDataContext} from "@/entities/note";

const SearchNoteFrom = (props) => {
  const {
    css,
  } = props

  const {
    setSearchQuery,
  } = useContext(NotesActionsContext)

  const {
    searchQuery,
  } = useContext(NotesDataContext)

  return (
    <form
      className={css.form}
      onSubmit={(event) => event.preventDefault()}
    >
      <Field
        className={css.field}
        id="search-note"
        type="text"
        label="Поиск по заметкам"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  )
}

export default SearchNoteFrom