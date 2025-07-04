/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgresql://dev_wesb_user:KDm8R19YPmbDWtUHnIZcYkgtwKmxi1aH@dpg-d1fi1aqdbo4c73fjvqfg-a.oregon-postgres.render.com/dev_wesb?ssl=true",
  DATABASE_URL_DEVELOPMENT = "postgresql://dev_wesb_user:KDm8R19YPmbDWtUHnIZcYkgtwKmxi1aH@dpg-d1fi1aqdbo4c73fjvqfg-a.oregon-postgres.render.com/dev_wesb?ssl=true",
  DATABASE_URL_TEST = "postgresql://dev_wesb_user:KDm8R19YPmbDWtUHnIZcYkgtwKmxi1aH@dpg-d1fi1aqdbo4c73fjvqfg-a.oregon-postgres.render.com/dev_wesb?ssl=true",
  DATABASE_URL_PREVIEW = "postgresql://dev_wesb_user:KDm8R19YPmbDWtUHnIZcYkgtwKmxi1aH@dpg-d1fi1aqdbo4c73fjvqfg-a.oregon-postgres.render.com/dev_wesb?ssl=true",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
