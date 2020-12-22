export const setLocalStorage = (key, value, expiry = undefined) => (
  window
    .localStorage
    .setItem(
      key, 
      JSON.stringify({
        data: value,
        expiry
      })
    )
)

export const getLocalStorage = (key) => {
  const lsItem = window.localStorage.getItem(key)
  if (!lsItem) {
    return null
  } else {
    const item = JSON.parse(lsItem)
    if (item.expiry && new Date().getTime > item.expiry) {
      setLocalStorage(key, null)
      return null
    } else {
      return item.data
    }
  }
}
