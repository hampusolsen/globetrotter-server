const DatabaseErrors = require("./DatabaseErrors");
const SecurityErrors = require("./SecurityErrors");

module.exports = {
    ...DatabaseErrors,
    ...SecurityErrors,
};
