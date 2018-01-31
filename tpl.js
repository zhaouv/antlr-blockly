
var OmitedError = `//生成代码中,当一个不允许省略的值或块省略时,会抛出这个错误
function OmitedError(block, var_, rule, fileName, lineNumber) {
  var message = 'no omitted '+var_+' at '+rule;
  var instance = new Error(message, fileName, lineNumber);
  instance.block = block;
  instance.varName = var_;
  instance.blockName = rule;
  instance.name = 'OmitedError';
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, OmitedError);
  }
  return instance;
}

OmitedError.prototype = Object.create(Error.prototype);
OmitedError.prototype.constructor = OmitedError;`;

exports.OmitedError = OmitedError;