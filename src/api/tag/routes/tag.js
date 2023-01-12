"use strict";

/**
 * tag router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::tag.tag", {
//   prefix: "", // /tags --> /test/tags kalo prefixnya diisi test
//   only: ["find", "findOne"], // available api route yg dibuat berarti cm get
//   except: [], // bikin api route selain yg ditulis di sini
//   config: {
//     find: {
//       auth: false, // disabling the Strapi JWT auth system for this route
//       policies: [],
//       middlewares: [],
//     },
//     findOne: {},
//     create: {},
//     update: {},
//     delete: {},
//   },
});
