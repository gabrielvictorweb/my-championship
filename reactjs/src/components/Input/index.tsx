import React, { ReactNode } from 'react';
import { InputStyle, Label, InputContainer } from './styles';
import { InputBaseProps } from '@mui/material/InputBase';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode;
    inputProps?: InputBaseProps['inputProps'];
};

const Input: React.FC<InputProps> = ({ label, inputProps, ...props }) => {
    return (
        <InputContainer>
            {label && (
                <Label htmlFor={props.id}>{label}</Label>
            )}
            {inputProps
                ? <InputStyle autoFocus {...inputProps} {...props} />
                : <InputStyle {...props} />
            }
        </InputContainer>
    );
};

export default Input;
