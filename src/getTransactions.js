/**
 * @fileoverview
 * Part 2 of 3 - Load PPRO's Transactions
 *
 * In this part you will read transaction information from a CSV file.
 *
 * Implement a function that:
 *   * takes no arguments;
 *   * is asynchronous;
 *   * reads the contents from `../data/ppro-transactions.csv`, which contains
 *     a list of PPRO's transactions;
 *   * converts the information from the CSV into a `status -> txId[]` map:
 *     `{ statusA: ["TX01", "TX02"], statusB: ["TX03", ...], ...}`;
 *   * returns the above mentioned map;
 *
 * Additional info:
 *   * you don't have to handle errors, but adding a comment indicating
 *     where and what would you check is highly appreciated;
 *   * The function **must** be the default export of the module;
 */

const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const { groupBy } = require('./utils');

const transactionsFile = path.join(__dirname, '..', 'data', 'ppro-transactions.csv');

module.exports = () => new Promise((resolve, reject) => {
  fs.readFile(transactionsFile, (err, rawBuffer) => {
    if (err) return reject(err);

    parse(rawBuffer.toString(), { columns: true }, (err, parsedData) => {
      if (err) return reject(err);
      const resultBuilder = groupBy('status', item => item.transaction_id);
      resolve(resultBuilder(parsedData));
    });
  });
});

