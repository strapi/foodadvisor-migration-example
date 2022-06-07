'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

module.exports = {
  '*/1 * * * *': async ({ strapi }) => {
    const contentTypes = ['api::article.article', 'api::restaurant.restaurant', 'api::page.page'];

    contentTypes.map(async (type) => {
      const draftArticlesToPublish = await strapi.db.query(type).findMany({
        where: {
          ready: true,
          publishedAt: null,
          publish_at: {
            $lte: new Date(),
          },
        },
      });

      await Promise.all(
        draftArticlesToPublish.map(async (article) => {
          return await strapi.db.query(type).update({
            where: { id: article.id },
            data: {
              publishedAt: new Date(),
            },
          });
        })
      );
    });
  },
};
