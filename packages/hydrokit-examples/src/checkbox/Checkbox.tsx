import * as React from 'react';

export interface CheckboxState { }
export interface CheckboxProps extends
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> { }

// Uses https://material.io/icons/ checkbox
export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    render() {
        return (
            <div className="hk-checkbox">
                <input type="checkbox" className="hk-checkbox__native-element" {...this.props} />
                <span className="hk-checkbox__box" />
                <span className="hk-checkbox__background" />
                <svg 
                    className="hk-checkbox__checkmark"
                    viewBox="0 0 24 24"
                >
                    <path 
                        className="hk-checkbox__checkmark__path"
                        fill="none"
                        stroke="white"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59" 
                    />
                </svg>
            </div>
        );
    }
}
