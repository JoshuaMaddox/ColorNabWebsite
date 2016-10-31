import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _arrOfColors = ['#0D47A1','#1565C0','#1976D2','#1E88E5', 
'#2196F3','#42A5F5','#64B5F6','#90CAF9']


let _selectedColors = []

class ColorsStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'TYPE_NAME':
          _arrOfColors = action.payload.colors
          this.emit('CHANGE')
          break
        case 'COLOR_RECEIVED':
        if(_selectedColors.length < 8) {
          _selectedColors.push(action.payload.color)
          this.emit('CHANGE')
          break
        }
        case 'COLOR_TO_DELETE':
          _selectedColors = _selectedColors.filter((color) => {
            if(action.payload.colorId === color.id) {
              return
            } else {
              return color
            }
          })
          this.emit('CHANGE')
          break
        case 'CLEAR':
          _selectedColors = action.payload.clear
          this.emit('CHANGE')
          break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getArrayOfColors() {
    return _arrOfColors
  }

  getSelectedColors() {
    return _selectedColors
  }

}

export default new ColorsStore