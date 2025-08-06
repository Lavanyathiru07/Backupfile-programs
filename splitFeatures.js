const wdioParallel = require('wdio-cucumber-parallel-execution');

wdioParallel.performSetup({
  sourceSpecDirectory: './features/navitaireBAT',
  tmpSpecDirectory: './tmp/features',
  cleanTmpSpecDirectory: true
});