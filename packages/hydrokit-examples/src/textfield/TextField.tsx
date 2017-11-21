import * as React from 'react';

export interface TextFieldState { }
export interface TextFieldProps extends
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
    render() {
        return (
            <div className="hk-textfield-container">
                <input className="hk-textfield" {...this.props} />
            </div>
        );
    }
}
