/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgresql://reservation_ess8_user:rEZw8CWKyjSmTfCtOwsbTFetPRKi7ei5@dpg-d029vk6uk2gs73e8o98g-a.oregon-postgres.render.com/reservation_ess8?ssl=true",
  DATABASE_URL_DEVELOPMENT = "postgresql://reservation_ess8_user:rEZw8CWKyjSmTfCtOwsbTFetPRKi7ei5@dpg-d029vk6uk2gs73e8o98g-a.oregon-postgres.render.com/reservation_ess8?ssl=true",
  DATABASE_URL_TEST = "postgresql://reservation_ess8_user:rEZw8CWKyjSmTfCtOwsbTFetPRKi7ei5@dpg-d029vk6uk2gs73e8o98g-a.oregon-postgres.render.com/reservation_ess8?ssl=true",
  DATABASE_URL_PREVIEW = "postgresql://reservation_ess8_user:rEZw8CWKyjSmTfCtOwsbTFetPRKi7ei5@dpg-d029vk6uk2gs73e8o98g-a.oregon-postgres.render.com/reservation_ess8?ssl=true",
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
