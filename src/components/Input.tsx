import { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error: string | null
}

export function Input({ id, label, error, ...props }: InputProps) {
  return (
    <div className={styles.formField}>
      <label htmlFor={id}>{label}</label>
      <input 
        type="text"
        id={id}
        name={id}
        className={ error ? styles.error : '' }
        {...props}
      />
      { error && <small>{error}</small> }
    </div>
  )
}