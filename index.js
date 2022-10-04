const { program } = require('commander');
const download = require('download-git-repo');
const ora = require('ora');
// const fs = require('fs');
const path = require('path');
const packageData = require('./package.json');

const validateDest = require('./utils/validate-dest');

// 提示命令行用法
program
  .version(packageData.version, '-v, -V', 'output the current version')
  .usage('[template-name] <project-name>')
  .option('-d, --domain <d>', 'change your repo domain');
// 解析program
program.parse();

let repo = '';
let dir = process.cwd();
let dest = '';
let domain = 'https://github.com';

let args = program.args;
let opts = program.opts();
if (args.length < 2) {
  // 如果参数只有1个，默认下载示例模版到目标目录
  repo = `${domain}:molychn/temp-app`;
  dest = path.join(dir, args[0]);
} else {
  // 多参数的情况下判断domain的配置
  domain = opts.domain ? opts.domain : domain;
  repo = `${domain}:${args[0]}`;
  dest = path.join(dir, args[1]);
}

if (validateDest(dest)) {
  console.log('file path exist, check your project dirname please');
  return;
}

const spinner = ora('downloading template');
spinner.start();
download(repo, dest, { clone: true }, (err) => {
  if (err) return err;
  spinner.stop(`cd ${args[0]} and npm or pnpm install`);
});
