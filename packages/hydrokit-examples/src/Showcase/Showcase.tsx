import './showcase.css';

import * as React from 'react';

export interface ShowcaseState {}
export interface ShowcaseProps {
    title?: string;
}

export class Showcase extends React.Component<ShowcaseProps, ShowcaseState> {
  render() {
    return (
        <div className="showcase">
            <h2 className="showcase__title">{this.props.title}</h2>
            <div className="showcase__content">{this.props.children}</div>
        </div>
    );
  }
}
