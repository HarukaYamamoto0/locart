/**
 * Class representing the left part of an Either structure.
 * Often used to represent a failure or an undesirable outcome.
 * @class
 * @example
 * const failure = new Left('Error occurred');
 * console.log(failure.isLeft()); // true
 * console.log(failure.isRight()); // false
 */
class Left {
  /**
   * Creates an instance of Left.
   * @param {*} value - The value stored in the left side, typically representing an error or failure.
   */
  constructor(value) {
    /**
     * The value stored in the left side.
     * @type {*}
     */
    this.value = value;
  }

  /**
   * Checks if this instance is Left.
   * @returns {boolean} Always returns true indicating this is a Left instance.
   */
  isLeft() {
    return true;
  }

  /**
   * Checks if this instance is Right.
   * @returns {boolean} Always returns false indicating this is not a Right instance.
   */
  isRight() {
    return false;
  }
}

/**
 * Class representing the right part of an Either structure.
 * Often used to represent a success or a desirable outcome.
 * @class
 * @example
 * const success = new Right('Operation successful');
 * console.log(success.isLeft()); // false
 * console.log(success.isRight()); // true
 */
class Right {
  /**
   * Creates an instance of Right.
   * @param {*} value - The value stored in the right side, typically representing a success or correct value.
   */
  constructor(value) {
    /**
     * The value stored in the right side.
     * @type {*}
     */
    this.value = value;
  }

  /**
   * Checks if this instance is Left.
   * @returns {boolean} Always returns false indicating this is not a Left instance.
   */
  isLeft() {
    return false;
  }

  /**
   * Checks if this instance is Right.
   * @returns {boolean} Always returns true indicating this is a Right instance.
   */
  isRight() {
    return true;
  }
}

export { Left, Right };
