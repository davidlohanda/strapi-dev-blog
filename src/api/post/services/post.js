"use strict";

/**
 * post service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely new custom service
  async exampleService(...args) {
    let response = { okay: true };

    if (response.okay === false) {
      return { response, error: true };
    }

    return response;
  },

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    console.log("masukkk");
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);

    // some custom logic
    results.forEach((result) => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(entityId, params = {}) {
    return strapi.entityService.findOne(
      "api::post.post",
      entityId,
      this.getFetchParams(params)
    );
  },

  async findPublic(args) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        premium: false,
      },
    };

    const publicPosts = await strapi.entityService.findMany(
      "api::post.post",
      this.getFetchParams(newQuery)
    );

    return publicPosts;
  },

  async findOneIfPublic(id, query) {
    const post = await strapi.entityService.findOne(
      "api::post.post",
      id,
      this.getFetchParams(query)
    );

    return post.premium ? null : post;
  },

  async likePost({ postId, userId, query }) {
    const postToLike = await strapi.entityService.findOne(
      "api::post.post",
      postId,
      {
        populate: ["likeBy"],
      }
    );

    // use the underlying entity service API to update the current post with the new relation
    const updatedPost = await strapi.entityService.update(
      "api::post.post",
      postId,
      {
        data: { likeBy: [...postToLike.likeBy, userId] },
        ...query
      },
    );

    console.log(updatedPost)
    return updatedPost;
  },
}));
