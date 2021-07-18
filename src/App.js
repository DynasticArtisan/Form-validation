import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [email, setEmail] = useState('')
  const [emailDirty, setEmailDirty] = useState(false) 
  const [emailError, setEmailError] = useState('Email cannot be empty')

  const [password, setPassword] = useState('')
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [passwordError, setPasswordError] = useState('Password cannot be empty')

  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if(emailError || passwordError){
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /.+@.+\..+/i
    if (!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Uncorrect email adress')
    } else {
      setEmailError('')
    }
  }
  
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 3 || e.target.value.length > 10){
      setPasswordError('Password must contain 3-10 symbols')
    } else {
      setPasswordError('')
    }
  }
  
  
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }


  return (
    <div className="App">
        <form>
          <h1>Registration</h1>
          <div className="input">
            <input name="email" value={email} onChange={(e) => emailHandler(e)} onBlur={(e)=>blurHandler(e)} type="text" placeholder="Enter your email..."/>
            {emailDirty&&emailError&&<div className="error">{emailError}</div>}
          </div>
          <div className="input">
            <input name="password" value={password} onChange={(e) => passwordHandler(e)} onBlur={(e)=>blurHandler(e)} type="password" placeholder="Enter password..."/>
            {passwordDirty&&passwordError&&<div className="error">{passwordError}</div>}
          </div>

          <button disabled={!formValid} type="submit">Submit</button>
        </form>
    </div>
  );
}

export default App;
