// scripts/checkAmplifyConfig.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// 1) Load project-config.json
const projectConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../amplify/.config/project-config.json'), 'utf8')
);

// 2) Load team-provider-info.json
const teamInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../amplify/team-provider-info.json'), 'utf8')
);

// 3) Load amplify-meta.json
const amplifyMeta = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../amplify/#current-cloud-backend/amplify-meta.json'),
    'utf8'
  )
);

// 4) Import aws-exports.js
const awsExports = require('../src/aws-exports').default || require('../src/aws-exports');

// 5) Run CLI commands
let envListOutput = '', statusOutput = '';
try {
  envListOutput = execSync('amplify env list').toString();
} catch (e) {
  envListOutput = e.stdout ? e.stdout.toString() : e.message;
}
try {
  statusOutput = execSync('amplify status').toString();
} catch (e) {
  statusOutput = e.stdout ? e.stdout.toString() : e.message;
}

// Checks
const PASS = chalk.green('✔');
const FAIL = chalk.red('✖');
let allPassed = true;

function check(desc, pass, failDetail = '') {
  if (pass) {
    console.log(`${PASS} ${desc}`);
  } else {
    allPassed = false;
    console.log(`${FAIL} ${desc}${failDetail ? ' — ' + chalk.red(failDetail) : ''}`);
  }
}

// 1. Print project name and appId
console.log(chalk.bold('\nAmplify Project Info:'));
console.log('Project Name:', chalk.cyan(projectConfig.projectName));
if (projectConfig.appId) {
  console.log('App ID:', chalk.cyan(projectConfig.appId));
}

// 2. Check team-provider-info.json AppId
const teamAppId = teamInfo.dev?.awscloudformation?.AppId;
check('team-provider-info.json AppId matches', teamAppId === 'd27uvtfjtw8lzw', `Found: ${teamAppId}`);

// 3. Check amplify-meta.json AmplifyAppId
const metaAppId = amplifyMeta.providers?.awscloudformation?.AmplifyAppId;
check('amplify-meta.json AmplifyAppId matches', metaAppId === 'd27uvtfjtw8lzw', `Found: ${metaAppId}`);

// 4. Check Cognito User Pool and App Client IDs
check('aws-exports.js Cognito User Pool ID matches', awsExports.aws_user_pools_id === 'us-east-1_M1BBamYWR', `Found: ${awsExports.aws_user_pools_id}`);
check('aws-exports.js Cognito App Client ID matches', awsExports.aws_user_pools_web_client_id === 'gn64v4b0', `Found: ${awsExports.aws_user_pools_web_client_id}`);

// 5. Print CLI outputs
console.log('\n' + chalk.bold('amplify env list output:'));
console.log(chalk.gray(envListOutput));
console.log('\n' + chalk.bold('amplify status output:'));
console.log(chalk.gray(statusOutput));

// 6. Summary
console.log('\n' + chalk.bold('Summary:'));
if (allPassed) {
  console.log(chalk.green('All checks passed!'));
} else {
  console.log(chalk.red('Some checks failed—see above.'));
}
