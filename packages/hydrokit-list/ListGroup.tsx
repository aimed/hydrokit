import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface ListGroupState {}
export interface ListGroupProps {
  className?: string;
}

export class ListGroup extends React.Component<ListGroupProps, ListGroupState> {
  render() {
    const classNames = classnames(
      'hk-list__group',
      this.props.className
    );
    
    return (
        <div className={classNames}>{this.props.children}</div>
    );
  }
}
