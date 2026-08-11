// функция будет экранировать потенциально опасные символы, чтобы текст не превращаллся в html
// в качестве параметра приходит небезопасная строка
const escapeHTML = (unsafeString) => {
  return unsafeString
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#39;')
}

// функция будет экранировать спецсимволы, чтобы при их вводе в поисковую строку
// функция подсветки не путала символы с паттерном регулярки
const escapeRegExp = (unsafeString) => {
  return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
// text - оригинальный текст, query - то, что ввели в строку поиска
export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHTML(text)
  const queryFormatted = query.trim()

  if (queryFormatted.length === 0) {
    return safeText
  }

  // поиск вхождений в обоих регистрах
  const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig')

  return safeText.replace(pattern,`<mark>$&</mark>`
  )
}

// const escapeHTML = (unsafeString) => {
//   return unsafeString
//     .replaceAll(/&/g, '&amp;')
//     .replaceAll(/</g, '&lt;')
//     .replaceAll(/>/g, '&gt;')
//     .replaceAll(/"/g, '&quot;')
//     .replaceAll(/'/g, '&#39;')
// }
//
// const escapeRegExp = (unsafeString) => {
//   return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// }
//
// export const highlightCaseInsensitive = (text, query) => {
//   const safeText = escapeHTML(text)
//   const queryFormatted = query.trim()
//
//   if (queryFormatted.length === 0) {
//     return safeText
//   }
//
//   const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig')
//
//   return safeText.replace(pattern, `<mark>$&</mark>`)
// }