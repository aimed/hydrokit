import * as React from 'react';

import { classnames } from '../utils/classnames';

export interface ListState {}
export interface ListProps {
  dark?: boolean;
}

export class List extends React.Component<ListProps, ListState> {
  render() {
    const classNames = classnames(
      'hk-list',
      this.props.dark && 'hk-list--dark'
    );
    
    return (
        <div className={classNames}>{this.props.children}</div>
    );
  }
}
