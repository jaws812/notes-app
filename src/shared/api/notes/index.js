const URL = 'http://localhost:3001/notes'

const headers = {
  'Content-Type': 'application/json',
}

const notesAPI = {
  getAll: () => {
    return fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось получить весь список заметок, проблемы с сервером")
        }
        return response.json()
      })
  },

  getById: (id) => {
    return fetch(`${URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Заметка не найдена, проблемы с сервером")
        }
        return response.json()
      })
  },

  add: (note) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(note)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Добавить заметку не удалось, проблемы с сервером")
        }
        return response.json()
      })
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, {method: 'DELETE'})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось удалить задачу, проблемы с сервером")
        }
      })
  },

  deleteAll: (notes) => {
    return Promise.all(
      notes.map(({id}) => notesAPI.delete(id))
    )
  },

  toggleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({isDone})
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось переключить состояние заметки, проблемы с сервером")
        }
      })
  },

  edit: (id, editNote) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(editNote)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось изменить заметку, проблемы с сервером")
        }
      })
  },
}

export default notesAPI