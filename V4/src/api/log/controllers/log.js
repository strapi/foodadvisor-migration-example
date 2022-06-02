const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::log.log');
