import React, { ChangeEvent, FocusEvent } from "react";

type fieldKeys = keyof typeof fields

const fields = {
  email: {
    regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Email inválido'
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'A senha deve ter no mínimo 8 caracteres e possuir pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial'
  },
}

export function useForm(field: string, validation?: (value: string) => boolean) {
  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState< string | null >(null)

  function validate(value: string) {
    const formField = fields[field as fieldKeys]
    const validate = formField?.regex.test(value)

    if(!field) return true 
    if(value.length === 0) {
      setError("Preencha este campo")
      return false
    } else if (formField && !validate) {
      setError(formField.message)
      return false
    } else if (validation) {
      return validation(value)
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value)
    setValue(target.value)
  }

  function onBlur({ target }: FocusEvent<HTMLInputElement>) {
    validate(target.value)
  }

  return {
    value,
    setValue, 
    error,
    setError,
    onChange,
    onBlur,
    validate: () => validate(value)
  }
}