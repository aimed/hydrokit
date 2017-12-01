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
}

export class PopoverMenu extends React.Component<PopoverMenuProps, PopoverMenuState> {
    
    state: PopoverMenuState = {
        open: false
    };

    container: HTMLElement | null = null;

    get open() {
        return this.props.open !== undefined ? this.props.open : this.state.open;
    }

    toggle = () => {
        if (this.props.onOpen) {
            this.props.onOpen(!this.open);
        } else {
            this.setState({ open: !this.open });
        }
    }

    handleDocumentClick = (event: MouseEvent) => {
        if (
            !(this.container && event.srcElement && this.container.contains(event.srcElement))
            && this.open
        ) {
            this.toggle();
        }
    }

    componentWillMount() {
        document.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    render() {
        const themeClassNames = classnames(
            'hk-popover-menu-container',
            this.props.dark ? 'hk-theme-dark' : 'hk-theme-bright'
        );
        
        return (
            <div className={themeClassNames}>
                <div className="hk-popover-menu" ref={ref => this.container = ref} onClick={this.toggle}>
                    <div className="hk-popover-menu__label">{this.props.label}</div>
                    {this.open && <div className="hk-popover-menu__content">{this.props.children}</div>}
                </div>
            </div>
        );
    }
}
