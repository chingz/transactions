const groupBy = (groupField, objectBuilderFunc) => data => 
  data.reduce((acc, curr) => {
    (acc[curr[groupField]] = acc[curr[groupField]] || []).push(objectBuilderFunc(curr));
    return acc;
  }, {});

const swapKeyValue = obj => Object.keys(obj).reduce((acc, key) => {
  const keyValues = obj[key];
  keyValues.forEach(value => acc[value.toString()] = key);
  return acc;
}, {});

const convertKeys = keyConverter => data => Object.keys(data).reduce((acc, key) => {
  const newKey = keyConverter[key];
  if (!newKey) throw new Error('Unknown state');
  acc[newKey] = data[key];
  return acc;
}, {})

module.exports = {
  groupBy,
  swapKeyValue,
  convertKeys,
};
