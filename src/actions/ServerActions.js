import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  sendSelectedColor(color){
    AppDispatcher.dispatch({
      type: 'COLOR_RECEIVED',
      payload: { color }
    }) 
  },

  deleteColorSelection(colorId) {
    AppDispatcher.dispatch({
      type: 'COLOR_TO_DELETE',
      payload: { colorId }
    })
  },

  sendClear(clear) {
    AppDispatcher.dispatch({
      type: 'CLEAR',
      payload: { clear }
    })
  }
}

export default ServerActions