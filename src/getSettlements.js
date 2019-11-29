/**
 * @fileoverview
 * Part 1 of 3 - download bank's settlement file
 *
 * The bank's settlement file can be retrieved from an API that returns a JSON
 * containing a list of transactions. Our fake API endpoint is available as
 * `GET https://gitlab.com/snippets/1799690/raw`.
 *
 * For this exercise, create a function that:
 *   * takes no arguments;
 *   * is asynchronous;
 *   * fetches data from the endpoint above;
 *   * returns a map of `status -> txId[]` like:
 *     `{ statusA: [ 100, 101 ], statusB: [102, ...], ...}`;
 *   * is the module's default export;
 *
 * Additional info:
 *   * you don't have to handle errors, but adding a comment indicating
 *     where and what would you check is highly appreciated;
 *   * The function **must** be the default export of the module;
 */

const fetch = require('node-fetch');
const { groupBy } = require('./utils');

const getJson = response => response.ok ? response.json() : new Error(response.status);

module.exports = () => 
  fetch('https://gitlab.com/snippets/1799690/raw')
    .then(getJson)
    .then(groupBy('status', item => item.id));
