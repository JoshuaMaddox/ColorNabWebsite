import React, { Component } from 'react'
import ColorsStore from '../stores/ColorsStore'
import uuid from 'uuid'
import ServerActions from '../actions/ServerActions'

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      selectedColors: ColorsStore.getSelectedColors()
    }
    this._onChange = this._onChange.bind(this)
    this.removeColor = this.removeColor.bind(this)
  }

  componentWillMount() {
    ColorsStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ColorsStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      selectedColors: ColorsStore.getSelectedColors()
    })
  }

  removeColor(e) {
    let colorId = e.target.id
    console.log(colorId)
    ServerActions.deleteColorSelection(colorId)
  }

  render() {

    const { selectedColors } = this.state
    let selections;
    let hexValues;

    if(selectedColors) {

      selections = selectedColors.map((color, i) => {
        return (
          <div 
            onClick={this.removeColor} 
            key={color.id} id={color.id} 
            style={ { backgroundColor: `${color.color}` } } 
            className="selectedColor">
          </div>
        )
      })

      hexValues = selectedColors.map((color, i) => {
        return (
        <div className="hexBox" key={color.id}>
          <div 
            id={color.id} 
            style={ { borderBottom: `3px solid ${color.color}` } } 
            className="hexValue">{color.color}
          </div>
        </div>
        )
      })

    } else {
      <p>Click on a color to add it to selections</p>
    }

    return (
      <header className='colorHeader' id='mainHeader'>
        <div className='copyElements'>
          <div className="headerColorsContainer">
            {selections}
          </div>
          <div className='headerHexValues'>
              {hexValues.length ? hexValues : <div></div>}
          </div>
        </div>
      </header>
    )
  }
}
