import * as React from 'react';

export interface TextFieldState { }
export interface TextFieldProps extends
    React.HTMLProps<HTMLInputElement> { }

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
    render() {
        return (
            <div className="hk-textfield">
                <input className="hk-textfield__native-control" {...this.props} />
            </div>
        );
    }
}
