const reducer = (state = '', action) => {
  console.log('state now notification: ', state)
  console.log('action notification: ', action)
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data.notificationText
    default:
      return state
  }
}

export const displayNotification = (notificationText) => async dispatch => {
  setTimeout(() => {
    return dispatch({
      type: 'NOTIFICATION',
      data: {
        notificationText: ''
      }
    })
  }, 5000)
  return dispatch({
    type: 'NOTIFICATION',
    data: {
      notificationText: notificationText
    }
  })
}

export default reducer