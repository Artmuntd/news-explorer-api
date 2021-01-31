const RegExp = /(^https?:\/\/)?(([\w-]+\.)+\w+)(:[1-9]\d{1,4})?((\/[\w-]+)+)?((\/)|(#))?/;
const mongoIdRegExp = /^[0-9a-fA-F]{24}$/;

module.exports = {
  RegExp,
  mongoIdRegExp,
};
