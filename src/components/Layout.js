import React, { Component } from 'react'
import ColorsStore from '../stores/ColorsStore'
import ClipIt from '../clip-it' 
import ServerActions from '../actions/ServerActions'
import Header from './Header'
import ColorButtons from './ColorButtons'
import uuid from 'uuid'
import Navigation from './Navigation'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      colorsArr: ColorsStore.getArrayOfColors()
    }
    this._onChange = this._onChange.bind(this)
    this.copyIt = this.copyIt.bind(this)
  }

  componentWillMount() {
    ColorsStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ColorsStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      colorsArr: ColorsStore.getArrayOfColors()
    })
  }

  copyIt(e){
    
    ClipIt.clipItMultipleElements('.colorBox', null, colorsArr)
    let singleColor = e.target.innerHTML  
    let colorObj = {
      color: singleColor.slice(3, 10),
      id: uuid()
    }
    const { colorsArr } = this.state
    ServerActions.sendSelectedColor(colorObj)
  }





  render() {
    const { colorsArr } = this.state
    let colorElements;
    let colorCounter = 0;

    if(colorsArr) {
      colorElements = colorsArr.map((color, i) => {
        if(!(i % 4)) {
          return (
            <div className="colorRow" key={uuid()}>
              <div id={uuid()} style={ { backgroundColor: `${colorsArr[i]}` } } onClick={this.copyIt} className='colorBox'><p>{colorsArr[i]}</p></div> 
              <div id={uuid()} style={ { backgroundColor: `${colorsArr[i+1]}` } } onClick={this.copyIt} className='colorBox'><p>{colorsArr[i+1]}</p></div> 
              <div id={uuid()} style={ { backgroundColor: `${colorsArr[i+2]}` } } onClick={this.copyIt} className='colorBox'><p>{colorsArr[i+2]}</p></div> 
              <div id={uuid()} style={ { backgroundColor: `${colorsArr[i+3]}` } } onClick={this.copyIt} className='colorBox'><p>{colorsArr[i+3]}</p></div>
            </div> 
          )
        }
      })
    }

    return (
      <div className='mainContainer'>
        <Navigation />
        <Header />
        <ColorButtons />
        <div className='colorBoxContainer'>
          <div id='copyConfirm' className='animateOnCopy'></div>
            {colorElements}
        </div>
      </div>
    )
  }
}
