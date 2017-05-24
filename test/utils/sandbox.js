export default class Sandbox {
  /**
   * @const {Array.<Function>}
   */
  static spies: Array<Function> = [];
  
  /**
   * @param {Object} object
   * @param {string} methodName
   * @return {Function}
   */
  static spyOn(object: Object, methodName: string): Function {
    if (!object[methodName]) {
      object[methodName] = () => null;
    }

    const spy = jest.spyOn(object, methodName);
    
    this.spies.push(spy);

    return spy;
  }

  /**
   *
   */
  static resetAllMocks(): void {
    Sandbox.spies.forEach((spy) => spy.mockRestore());
    Sandbox.spies.splice(0);
  }
}

afterEach(() => Sandbox.resetAllMocks());
