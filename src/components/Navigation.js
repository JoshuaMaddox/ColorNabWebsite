import React, { Component } from 'react'
import ColorsStore from '../stores/ColorsStore'
import ClipIt from '../clip-it' 
import ServerActions from '../actions/ServerActions'

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      selectedColors: ColorsStore.getSelectedColors()
    }
    this._onChange = this._onChange.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.copyAll = this.copyAll.bind(this)
  }

   componentWillMount() {
    ColorsStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ColorsStore.stopListening(this._onChange)
  }

  componentDidMount() {
    var selectionsToCopy = 'http://colorNab.com'
    ClipIt.clipItOneElement('.copyAllBtn') 
  }

  _onChange() {
    this.setState({
      selectedColors: ColorsStore.getSelectedColors()
    })
  }

  clearSelection() {
    let clear = []
    ServerActions.sendClear(clear)
  }

  copyAll() {
    const { selectedColors } = this.state
    let selectionsToCopy =''
    if(selectedColors) {
      selectedColors.forEach((color) => {
        selectionsToCopy += `${color.color}\n`
      })
    }
    console.log('selectionsToCopy: ', selectionsToCopy)
    ClipIt.clipItOneElement('.copyAllBtn', selectionsToCopy)
  }

  render() {

    // const { selectedColors } = this.state
    // if(selectedColors) {
    //   selectedColors.forEach((color) => {
    //     selectionsToCopy += `${color.color}\n`
    //   })
    // }
    
    return (
    <div className='navigationContainer'>
      <h3 className="brand">Color Nab</h3>
      <div className='buttons'>
        <button className='navBtn' id='copyColors' onClick={this.clearSelection}>Clear Selections</button>
        <button className='navBtn copyAllBtn' onClick={this.copyAll}>Copy All Selections</button>
      </div>
    </div>
    )
  }
}
