import * as React from 'react';

export interface TextFieldState { }
export interface TextFieldProps extends
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    inputRef?: (ref: HTMLInputElement | null) => void;
//    ref?: (ref: TextField | null) => any;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
  render() {
    const { inputRef, ...props } = this.props;
    return (
      <div className="hk-textfield">
        <input className="hk-textfield__native-control" {...props} ref={inputRef} />
      </div>
    );
  }
}
