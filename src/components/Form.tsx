import { FormEvent } from "react"

import styles from './Form.module.css'

import { Input } from "./Input"
import { useForm } from "../hooks/useForm"

export function Form() {
  const user = useForm('user')
  const email = useForm('email')
  const password = useForm('password')
  const confirmPass = useForm('confirmPass', checkEqualPasswords)

  function checkEqualPasswords(confirmPassValue: string) {
    if (confirmPassValue !== password.value) {
      confirmPass.setError("As senhas não se coincidem")
      return false
    } else {
      confirmPass.setError(null)
      return true
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const formShouldBeSend = shouldSendForm()
    if (formShouldBeSend) {
      alert("Formulário enviado")
      cleanFormFields()
    } else {
      console.log("Formulário não enviado")
    }
  }

  function shouldSendForm() {
    const userIsValid = user.validate()
    const emailIsValid = email.validate()
    const passwordIsValid = password.validate()
    const confirmPasswordIsValid = confirmPass.validate()

    return userIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid
  }

  function cleanFormFields() {
    user.setValue("")
    email.setValue("")
    password.setValue("")
    confirmPass.setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input 
        id="user" 
        label="Usuário"
        placeholder="Digite o seu nome de usuário"
        value={user.value}
        error={user.error}
        onChange={user.onChange}
        onBlur={user.onBlur}
      />
      <Input 
        id="email" 
        label="Email"
        placeholder="Digite o seu email"
        type="email"
        value={email.value}
        error={email.error}
        onChange={email.onChange}
        onBlur={email.onBlur}
      />
      <Input 
        id="password" 
        label="Senha"
        placeholder="Digite a sua senha"
        type="password"
        value={password.value}
        error={password.error}
        onChange={password.onChange}
        onBlur={password.onBlur}
      />
      <Input 
        id="confirm-password" 
        label="Confirmar senha"
        placeholder="Digite a sua senha novamente"
        type="password"
        value={confirmPass.value}
        error={confirmPass.error}
        onChange={confirmPass.onChange}
        onBlur={confirmPass.onBlur}
      />
      <button>Enviar</button>
    </form>
  )
}