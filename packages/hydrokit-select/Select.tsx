import * as React from 'react';

import { FormEventHandler } from 'react';
import { QuickSearchUtil } from './QuickSearchUtil';
import { SelectOption } from './SelectOption';
import { TextField } from '@hydrokit/textField';
import { classnames } from '@hydrokit/utils';

export { SelectOption } from './SelectOption';

/**
 * Arrow Icon
 * Icon from https://material.io/icons/
 */
const Arrow = () => (
  <svg className="hk-select__arrow-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

/**
 * Search icon
 * Icon from https://material.io/icons/
 */
const Search = () => (
  <svg className="hk-select__search-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

/**
 * Props for an Option element.
 */
interface OptionProps {
  onClick: () => void;
  focussed: boolean;
  selected: boolean;
  label: string | JSX.Element;
}

/**
 * A single option within the Select element.
 * @param param0 Props
 */
const Option = ({ onClick, focussed, selected, label }: OptionProps): JSX.Element => {
  const classNames = classnames(
    'hk-select__option', 
    focussed && 'hk-select__option--focussed', 
    selected && 'hk-select__option--selected'
  );

  return (
    <div className={classNames} onClick={onClick}>{label}</div>
  );
}



/**
 * Checks if the given value is an primative value or a select option, whichs label can be used.
 * 
 * @template T 
 * @param {(SelectOption<T> |  T)} value 
 * @returns {value is SelectOption<T>} 
 */
function isSelectOption<T>(value: SelectOption<T> |  T): value is SelectOption<T> {
  if (typeof value === 'object') {
    return (value as any).label !== undefined;
  }
  return false;
}

export interface SelectState {
  open: boolean;
  search: string;
  focusIndex: number;
}

export interface SelectProps<T> {
  value?: T | SelectOption<T>;
  placeholder?: string;
  options?: SelectOption<T>[];
  onFocus?: () => void;
  onBlur?: () => void;
  onSelect?: (value: SelectOption<T>) => void;
  onSearch?: (search: string) => void;
}

export class Select<T> extends React.Component<SelectProps<T>, SelectState> {
  searchFieldRef: HTMLInputElement | null;
  searchFieldFocussed: boolean = false;

  // See https://dribbble.com/shots/3917182-Select-Country
  state: SelectState = {
    open: false,
    search: '',
    focusIndex: -1
  };

  /**
   * A reference to the toggle button, used to focus it after closing the dropdown.
   * 
   * @type {(HTMLButtonElement | null)}
   * @memberof Select
   */
  buttonRef: HTMLButtonElement | null;

  /**
   * A reference to the container, used to check if document clicks are inside.
   * 
   * @type {(HTMLDivElement | null)}
   * @memberof Select
   */
  containerRef: HTMLDivElement | null;

  /**
   * The QuickSearch helper.
   * 
   * @memberof Select
   */
  quickSearch = new QuickSearchUtil();

  componentWillReceiveProps(nextProps: SelectProps<T>) {
    if (this.props.options !== nextProps.options) {
      this.focus(0);
    }
  }

  /**
   * 
   */
  componentWillUnmount() {
    this.unregisterListeners();
  }

  /**
   * Register listeners.
   * 
   * @memberof Select
   */
  registerListeners() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('click', this.handleDocClick);
  }

  /**
   * Unregister listeners.
   * 
   * @memberof Select
   */
  unregisterListeners() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('click', this.handleDocClick);
  }

  /**
   * Handle clicks outside of the element by closing the dropdown.
   * 
   * @memberof Select
   */
  handleDocClick = (e: Event) => {
    if (this.containerRef && e.srcElement && !this.containerRef.contains(e.srcElement)) {
      this.toggle();
    }
  }

  /**
   * Opens or closes the dropdown.
   * 
   * @memberof Select
   */
  toggle = () => {
    const open = !this.state.open;
    const { options = [], value } = this.props;

    if (open) {
      this.registerListeners();
    } else {
      this.unregisterListeners();
      if (this.buttonRef) {
        this.buttonRef.focus();
      }
    }

    const initialIndex = value ? options.map(o => o.value).indexOf(isSelectOption(value) ? value.value : value) : 0;
    this.setState({ open, focusIndex: open && options.length ? initialIndex ||  0 : -1 });
  }

  /**
   * Handles keyboard events by changing the focus, closing the dropdown, or seleting, depending on which key was used.
   * 
   * @memberof Select
   */
  handleKeyDown = (e: KeyboardEvent) => {
    const { keyCode } = e;
    const { focusIndex } = this.state;
    const { options = [] } = this.props;

    if (keyCode === 40 /* up */) {
      this.focus(focusIndex + 1);
      e.preventDefault();
    } else if (keyCode === 38 /* down */) {
      this.focus(focusIndex - 1);
      e.preventDefault();
    } else if (keyCode === 27 /* esc */) {
      this.toggle();
    } else if (keyCode === 13 /* enter */) {
      this.select(focusIndex);
      e.preventDefault();
    } else if (!this.searchFieldFocussed) {
      // If focus is on the button element, select the first item that matches the given character.
      this.quickSearch.enter(e.key);
      const find = this.quickSearch.find(options);
      if (find >= 0) {
        if (this.state.open) {
          this.focus(find);
        } else {
          this.select(find);
        }
      } else {
        this.quickSearch.clear();
      }
    }
  }

  /**
   * Focusses the element with the given index.
   * 
   * @memberof Select
   */
  focus = (focusIndex: number, props: SelectProps<T> = this.props) => {
    const { options = [] } = props;
    const maxIndex = options.length ? options.length - 1 : -1;
    const minIndex = options.length ? 0 : -1;
    this.setState({ focusIndex: Math.max(minIndex, Math.min(focusIndex, maxIndex)) });
  }

  /**
   * Selects the element with the given index, if the index is valid.
   * If the index is invalid, the selection will be ignored.
   * 
   * @memberof Select
   */
  select = (focusIndex: number) => {
    const { options = [], onSelect } = this.props;

    if (this.state.open) {
      this.toggle();
    }
    
    if (onSelect && options.length >= focusIndex && focusIndex >= 0) {
      onSelect(options[focusIndex]);
    }
  }

  /**
   * Propagates the search event.
   * 
   * @type {FormEventHandler<HTMLInputElement>}
   * @memberof Select
   */
  search: FormEventHandler<HTMLInputElement> = (event) => {
    const { onSearch = () => {/**/} } = this.props;
    this.setState({ search: event.currentTarget.value }, () => onSearch(this.state.search));
  }

  /**
   * 
   * 
   * @returns 
   * @memberof Select
   */
  render() {
    // TODO: Add iterator for options index that changes with new props?
    const {
      placeholder,
      options = [],
      onSearch,
      value
    } = this.props;

    const {
      open,
      focusIndex,
      search
    } = this.state;

    const selectClasses = classnames(
      'hk-select',
      open && 'hk-select--open'
    );

    const valueContainerClasses = classnames(
      'hk-select__value-container',
      value ? 'hk-select__value-container--selected' : 'hk-select__value-container--placeholder'
    );

    // TODO: Use Button with icons.
    // TODO: Add ability to type.
    return (
      <div className={selectClasses} ref={ref => this.containerRef = ref}>
        <button className={valueContainerClasses} tabIndex={0} onClick={this.toggle} ref={ref => this.buttonRef = ref}>
          <span className="hk-select__value">{value ? (isSelectOption(value) ? value.label : value) : (placeholder ||  'Select')}</span>
          <Arrow />
        </button>

        {open &&
          <div className="hk-select__select">
            <button className="hk-select__value-container hk-select__value-container--placeholder" tabIndex={0} onClick={this.toggle}>
              <span className="hk-select__value">{placeholder ||  'Select'}</span>
              <Arrow />
            </button>

            {onSearch &&
              <div className="hk-select__search-container">
                <TextField
                  inputRef={ref => ref && ref.focus()}
                  onChange={this.search} 
                  value={search} 
                  onFocus={() => this.searchFieldFocussed = true}
                  onBlur={() => this.searchFieldFocussed = false}
                />
              </div>
            }

            <div className="hk-select__options">
              {options.map((option, i) => (
                <Option
                  key={i}
                  focussed={i === focusIndex}
                  selected={option.value === value}
                  onClick={() => this.select(i)}
                  label={option.label}
                />
              ))}
            </div>
          </div>
        }
      </div>
    );
  }
}
