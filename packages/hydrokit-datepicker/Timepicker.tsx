import * as React from 'react';

import { classnames } from '@hydrokit/utils';

function zeroPad(num: number): string {
  if (num < 10) {
    return '0' + num;
  }
  return '' + num;
}

function makeArray<T>(len: number, factory: (i: number) => T): T[] {
  const array: T[] = [];
  while (len-- >= 0) {
    array[len] = factory(len);
  }
  return array;
}

export interface TimepickerState {
  hour: number;
  minute: number;
  amOrPm: 'am' | 'pm';
  open: boolean;
}

export interface TimepickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  onFocus?: () => void;
  onBlur?: () => void;

}

// https://dribbble.com/shots/3455745-Appointment-Screen
export class Timepicker extends React.Component<TimepickerProps, TimepickerState> {
  size: { height: number, width: number } | undefined;
  containerRef: HTMLDivElement | null;
  minuteRef: HTMLInputElement | null;
  hourRef: HTMLInputElement | null;

  state: TimepickerState = {
    hour: 12,
    minute: 0,
    amOrPm: 'am',
    open: false
  };

  componentDidMount() {
    this.updateStateWithProps(this.props);
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillReceiveProps(props: TimepickerProps) {
    this.updateStateWithProps(props);
  }

  updateStateWithProps(props: TimepickerProps) {
    if (props.value) {
      this.setState({
        hour: props.value.getHours(),
        minute: props.value.getMinutes()
      });
    }
  }

  get useHour12(): boolean {
    const date = new Date(Date.UTC(2012, 11, 12, 13, 0, 0));
    const str = date.toLocaleTimeString();
    return !!str.match(/pm/);
  }

  get containerStyle(): React.CSSProperties {
    if (!this.size || !this.state.open) {
      return {};
    }

    const height = this.size.height / 2;
    const width = this.size.width / 2;

    return {
      padding: `${height}px ${width}px`
    };
  }

  handleDocumentClick = (e: MouseEvent) => {
    if (this.state.open && this.containerRef && e.srcElement && !this.containerRef.contains(e.srcElement)) {
      this.setState({ open: false });
    } else if (!this.state.open && this.containerRef && e.srcElement && this.containerRef.contains(e.srcElement)) {
      this.setState({ open: true });
    }
  }

  getNumericValue(e: React.FormEvent<HTMLInputElement>, max: number): number {
    const input = parseInt(e.currentTarget.value.replace('-', '').replace(',', '').replace('.', ''), 10);

    if (input === NaN) {
      return 0;
    }

    if (input < 0) {
      return 0;
    }

    if (input > max) {
      return Math.min(max, (input % 10));
    }

    return input;
  }

  handleHourInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const hour = this.getNumericValue(e, 23);
    this.setState({ hour }, this.change);
  }

  handleMinuteInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const minute = this.getNumericValue(e, 59);
    this.setState({ minute }, this.change);
  }

  handleHourKeydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === ':' && this.minuteRef) {
      e.preventDefault();
      this.minuteRef.focus();
    }
  }

  handleAmPmChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    this.setState({ amOrPm: this.state.amOrPm === 'am' ? 'pm' : 'am' }, this.change);
  }

  hourValues(): number[] {
    return makeArray(this.useHour12 ? 12 : 24, i => i);
  }

  minuteValues(): number[] {
    return makeArray(60, i => i);
  }

  change = () => {
    const { hour, minute, amOrPm } = this.state;
    const { onChange = () => {/**/}, value = new Date() } = this.props;
    const newDate = new Date(value.getTime());
    newDate.setHours(hour + (this.useHour12 && amOrPm === 'pm' ? 12 : 0));
    newDate.setMinutes(minute);
    onChange(newDate);
  }

  render() {
    const { hour, minute, amOrPm, open } = this.state;
    
    const {
      className,
      // value = new Date(),
      onFocus,
      onBlur
    } = this.props;

    const containerClassName = classnames(
      'hk-timepicker',
      className
    );

    const popoverClassName = classnames(
      'hk-timepicker__popover',
      open ? 'hk-timepicker__popover--open' : 'hk-timepicker__popover--closed'
    );

    return (
      <div
        className={containerClassName} 
        onFocus={onFocus} 
        onBlur={onBlur}
        style={this.containerStyle}
        ref={ref => this.containerRef = ref}
      >
        <div className={popoverClassName}>
          <div className="hk-timepicker__typing">
            <input 
              ref={ref => this.hourRef = ref}
              className="hk-timepicker__input" 
              onChange={this.handleHourInput} 
              value={zeroPad(hour)}
              onKeyDown={this.handleHourKeydown}
              onFocus={() => this.setState({ open: true })}
            />
            <span className="hk-timepicker__input-separator">:</span>
            <input 
              className="hk-timepicker__input" 
              onChange={this.handleMinuteInput} 
              value={zeroPad(minute)} 
              ref={ref => this.minuteRef = ref}
              onFocus={() => this.setState({ open: true })}
            />
            {this.useHour12 && 
              <input 
                type="button"
                className="hk-timepicker__input"
                onClick={this.handleAmPmChange}
                value={amOrPm}
                onFocus={() => this.setState({ open: true })}
              />
            }
          </div>
          {open &&
            <div className="hk-timepicker__touching">
              <div className="hk-timepicker__hours">
                {this.hourValues().map(h => 
                  <div key={h} onClick={() => this.setState({ hour: h })}>{zeroPad(h)}</div>
                )}
              </div>
              <div className="hk-timepicker__touching-separator" />
              <div className="hk-timepicker__minutes">
                {this.minuteValues().map(m => 
                  <div key={m} onClick={() => this.setState({ minute: m })}>{zeroPad(m)}</div>
                )}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
