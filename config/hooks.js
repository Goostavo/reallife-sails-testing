// ORM Hook configuration
// Increased timeout to avoid crashing on sails lift

module.exports.orm = {
  _hookTimeout: 300000,
};

module.exports.pubsub = {
  _hookTimeout: 300000,
};
