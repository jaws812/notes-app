const URL = 'http://localhost:3001/notes'

const headers = {
  'Content-Type': 'application/json',
}

const notesAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json())
  },

  getById: (id) => {
    return fetch(`${URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не найдено!')
        }
        return response.json()
      })
  },

  add: (task) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task)
    })
      .then((response) => response.json())
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, {method: 'DELETE'})
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
  },
}

export default notesAPI