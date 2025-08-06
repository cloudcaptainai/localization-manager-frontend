const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/@duckdb/duckdb-wasm/dist');
const targetDir = path.join(__dirname, '../public');

// Files to copy
const filesToCopy = [
  'duckdb-browser-mvp.worker.js',
  'duckdb-browser-eh.worker.js',
  'duckdb-mvp.wasm',
  'duckdb-eh.wasm'
];

console.log('Copying DuckDB files to public directory...');

filesToCopy.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✓ Copied ${file}`);
    } else {
      console.warn(`⚠ Source file not found: ${file}`);
    }
  } catch (error) {
    console.error(`✗ Failed to copy ${file}:`, error.message);
  }
});

console.log('DuckDB files copy completed.'); 