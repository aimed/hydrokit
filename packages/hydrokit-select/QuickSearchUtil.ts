import { SelectOption } from './SelectOption';

/**
 * A class that reproduces the typical type and focus behavior of native select elements.
 * 
 * Typing a, will select the first item that starts with a, typing ab will select the first item with ab, etc.
 * 
 * @export
 * @class QuickSearchUtil
 */
export class QuickSearchUtil {
  /**
   * The default interval in which multiple keystrokes count towards the same search.
   * 
   * @private
   * @type {number}
   * @memberof QuickSearchUtil
   */
  private timeout: number;
  private search: string = '';

  /**
   * The time in ms at which a new keystroke should be interpreted as a new word.
   * 
   * @private
   * @type {number}
   * @memberof QuickSearchUtil
   */
  private nextRefresh: number = 0;

  /**
   * Creates an instance of QuickSearchUtil.
   * @param {number} [timeout=100] The default interval in which multiple keystrokes count towards the same search.
   * @memberof QuickSearchUtil
   */
  constructor(timeout: number = 100) {
    this.timeout = timeout;
  }

  /**
   * Appends a key to the list of keystrokes. Resets the list if timeout has passed.
   * 
   * @private
   * @param {string} key The key that was entered.
   * @returns {boolean} Whether or not a refresh occured.
   * @memberof QuickSearchUtil
   */
  private enter(key: string): boolean {
    const now = new Date().getMilliseconds();
    const refreshed = now > this.nextRefresh;
    if (refreshed) {
      this.search = key;
    } else {
      this.search += key;
    }

    this.nextRefresh = now + this.timeout;
    return refreshed;
  }

  /**
   * Finds the current search in the given options.
   * 
   * @private
   * @template T 
   * @param {SelectOption<T>[]} options The options to be searched.
   * @returns {number} The index of the first item that matches the search.
   * @memberof QuickSearchUtil
   */
  private find<T>(options: SelectOption<T>[]): number {
    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (typeof element.label === 'string' && element.label.indexOf(this.search) === 0) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Clears the current search.
   * 
   * @private
   * @memberof QuickSearchUtil
   */
  private clear() {
    this.search = '';
  }

  /**
   * Adds the given key to the list of keystrokes and searches the given options.
   * 
   * @template T 
   * @param {string} key The key that was entered.
   * @param {SelectOption<T>[]} options The options to search.
   * @returns {number} The index of the first items in options that matches the search.
   * @memberof QuickSearchUtil
   */
  enterAndFind<T>(key: string, options: SelectOption<T>[]): number {
    const refreshed = this.enter(key);
    const found = this.find(options);

    // If this hasn't been found and we're not looking up a new word anyways, try to find one that started with the key
    if (found < 0 && !refreshed) {
      this.clear();
      this.enter(key);
      return this.find(options);
    }

    return found;
  }
}
