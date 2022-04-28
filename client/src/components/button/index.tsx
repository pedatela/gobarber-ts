import React, {ButtonHTMLAttributes} from 'react';

// Styles
import { Container } from './styles';


// Interface
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <Container {...rest}>{children}</Container>
  );
}

export default Button;