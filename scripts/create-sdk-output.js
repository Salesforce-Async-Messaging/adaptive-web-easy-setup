#!/usr/bin/env node

/**
 * Script to create sdk-output.js from app/dist/app.js and controller output
 * This creates function wrappers around the build files.
 * 
 * Looks for:
 *   - app/dist/app.js
 *   - controller/dist/adaptive-web-controller.js (or controller/adaptive-web-controller.js as fallback)
 * 
 * Usage: npm run output
 * Direct: node scripts/create-sdk-output.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function createSdkOutput() {
  try {
    // Paths - app and controller are in separate directories
    const rootDir = path.join(__dirname, '..');
    const appDir = path.join(rootDir, 'app');
    const controllerDir = path.join(rootDir, 'controller');
    const appDistDir = path.join(rootDir, 'app', 'dist');
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
    
    // Build app (the app links the controller directly via file:../controller,
    // so building the controller above is sufficient — no packing needed)
    console.log('🔨 Building app...');
    try {
      execSync('npm run build', { 
        cwd: appDir, 
        stdio: 'inherit',
        env: { ...process.env }
      });
      console.log('✅ App build completed\n');
    } catch (error) {
      console.error('❌ Error building app:', error.message);
      process.exit(1);
    }
    
    const appPath = path.join(appDistDir, 'app.js');
    // Try controller/dist first, then fall back to controller root
    const controllerPathInDist = path.join(controllerDistDir, 'adaptive-web-controller.js');
    const controllerPathInRoot = path.join(controllerRootDir, 'adaptive-web-controller.js');
    const controllerPath = fs.existsSync(controllerPathInDist) ? controllerPathInDist : controllerPathInRoot;
    const outputPath = path.join(outputDistDir, 'sdk-output.js');

    // Check if app.js exists
    if (!fs.existsSync(appPath)) {
      console.error('❌ Error: app/dist/app.js not found!');
      console.log('💡 Make sure to build the app first: cd app && npm run build');
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

    // Read app.js contents
    console.log(`📖 Reading ${appPath}...`);
    const appContents = fs.readFileSync(appPath, 'utf8');

    // Read controller.js contents
    console.log(`📖 Reading ${controllerPath}...`);
    const controllerContents = fs.readFileSync(controllerPath, 'utf8');

    // Create the function wrappers with window exports
    const loaderContent = `function addControllerToPage() {
  // Contents of build file (controller/adaptive-web-controller.js)
${controllerContents}
}

function addAppToPage() {
  // Contents of build file (app/dist/app.js)
${appContents}
}

// Export functions to window for global access
window.addControllerToPage = addControllerToPage;
window.addAppToPage = addAppToPage;
`;

    // Write the new file
    console.log('✍️  Creating sdk-output.js...');
    fs.writeFileSync(outputPath, loaderContent);

    // Get file stats
    const stats = fs.statSync(outputPath);
    const fileSizeKB = Math.round(stats.size / 1024);

    console.log('✅ Successfully created sdk-output.js!');
    console.log(`📁 Location: ${outputPath}`);
    console.log(`📏 File size: ${fileSizeKB}KB`);
    console.log('');
    console.log('🚀 Usage:');
    console.log('   • Include in HTML: <script src="dist/sdk-output.js"></script>');
    console.log('   • Call functions: addControllerToPage() and addAppToPage()');
    console.log('   • Regenerate: npm run output');

  } catch (error) {
    console.error('❌ Error creating sdk-output:', error.message);
    process.exit(1);
  }
}

// Run the script
createSdkOutput();
