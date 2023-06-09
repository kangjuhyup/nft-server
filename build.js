const copyfiles = require('copyfiles');

copyfiles(['./src/sc/contracts/erc20.template', './dist/sc/contracts'], true, () => {
  console.log('erc20.template file copied successfully!');
});
