import * as React from 'react';

import { classnames } from '../utils/classnames';

export interface ListItemState {}
export interface ListItemProps {
  header?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export class ListItem extends React.Component<ListItemProps, ListItemState> {
  render() {
    const classNames = classnames(
      'hk-list__item',
      this.props.header && 'hk-list__item--header',
      this.props.onClick && 'hk-list__item--clickable'
    );

    return (
        <div 
          className={classNames} 
          onClick={this.props.onClick}
          tabIndex={this.props.onClick && 0}
        >
          {this.props.children}
        </div>
    );
  }
}
