import { useEffect, useState } from 'react';

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState('Input cannot be empty')
  const [minLengthError, setMinLenthError] = useState('')
  const [maxLengthError, setMaxLenthError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [inputValid, setInputValid] = useState(false)
  const [inputError, setInputError] = useState('')

  useEffect(()=>{
    for(const validation in validations){
        switch (validation){
          case 'isEmail':
            const re = /.+@.+\..+/i
            !re.test(String(value).toLowerCase()) ? setEmailError('Uncorrect email') : setEmailError('')
            break;
          case 'maxLength':
            value.length > validations[validation] ? setMaxLenthError(`Cannot contain more than ${validations[validation]} symbols`) : setMaxLenthError('')
            break;
          case 'minLength':
            value.length < validations[validation] ? setMinLenthError(`Must contain at least ${validations[validation]} symbols`) : setMinLenthError('')
            break;
          case 'isEmpty':
            value ? setIsEmpty('') : setIsEmpty('Cannot be empty')
            break;
          
        }
    
    }
  }, [value])

  useEffect(()=>{
    if(isEmpty || minLengthError || maxLengthError || emailError){
      setInputValid(false)
      setInputError(isEmpty || minLengthError || maxLengthError || emailError)
    } else {
      setInputValid(true)
      setInputError('')
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError])
  return {
    inputValid, inputError
  }
}


export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setIsDirty] = useState(false)
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = (e) => {
    setIsDirty(true)  
  }

  return {
    value, onChange, onBlur, isDirty, ...valid
  }
}