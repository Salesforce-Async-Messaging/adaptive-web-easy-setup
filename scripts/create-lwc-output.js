#!/usr/bin/env node

/**
 * Script to create lwc-sdk-output.js from lwc-app and controller output
 * This creates function wrappers around the build files for LWC version.
 * 
 * Looks for:
 *   - lwc-app/dist/lwc-app.js
 *   - controller/dist/adaptive-web-controller.js (or controller/adaptive-web-controller.js as fallback)
 * 
 * Usage: npm run output:lwc
 * Direct: node scripts/create-lwc-output.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function createLwcOutput() {
  try {
    // Paths
    const rootDir = path.join(__dirname, '..');
    const lwcAppDir = path.join(rootDir, 'lwc-app');
    const controllerDir = path.join(rootDir, 'controller');
    const lwcAppDistDir = path.join(rootDir, 'lwc-app', 'dist');
    const controllerDistDir = path.join(rootDir, 'controller', 'dist');
    const controllerRootDir = path.join(rootDir, 'controller');
    const outputDistDir = path.join(rootDir, 'dist');
    
    // Ensure output dist directory exists
    if (!fs.existsSync(outputDistDir)) {
      fs.mkdirSync(outputDistDir, { recursive: true });
    }
    
    // Build controller first
    console.log('🔨 Building controller...');
    try {
      execSync('npm run build', { 
        cwd: controllerDir, 
        stdio: 'inherit',
        env: { ...process.env }
      });
      console.log('✅ Controller build completed');
    } catch (error) {
      console.error('❌ Error building controller:', error.message);
      process.exit(1);
    }
    
    // Build LWC app
    console.log('🔨 Building LWC app...');
    try {
      // Check if node_modules exists, if not run npm install
      if (!fs.existsSync(path.join(lwcAppDir, 'node_modules'))) {
        console.log('📦 Installing LWC app dependencies...');
        execSync('npm install', { 
          cwd: lwcAppDir, 
          stdio: 'inherit',
          env: { ...process.env }
        });
      }
      
      execSync('npm run build', { 
        cwd: lwcAppDir, 
        stdio: 'inherit',
        env: { ...process.env }
      });
      console.log('✅ LWC app build completed\n');
    } catch (error) {
      console.error('❌ Error building LWC app:', error.message);
      process.exit(1);
    }
    
    const lwcAppPath = path.join(lwcAppDistDir, 'lwc-app.js');
    // Try controller/dist first, then fall back to controller root
    const controllerPathInDist = path.join(controllerDistDir, 'adaptive-web-controller.js');
    const controllerPathInRoot = path.join(controllerRootDir, 'adaptive-web-controller.js');
    const controllerPath = fs.existsSync(controllerPathInDist) ? controllerPathInDist : controllerPathInRoot;
    const outputPath = path.join(outputDistDir, 'lwc-sdk-output.js');

    // Check if lwc-app.js exists
    if (!fs.existsSync(lwcAppPath)) {
      console.error('❌ Error: lwc-app/dist/lwc-app.js not found!');
      console.log('💡 Make sure to build the LWC app first: cd lwc-app && npm run build');
      process.exit(1);
    }

    // Check if controller.js exists
    if (!fs.existsSync(controllerPath)) {
      console.error('❌ Error: controller output not found!');
      console.log('💡 Expected locations:');
      console.log(`   - ${controllerPathInDist}`);
      console.log(`   - ${controllerPathInRoot}`);
      console.log('💡 Make sure to build the controller first: cd controller && npm run build');
      process.exit(1);
    }

    // Read lwc-app.js contents
    console.log(`📖 Reading ${lwcAppPath}...`);
    const lwcAppContents = fs.readFileSync(lwcAppPath, 'utf8');

    // Read controller.js contents
    console.log(`📖 Reading ${controllerPath}...`);
    const controllerContents = fs.readFileSync(controllerPath, 'utf8');

    // Create the function wrappers with window exports
    const loaderContent = `function addControllerToPage() {
  // Contents of build file (controller/adaptive-web-controller.js)
${controllerContents}
}

function addAppToPage() {
  // Contents of build file (lwc-app/dist/lwc-app.js)
${lwcAppContents}
}

// Export functions to window for global access
window.addControllerToPage = addControllerToPage;
window.addAppToPage = addAppToPage;
`;

    // Write the new file
    console.log('✍️  Creating lwc-sdk-output.js...');
    fs.writeFileSync(outputPath, loaderContent);

    // Get file stats
    const stats = fs.statSync(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log('✅ Successfully created lwc-sdk-output.js!');
    console.log(`📁 Location: ${outputPath}`);
    console.log(`📏 File size: ${fileSizeKB}KB`);
    console.log('');
    console.log('🚀 Usage:');
    console.log('   • Include in HTML: <script src="dist/lwc-sdk-output.js"></script>');
    console.log('   • Call functions: addControllerToPage() and addAppToPage()');
    console.log('   • Regenerate: npm run output:lwc');

  } catch (error) {
    console.error('❌ Error creating lwc-sdk-output:', error.message);
    process.exit(1);
  }
}

// Run the script
createLwcOutput();
