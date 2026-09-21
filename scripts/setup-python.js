const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.env.VERCEL || process.env.CI) {
  console.log('Vercel/CI environment detected: skipping local Python environment setup.');
  process.exit(0);
}

const venvDir = path.join(process.cwd(), 'venv');
const isWindows = os.platform() === 'win32';
// Fallback to python if python3 is not available (common on Windows)
const pythonCmd = isWindows ? 'python' : 'python3';

try {
  if (!fs.existsSync(venvDir)) {
    console.log('Creating Python virtual environment...');
    try {
      execSync(`${pythonCmd} -m venv venv`, { stdio: 'inherit' });
    } catch (e) {
      // If python3 fails on mac/linux, try python
      if (!isWindows) {
        console.log('python3 failed, trying python...');
        execSync(`python -m venv venv`, { stdio: 'inherit' });
      } else {
        throw e;
      }
    }
  }

  console.log('Installing Python dependencies...');
  const pipPath = path.join(venvDir, isWindows ? 'Scripts' : 'bin', 'pip');
  execSync(`"${pipPath}" install -r requirements.txt`, { stdio: 'inherit' });
  
  console.log('Python setup complete.');
} catch (error) {
  console.error('Failed to setup Python environment:', error.message);
  console.log('Please ensure Python 3 is installed and accessible in your PATH.');
}
