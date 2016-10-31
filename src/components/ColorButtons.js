import React, { Component } from 'react'
import ColorsStore from '../stores/ColorsStore'

export default class ColorButtons extends Component {
  constructor() {
    super();

    this._onChange = this._onChange.bind(this)
    this.selectColor = this.selectColor.bind(this)
  }

  componentWillMount() {
    ColorsStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ColorsStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      selectedColor: ColorsStore.getSelectedColors()
    })
  }

  selectColor(e) {
    let colorSelectionArray = document.getElementsByClassName('innerCircle')
    Array.prototype.forEach.call(colorSelectionArray, (color) => {
      color.style.backgroundColor = '#1e1e1e'
    })
    let selectedColor = document.getElementById(e.target.id)
    selectedColor.childNodes[0].style.backgroundColor = e.target.id
  }



  render() {


    return (
      <div className='colorBtnsContainer'>
        <div className='colorBtn cyan' id='#00FFFF' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
        <div className='colorBtn magenta' id='#FF00FF' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
        <div className='colorBtn yellow' id='#ffff00' onClick={this.selectColor}>
          <div className='innerCircle' id="">
            
          </div>
        </div>
        <div className='colorBtn red' id='#FF0000' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
        <div className='colorBtn orange' id='#ffa500' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
        <div className='colorBtn purple' id='#800080' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
        <div className='colorBtn blue' id='#0000ff' onClick={this.selectColor}>
          <div className='innerCircle'>
            
          </div>
        </div>
      </div>
    )
  }
}
