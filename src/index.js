"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"], //only listen to events for this model
      afterCreate: async ({ result }) => {
        //create an Author instance from the fields of the Admin User
        // that has just been created

        // Exctract the fields from the newly created Admin User
        const {
          id,
          firstname,
          lastname,
          email,
          username,
          createdAt,
          updatedAt,
        } = result;

        await strapi.service("api::author.author").create({
          data: {
            firstname,
            lastname,
            email,
            username,
            createdAt,
            updatedAt,
            admin_user: [id],
          },
        });
      },
      afterUpdate: async ({ result }) => {
        // get the ID of the Author that corresponds
        // to the Admin User that's been just updated
        
        const correspondingAuthor = await strapi
          .service("api::author.author")
          .find({
            admin_user: [result.id],
          });
        const correspondingAuthorResult = correspondingAuthor.results[0];
        

        //update the Author accordingly
        const { firstname, lastname, email, username, updatedAt } = result;
        await strapi
          .service("api::author.author")
          .update(correspondingAuthorResult.id, {
            data: {
              firstname,
              lastname,
              email,
              username,
              updatedAt,
            },
          });
      },
    });
  },
};
