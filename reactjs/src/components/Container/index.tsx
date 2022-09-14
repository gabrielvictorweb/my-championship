import React from 'react';
import { Content, Clear } from './styles';

interface PropsContainer {
    tag?: keyof JSX.IntrinsicElements
    className?: string,
    role?: string,
    children?: React.ReactNode,
}

const Container: React.FC<PropsContainer> = ({
    tag = 'div',
    className = null,
    ...props
}) => {
    const Tag = tag;

    return (
        <Tag role={props.role} className={`container${className ? ` ${className}` : ''}`}>
            <Content>
                {props.children}
                <Clear/>
            </Content>
        </Tag>
    );
};

export default Container;
