export default class Error {
  static generate = {
    input: 'Please enter the correct value',
    internal: 'Cannot generate sentence',
  };

  static API = {
    timeout: 'Error: timeout for request',
    internal: 'api server internal error',
  };
}
