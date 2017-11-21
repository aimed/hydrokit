import * as React from 'react';

import { classnames } from '../utils/classnames';

export interface FormFieldState { 
    focussed: boolean;
}
export interface FormFieldProps {
    label?: string;
    hint?: string;
    error?: string;
}

export class FormField extends React.Component<FormFieldProps, FormFieldState> {
    state: FormFieldState = {
        focussed: false
    };

    container: HTMLDivElement | null = null;
    
    get focusWithin(): boolean {
        return !!(this.container && this.container.contains(document.activeElement));
    }

    focusChange = (e: React.FocusEvent<HTMLDivElement>) => {
        this.setState({ focussed: this.focusWithin });
    }

    render() {
        const {
            label,
            error,
            hint,
            children
        } = this.props;

        const formFieldClassName = classnames(
            'hk-formfield',
            this.state.focussed && 'hk-formfield--focussed',
            error && 'hk-formfield--error'
        );

        return (
            <div 
                className={formFieldClassName} 
                onFocus={this.focusChange} 
                ref={r => this.container = r} 
                onBlur={this.focusChange}
            >
                <div className="hk-formfield__meta">
                    {<div className="hk-formfield__label">{label}</div>}
                    {<div className="hk-formfield__hint">{hint}</div>}
                </div>
                <div className="hk-formfield__field">
                    {children}
                </div>
                {<div className="hk-formfield__error">{error}</div>}
            </div>
        );
    }
}
