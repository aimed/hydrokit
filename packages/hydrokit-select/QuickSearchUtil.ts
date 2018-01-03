import { SelectOption } from "./SelectOption";

export class QuickSearchUtil {
  private timeout: number;
  private search: string = '';
  private lastInput: Date = new Date();

  constructor(timeout: number = 200) {
    this.timeout = timeout;
  }

  enter(key: string) {
    const now = new Date();

    if (now.getMilliseconds() > this.lastInput.getMilliseconds() + this.timeout) {
      this.search = key;
    } else {
      this.search += key;
    }

    this.lastInput = now;
  }

  find<T>(options: SelectOption<T>[]): number {
    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (typeof element.label === 'string' && element.label.search(this.search) >= 0) {
        return i;
      }
    }
    return -1;
  }

  clear() {
    this.search = '';
  }

  // TODO: Create searchAndFind() that combines both.
}
