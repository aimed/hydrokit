import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface SubmitButtonState { }
export interface SubmitButtonProps extends
  React.HTMLProps<HTMLButtonElement> {
    className?: string;
    primary?: boolean;
    submitting?: boolean;
}

export class SubmitButton extends React.Component<SubmitButtonProps, SubmitButtonState> {
  render() {
    const { className, primary, submitting, disabled, ...props } = this.props;
    const classNames = classnames(
      className,
      'hk-button',
      'hk-submit-button',
      primary && 'hk-button--primary',
      primary && 'hk-submit-button--primary',
      submitting && 'hk-submit-button--submitting'
    );
    return <button className={classNames} disabled={disabled || submitting} {...props} />;
  }
}
