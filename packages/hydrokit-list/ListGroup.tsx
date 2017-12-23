import * as React from 'react';

export interface ListGroupState {}
export interface ListGroupProps {}

export class ListGroup extends React.Component<ListGroupProps, ListGroupState> {
  render() {
    return (
        <div className="hk-list__group">{this.props.children}</div>
    );
  }
}
