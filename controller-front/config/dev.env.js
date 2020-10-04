"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  JSONLAB_PATH: '"http://127.0.0.1:8000/api/Lab/"',
  JSONSERVER_PATH: '"http://127.0.0.1:8000/api/Server/"',
  JSONSERVERRUN_PATH: '"http://127.0.0.1:8000/Server/"',
  JSONHOME_PATH: '"http://127.0.0.1:8000/import/"',
  JSONCOMPLAIN_PATH: '"http://127.0.0.1:8000/api/Complain/"',
  JSONCOMMAND_PATH: '"http://127.0.0.1:8000/api/Command/"',
  JSONUSERL_PATH: '"http://127.0.0.1:8000/api/User/1/"',
  JSONUSERW_PATH: '"http://127.0.0.1:8000/api/User/2/"',
  USERNAMEC: '"ayaron"',
  PASSWORDC: '"AAAaaa123"',

});
