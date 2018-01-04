import * as React from 'react';

import { FormEventHandler } from 'react';
import { QuickSearchUtil } from './QuickSearchUtil';
import { SelectOption } from './SelectOption';
import { TextField } from '@hydrokit/textField';
import { classnames } from '@hydrokit/utils';

export { SelectOption } from './SelectOption';

const KeyCodes = {
  up: 40,
  down: 38,
  esc: 27,
  enter: 13,
  tab: 9
};

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

  /**
   * 
   * @param nextProps 
   */
  componentWillReceiveProps(nextProps: SelectProps<T>) {
    // Clear the current focus when receiving new options.
    if (this.props.options !== nextProps.options) {
      this.focus(0);
    }
  }

  /**
   * 
   */
  componentWillUnmount() {
    this.unregisterOpenListeners();
    this.unregisterFocussedListeners();
  }

  /**
   * Register listeners.
   * 
   * @memberof Select
   */
  registerOpenListeners = () => {
    document.addEventListener('keydown', this.handleKeyDownOpen);
    document.addEventListener('click', this.handleDocClick);
  }

  /**
   * Unregister listeners.
   * 
   * @memberof Select
   */
  unregisterOpenListeners = () => {
    document.removeEventListener('keydown', this.handleKeyDownOpen);
    document.removeEventListener('click', this.handleDocClick);
  }

  /**
   * Register listeners.
   * 
   * @memberof Select
   */
  registerFocussedListeners = () => {
    document.addEventListener('keydown', this.handleKeyDownClosed);
  }

  /**
   * Unregister listeners.
   * 
   * @memberof Select
   */
  unregisterFocussedListeners = () => {
    document.removeEventListener('keydown', this.handleKeyDownClosed);
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
   * Gets the index of the next focussable item.
   * 
   * @readonly
   * @type {number}
   * @memberof Select
   */
  get nextFocus(): number {
    const { focusIndex } = this.state;
    const { options = [] } = this.props;
    return Math.min(focusIndex + 1, options.length -1);
  }

  /**
   * Gets the index of the prev focussable item.
   * 
   * @readonly
   * @type {number}
   * @memberof Select
   */
  get prevFocus(): number {
    const { focusIndex } = this.state;
    const { options = [] } = this.props;
    return Math.max(focusIndex - 1, -1);
  }

  /**
   * Gets the index of the selected item. Returns -1 if not found or nothing is selected.
   * 
   * @readonly
   * @type {number}
   * @memberof Select
   */
  get selectedIndex(): number {
    const { options = [], value } = this.props;
    
    if (!value) {
      return -1;
    }

    if (isSelectOption(value)) {
      return options.indexOf(value);
    } else {
      return options.map(o => o.value).indexOf(value);
    }
  }

  /**
   * Opens or closes the dropdown.
   * 
   * @memberof Select
   */
  toggle = () => {
    const open = !this.state.open;
    const { options = [], value, onSearch } = this.props;

    if (open) {
      this.registerOpenListeners();
    } else {
      this.unregisterOpenListeners();
      
      // At this point we need to clear the search, because otherwise results will still be filtered when going up/down
      if (onSearch) {
        onSearch('');
      }

      if (this.buttonRef) {
        this.buttonRef.focus();
      }
    }

    this.setState({ open, focusIndex: open && options.length ? this.selectedIndex ||  0 : -1, search: '' });
  }

  /**
   * Handles key events when in closed state.
   * 
   * @memberof Select
   */
  handleKeyDownClosed = (e: KeyboardEvent) => {
    if (this.state.open) {
      return;
    }

    const { keyCode } = e;
    const { options = [] } = this.props;

    if (keyCode === KeyCodes.up) {
      this.select(this.selectedIndex + 1);
      e.preventDefault();
      return;
    }

    if (keyCode === KeyCodes.down) {
      this.select(this.selectedIndex - 1);
      e.preventDefault();
      return;
    }

    if (e.key && !(e.metaKey || e.altKey || e.ctrlKey)) {
      const find = this.quickSearch.enterAndFind(e.key, options);
      
      if (find >= 0) {
        this.select(find);
      }
      return;
    }    
  }

  /**
   * Handles key events when in open state.
   * 
   * @memberof Select
   */
  handleKeyDownOpen = (e: KeyboardEvent) => {
    const { keyCode } = e;
    const { options = [] } = this.props;

    if (keyCode === KeyCodes.up) {
      this.focus(this.nextFocus);
      e.preventDefault();
      return;
    }

    if (keyCode === KeyCodes.down) {
      this.focus(this.prevFocus);
      e.preventDefault();
      return;
    }

    if (keyCode === KeyCodes.esc) {
      this.toggle();
      return;
    }

    if (keyCode === KeyCodes.enter) {
      this.select(this.state.focusIndex);
      e.preventDefault(); // Prevents opening the menu again right after closing.
      return;
    }

    if (keyCode === KeyCodes.tab) {
      this.toggle();
    }

    if (e.key && !(e.metaKey || e.altKey || e.ctrlKey) && !this.searchFieldFocussed) {
      const find = this.quickSearch.enterAndFind(e.key, options);
      
      if (find >= 0) {
        this.focus(find);
      }
      return;
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
    
    if (onSelect && options.length > focusIndex && focusIndex >= 0) {
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
    return (
      <div className={selectClasses} ref={ref => this.containerRef = ref}>
        <button 
          className={valueContainerClasses} 
          tabIndex={0} 
          onClick={this.toggle}
          ref={ref => this.buttonRef = ref}
          onFocus={this.registerFocussedListeners}
          onBlur={this.unregisterFocussedListeners}
        >
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
