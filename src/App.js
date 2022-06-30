import React, { useState } from 'react';
import './App.css';
import {
  numbers, upperCaseLetters, lowerCaseLetters, specialCharacters,
} from './AllCharacters.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SuccessMessage} from "./clipBoardMessage.jsx"

function App() {

  const [password, setPassword] = useState('');
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [passwordLength, setPasswordLength] = useState('15');
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);


  function handleGenerateButton() {
    // console.log("hi")

    let characterList = ""

    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }

    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    // console.log(characterList)

    if (includeLowerCase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUpperCase) {
      characterList = characterList + upperCaseLetters
    }

    setPassword(createRandomPassword(characterList))

    if(!includeSymbols && 
       !includeLowerCase && 
       !includeUpperCase && !includeNumbers){
    notification("select atleast any one option !!!",true)
     }

  
  }

  function createRandomPassword(characterList) {
    const characterListLength = characterList.length;
    let randomPassword = ''

    // console.log(randomNumber)

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.round(Math.random() * characterListLength)
      randomPassword = randomPassword + characterList.charAt(randomNumber)

      // console.log(characterList,characterListLength,randomNumber,      
      //  randomPassword )
    }

    return randomPassword;


  }

  function handleCopyBtn() {
    copyToClipBoard()
    if(password == ""){
      notification("Nothing to Copy",true)
    }else{
      notification(SuccessMessage)
    }

    // setPassword('')
    
  }

  function copyToClipBoard() {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = password;
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
  }

  function notification(message,hasError){

   if (hasError) {
     // console.log(hasError)
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }else{
        toast(SuccessMessage, {
   position: "top-left",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   });
    }
    
  
  }


  return (
    <main>
      <div className="container">

        <section className="password-generator-box">

          <div>
            <h3 className="password-generator__heading">Password Generator</h3>
            </div>

          <div className="password-display-box">
            <h2 className="display-box-text">{password}</h2>
            <button onClick={handleCopyBtn} className='copy__btn'>
              <i className='far fa-clipboard'></i>
            </button>
          </div>


          <div className='display-criteria'>
            <label htmlFor='include-symbols'>Symbols</label>
            <input

              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols' />
          </div>

          <div className='display-criteria'>
            <label htmlFor='include-numbers'>Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers' />
          </div>

          <div className="display-criteria">
            <label htmlFor="password-length">Password Length</label>
            <input
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number" min="10" max="15" name="password-length"
              id="password-length" />
          </div>

          <div className='display-criteria'>
            <label htmlFor='lowercase-letters'>Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              name="lowercase-letters"
              id="lowercase-letters" />
          </div>

          <div className='display-criteria'>
            <label htmlFor='uppercase-letters'>Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id='uppercase-letters'
              name='uppercase-letters' />
          </div>

          <button onClick={handleGenerateButton} className="generate-button">Generate Password!</button>


        </section>

        <ToastContainer
        position="top-left"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
        closeOnClick
         rtl={false}
        pauseOnFocusLoss
         draggable
         pauseOnHover
        />

      </div>
    </main>
  );
}

export default App;