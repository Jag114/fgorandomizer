import '../styles/Button.css';
import React from 'react';

type Props = {
  text: string
  url?: string
}

const Button = ({ text, url }: Props) => {

  return (
    <button onClick={() => window.open(url)}>
      {text}
    </button>
  );

}

export default Button; 