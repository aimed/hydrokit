import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export interface PopoverMenuState {
  open: boolean;
}

export interface PopoverMenuProps {
  anchor?: HTMLElement | null;
  label: JSX.Element | string;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  dark?: boolean;
  alignVertical?: 'top' | 'bottom';
  alignHorizontal?: 'left' | 'right';
}

export class PopoverMenu extends React.Component<PopoverMenuProps, PopoverMenuState> {

  state: PopoverMenuState = {
    open: false
  };

  container: HTMLElement | null = null;

  get open() {
    return this.props.open !== undefined ? this.props.open : this.state.open;
  }

  get align(): string {
    const { alignHorizontal = 'left', alignVertical = 'top' } = this.props;
    return `${alignVertical}-${alignHorizontal}`;
  }

  toggle = () => {    
    if (this.props.onOpen) {
      this.props.onOpen(!this.open);
    } else {
      this.setState({ open: !this.open });
    }
  }

  handleDocumentClick = (event: MouseEvent) => {    
    if (!this.container || !event.target) {
      return;
    }

    const clickedOutside = !this.container.contains( event.target as Element);

    if (clickedOutside && this.open) {
      this.toggle();
    }
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 27 /* esc */ && this.open) {
      this.toggle();
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleDocumentClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {    
    const themeClassNames = classnames(
      'hk-popover-menu-container',
      this.props.dark ? 'hk-theme-dark' : 'hk-theme-bright',
      this.open ? 'hk-popover-menu-container--open' : 'hk-popover-menu-container--closed'
    );

    const contentClassNames = classnames(
      'hk-popover-menu__content',
      'hk-popover-menu__content--' + this.align
    );

    // tslint:disable-next-line:no-console
    console.log(this);
    
    return (
      <div className={themeClassNames}>
        <div className="hk-popover-menu" ref={ref => this.container = ref} onClick={this.toggle}>
          <div className="hk-popover-menu__label">{this.props.label}</div>
          {this.open && <div className={contentClassNames}>{this.props.children}</div>}
        </div>
      </div>
    );
  }
}
