import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface FormFieldState { 
    focussed: boolean;
}
export interface FormFieldProps {
    label?: string;
    hint?: string;
    error?: string;
    htmlFor?: string;
}

export class FormField extends React.Component<FormFieldProps, FormFieldState> {
    state: FormFieldState = {
        focussed: false
    };

    focus = () => {
        this.setState({ focussed: true });
    }
    
    blur = () => {
        this.setState({ focussed: false });
    }

    render() {
        const {
            label,
            error,
            hint,
            children,
            htmlFor
        } = this.props;

        const formFieldClassName = classnames(
            'hk-formfield',
            this.state.focussed && 'hk-formfield--focussed',
            error && 'hk-formfield--error'
        );

        return (
            <div 
                className={formFieldClassName} 
                onFocus={this.focus} 
                onBlur={this.blur}
            >
                {(label || hint) && 
                    <div className="hk-formfield__meta">
                        {label && <label className="hk-formfield__label" htmlFor={htmlFor}>{label}</label>}
                        {hint && <div className="hk-formfield__hint">{hint}</div>}
                    </div>
                }
                <div className="hk-formfield__field">
                    {children}
                </div>
                {error && 
                    <div className="hk-formfield__error">{error}</div>
                }
            </div>
        );
    }
}
