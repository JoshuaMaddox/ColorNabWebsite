

exports.clipIt = function(textToCopy) {

  let alertUser;
  //Creates a temporary text area that will be used to store
  //the text to be copied to the user's clipboard
  let tempTextArea = document.createElement("textarea");

  //Set's the the value of the temporary text area to whatever
  //text was passed in as clipIt's argument 
  tempTextArea.value = textToCopy

  //Appends the temp text area to the body 
  document.body.appendChild(tempTextArea);

  //Selects the value of the temporary text area
  tempTextArea.select();

  //Checks if the text has been copied while calling document.execCommand('copy')
  //at the same time
  if(document.execCommand('copy')) {
    //Concats the text to be copied to an optional user message
    alertUser = 'Copied to your clipboard: ' + textToCopy
  } else {
    //Sets an optional error message
    alertUser = 'Uh-oh: Text could not be copied'
  }

  //Removes the temporary text area
  document.body.removeChild(tempTextArea);
  
  //Returns the optional user message
  return console.log(alertUser)
}

//Used to handle an array of text elements and verify whether the number
//of text elements are equal to the number of nodes
exports.handleArrOfTextToCopy = function(arrOfTextToCopy, elems, index) {
  //Grabs the length of the arrOfTextToCopy array
  let argsLen = arrOfTextToCopy.length
  //Grabs the length of the domElements array
  let eLen = elems.length
  //If domElements length and arrOfTextToCopy length is unequal then throw errors
  //and let user know the defecit. If equal then return text out of the arrOfTextToCopy array
  //at the passed in index
  if(argsLen < eLen) {
    throw new Error('There are ' + (eLen - argsLen) + ' more elements than items to copy. Add more items to copy or remove elements.')
  } else if (argsLen > eLen) {
    throw new Error('There are ' + (argsLen - eLen) + ' more items to copy than elements. Add more elements or remove items to copy.')
  } else if (argsLen === eLen) {
    return arrOfTextToCopy[index]
  }
}

exports.clipItOneElement = function(setClass, textToCopy) {
  //Sets the element to be used as the element to click
  //in order copy the textToCopy to the user's clipboard 
  let clickableElement = document.querySelector(setClass)
  //Adds an eventListener to the element with the same
  //class as setClass
  clickableElement.addEventListener('click', function(e) {
    //Calls the clipIt function on user click
    exports.clipIt(textToCopy)
  })
}

//Use to add text to multiple DOM nodes
exports.clipItMultipleElements = function(setClass, textToCopy, arrOfTextToCopy) {
  //Grabs all of the DOM elements that have the passed in class applied to them
  let domElements = document.querySelectorAll(setClass)
  //loops over the domElemnts array and adds text from the arrOfTextToCopy array to
  //each domElement. If user did not pass in an array of textToCopy then the 
  //value of textToCopy will be applied to each domElement
  domElements.forEach(function(elem, i) {
    elem.addEventListener('click', function(e) {
      if(arrOfTextToCopy){
        textToCopy = exports.handleArrOfTextToCopy(arrOfTextToCopy, domElements, i)
      }
      exports.clipIt(textToCopy);
    })
  }) 
}








