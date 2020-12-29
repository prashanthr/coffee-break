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

export const getLocalStorage = (key, defaultValue = null) => {
  const lsItem = window.localStorage.getItem(key)
  if (!lsItem) {
    return defaultValue
  } else {
    const item = JSON.parse(lsItem)
    if (item.expiry && new Date().getTime > item.expiry) {
      setLocalStorage(key, defaultValue)
      return defaultValue
    } else {
      return item.data
    }
  }
}
