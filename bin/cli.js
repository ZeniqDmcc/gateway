#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
// eslint-disable-next-line no-undef
const repoName = process.argv[2];
const checkoutCommand = `git clone --depth 1 https://github.com/EngAhmedMahmoud/nodejs-ts-starter ${repoName}`;
const installDependancies = `cd ${repoName} && yarn install`;
console.log(`🏗️  👷👷 Cloning the repository with name ${repoName} 👷👷 🏗️`);
const checkout = runCommand(checkoutCommand);
// eslint-disable-next-line no-undef
if (!checkout) process.exit(-1);
console.log(`🔨🔨🔨 Installing the dependancies 🔨🔨🔨`);
const installPackages = runCommand(installDependancies);
// eslint-disable-next-line no-undef
if (!installPackages) process.exit(-1);
console.log(
  `✅✅✅ Congratulation!! 🚀🚀🚀🚀🚀 You are ready just follow the following command to start \n
  cd ${repoName} && yarn start
  `
);
