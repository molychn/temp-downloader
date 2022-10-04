const { program } = require('commander');
const download = require('download-git-repo');
const ora = require('ora');
// const fs = require('fs');
const path = require('path');

const validateDest = require('./utils/validate-dest');
// const localPath = require('./utils/local-path');

// const isLocalPath = localPath.isLocalPath;
// const getTemplatePath = localPath.getTemplatePath;

// 提示命令行用法
program
  .version('1.0.0', '-v, -V', 'output the current version')
  .usage('<template-name> <project-name>')
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
  console.log('file path exist');
  return;
}

const spinner = ora('downloading template');
spinner.start();
download(repo, dest, { clone: true }, (err) => {
  spinner.stop();
});
