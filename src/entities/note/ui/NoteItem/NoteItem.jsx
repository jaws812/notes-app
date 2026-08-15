import {memo, useContext} from 'react'
import {NotesContext} from "@/entities/note";
import RouterLink from "@/shared/ui/RouterLink";
import {highlightCaseInsensitive} from "@/shared/utils/highlight";
import css from './NoteItem.module.scss'

const NoteItem = (props) => {
  const {
    id,
    title,
    content,
    isDone,
  } = props

  const {
    firstIncompleteNoteRef,
    firstIncompleteNoteId,
    deleteNote,
    toggleNoteComplete,
    disappearingNoteId,
    appearingNoteId,
    searchQuery,
  } = useContext(NotesContext)

  const highlightedTitle = highlightCaseInsensitive(title, searchQuery)

  return (
    <li
      className={`${css.noteItem} ${disappearingNoteId === id ? css.isDisappearing : ''} ${appearingNoteId === id ? css.isAppearing : ''}`}
      ref={id === firstIncompleteNoteId ? firstIncompleteNoteRef : null}
    >
      <input
        className={css.checkbox}
        id={id}
        type="checkbox"
        checked={isDone}
        onChange={({target}) => {
          toggleNoteComplete(id, target.checked)
        }}
      />
      <div className={css.body}>
        <label
          htmlFor={id}
          className='visually-hidden'
        >{title}</label>
        <RouterLink
          className={css.title}
          to={`/notes/${id}`}
          aria-label="Детальная страница заметки"
        >
          <span dangerouslySetInnerHTML={{__html: highlightedTitle}} />
        </RouterLink>
        <div className={css.content}>{content}</div>
      </div>
      <div className={css.actions}>
        <RouterLink
          className={css.link}
          to={`/notes/${id}`}
          aria-label='Детальная страница заметки'
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99786 11.9957L9.99644 7.99717L5.99786 3.9986"
              stroke="#6B7583"
              strokeWidth="1.33286"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </RouterLink>
        <button
          className={css.deleteButton}
          type="button"
          aria-label="Delete"
          title="Delete"
          onClick={() => deleteNote(id)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_52)">
              <path
                d="M1.99927 3.9986H13.995"
                stroke="#6B7583"
                strokeWidth="1.33286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.6622 3.9986V13.3286C12.6622 13.995 11.9957 14.6615 11.3293 14.6615H4.66501C3.99858 14.6615 3.33215 13.995 3.33215 13.3286V3.9986"
                stroke="#6B7583"
                strokeWidth="1.33286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33142 3.9986V2.66574C5.33142 1.99931 5.99785 1.33289 6.66428 1.33289H9.33C9.99643 1.33289 10.6629 1.99931 10.6629 2.66574V3.9986"
                stroke="#6B7583"
                strokeWidth="1.33286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66431 7.33075V11.3293"
                stroke="#6B7583"
                strokeWidth="1.33286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33002 7.33075V11.3293"
                stroke="#6B7583"
                strokeWidth="1.33286"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_52">
                <rect
                  width="15.9943"
                  height="15.9943"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </li>
  )
}

export default memo(NoteItem)