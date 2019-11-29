/**
 * @fileoverview
 * Part 3 of 3 - match settlement data
 *
 * Now that we have data from both sources we can match the transactions
 * and look for ambiguities.
 *
 * For this exercise, create a function that:
 *   * takes no arguments;
 *   * is asynchronous;
 *   * uses the `getSettlements()` and `getTransactions()` functions which
 *     we created in the previous steps
 *   * returns a map with a list of "good" (matching) transactions and a list
 *     of "bad" (mismatching) transactions, and a list of transactions that
 *     are missing on either side
 *     `{ matched: [ 100, 101 ], mismatched: [102, ...], missing: [103, ...]}`;
 *   * is the module's default export;
 *
 * Additional info:
 *   * you don't have to handle errors, but adding a comment indicating
 *     where and what would you check is highly appreciated;
 *   * the function **must** be the default export of the module;
 *   * we favour readability over speed!
 */

const getSettlements = require('./getSettlements');
const getTransactions = require('./getTransactions');
const utils = require('./utils');

const settlementsKeyConverter = {
  'SUCCESS': 'S',
  'PENDING': 'P',
  'ERROR': 'E',
}

const transactionsKeyConverter = {
  'ok': 'S',
  'waiting': 'P',
  'failed': 'E',
}

module.exports = () => Promise.all([
    getSettlements().then(utils.convertKeys(settlementsKeyConverter)).then(utils.swapKeyValue),
    getTransactions().then(utils.convertKeys(transactionsKeyConverter)).then(utils.swapKeyValue)
  ])
    .then(([settlements, transactions]) => {
      const uniqueKeys = new Set(Object.keys(settlements).concat(Object.keys(transactions)));

      return (
        Array.from(uniqueKeys).reduce((acc, key) => {
          const settlementStatus = settlements[key];
          const transactionStatus = transactions[key];
          const matchStatus = (!settlementStatus || !transactionStatus)
            ? 'missing'
            : settlementStatus !== transactionStatus
              ? 'mismatched'
              : 'matched';
            
          acc[matchStatus].push(parseInt(key));
          return acc;
        }, { matched: [], mismatched: [], missing: [] })
      );
    })
