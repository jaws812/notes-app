import type {Note} from '../model/types'

type NotesAction =
  { type: 'SET_ALL', notes: Note[] } |
  { type: 'ADD', note: Note } |
  { type: 'TOGGLE_COMPLETE', id: string, isDone: boolean } |
  { type: 'DELETE', id: string } |
  { type: 'DELETE_ALL' }


// в state будет храниться наше состояние - массив заметок
/* в action будет приходить объект у которого гарантированно будет свойство
type и опционально дополнительные данные*/
/*
* в значении свойства type будет строка в скримминг-снейк-кейс нотации, данная
* строка будет описывать выполняемое действие над данными
* */
export const notesReducer = (state: Note[], action: NotesAction): Note[] => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.notes) ? action.notes : state
    }
    case 'ADD': {
      return [...state, action.note]
    }
    case 'TOGGLE_COMPLETE': {
      const {id, isDone} = action

      return state.map((note) => {
        return note.id === id ? {...note, isDone} : note
      })
    }
    case 'DELETE': {
      return state.filter((note) => note.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}