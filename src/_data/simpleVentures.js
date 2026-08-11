const ventures = require("./ventures.json");

module.exports = ventures.filter((venture) => !venture.customPage);
