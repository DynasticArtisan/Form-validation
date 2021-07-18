import logo from './logo.svg';
import './App.css';
import {useInput} from './utils/inputHooks.js'



function App() {
  
  const email = useInput('', { isEmpty:true, isEmail:true })
  const password = useInput('', { isEmpty:true, minLength:3, maxLength:10 })

  return (
    <div className="App">
        <form>
          <h1>Registration</h1>
          <div className="input">
            <input name="email" value={email.value} onChange={email.onChange} onBlur={email.onBlur} type="text" placeholder="Enter your email..."/>
            {email.isDirty&&email.inputError&&<div className="error">{email.inputError}</div>}
            
          </div>
          <div className="input">
            <input name="password" value={password.value} onChange={password.onChange} onBlur={password.onBlur} type="password" placeholder="Enter password..."/>
            {password.isDirty&&password.inputError&&<div className="error">{password.inputError}</div>}
          </div>

          <button type="submit" disabled={!email.inputValid || !password.inputValid} onClick={()=>{alert(`email: ${email.value} \npassword: ${password.value}`)}}>Submit</button>
        </form>
    </div>
  );
}

export default App;
