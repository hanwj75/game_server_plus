//nodejs에서 지원하는 Error객체
class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}

export default CustomError;
