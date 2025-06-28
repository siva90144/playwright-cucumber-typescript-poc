import * as fs from 'fs-extra';

try {
  fs.ensureDirSync('test-results');
  fs.emptyDirSync('test-results');
} catch (error) {
  console.log('Folder not created! ' + error);
}
