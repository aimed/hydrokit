import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface ListItemState {}
export interface ListItemProps {
  header?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

export class ListItem extends React.Component<ListItemProps, ListItemState> {
  render() {
    const {
      header,
      onClick,
      children
    } = this.props;

    const classNames = classnames(
      'hk-list__item',
      header && 'hk-list__item--header',
      onClick && 'hk-list__item--clickable',
      this.props.className
    );

    return (
        <div 
          className={classNames} 
          onClick={onClick}
          tabIndex={onClick && 0}
        >
          {children}
        </div>
    );
  }
}
