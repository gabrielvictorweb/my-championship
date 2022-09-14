import React from 'react';
import { ButtonStyled } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    color?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ children, color = 'primary', icon, ...props }) => {
    return (
        <ButtonStyled color={color} {...props}>
            {children}
        </ButtonStyled>
    );
};

export default Button;
