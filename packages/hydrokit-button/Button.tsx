import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface ButtonState { }
export interface ButtonProps extends
  React.HTMLProps<HTMLButtonElement> {
    className?: string;
    primary?: boolean;
}

export class Button extends React.Component<ButtonProps, ButtonState> {
  render() {
    const { className, primary, ...props } = this.props;
    const classNames = classnames(
      className,
      'hk-button',
      primary && 'hk-button--primary'
    );
    return <button className={classNames} {...props} />;
  }
}
