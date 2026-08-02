import Field from "@/shared/ui/Field";
import {useContext} from "react";
import {NotesContext} from "@/entities/note";

const SearchNoteFrom = (props) => {
  const {
    css,
  } = props

  const {
    searchQuery,
    setSearchQuery,
  } = useContext(NotesContext)

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