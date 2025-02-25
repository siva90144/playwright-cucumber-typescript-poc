import * as fs from 'fs-extra';

try {
  fs.ensureDirSync('test-results');
  fs.emptyDirSync('test-results');
  fs.emptyDirSync('allure-results');
  fs.emptyDirSync('allure-report');
} catch (error) {
  console.log('Folder not created! ' + error);
}
