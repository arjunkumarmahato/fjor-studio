const fs = require('fs');
const path = require('path');

const dir = 'e:/FJOR/fjor-studio/src';

function walkDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.scss')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace #ffffff and #fff with var(--color-text-primary)
      const newContent1 = content.replace(/#ffffff|#fff(?!a-fA-F0-9)/gi, 'var(--color-text-primary)');
      if (newContent1 !== content) {
        content = newContent1;
        changed = true;
      }

      // Replace #040404 with var(--color-bg-primary)
      const newContent2 = content.replace(/#040404/gi, 'var(--color-bg-primary)');
      if (newContent2 !== content) {
        content = newContent2;
        changed = true;
      }

      // Replace #ededed with var(--color-text-primary)
      const newContent3 = content.replace(/#ededed/gi, 'var(--color-text-primary)');
      if (newContent3 !== content) {
        content = newContent3;
        changed = true;
      }
      
      // Replace #1a1d2e with var(--color-bg-tertiary)
      const newContent4 = content.replace(/#1a1d2e/gi, 'var(--color-bg-tertiary)');
      if (newContent4 !== content) {
        content = newContent4;
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walkDir(dir);
console.log('Done replacing colors.');
