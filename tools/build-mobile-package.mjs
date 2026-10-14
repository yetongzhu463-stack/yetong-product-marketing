// Deterministic distribution packaging only. This script does not install skills.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skill = 'yetong-product-marketing';
const source = path.join(root, 'skills', skill);
const output = path.join(root, 'mobile');
const check = process.argv.slice(2);
if (check.some(arg => arg !== '--check') || check.length > 1) {
  throw new Error('Usage: node tools/build-mobile-package.mjs [--check]');
}
const files = [
  'SKILL.md',
  'agents/openai.yaml',
  'assets/product-brief.md',
  'references/confirmed-writing-style.md',
  'references/daily-execution.md',
  'references/owner-marketing-method.md',
  'references/reference-copy-structures.md',
  'references/user-method-workflow.md',
  'references/writing-observations.md',
];
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
function inventory(directory, prefix = '') {
  return fs.readdirSync(directory).flatMap(name => {
    const relative = prefix + name;
    const target = path.join(directory, name);
    const info = fs.lstatSync(target);
    if (info.isSymbolicLink()) throw new Error(`Symbolic links are not packaged: ${relative}`);
    return info.isDirectory() ? inventory(target, relative + '/') : [relative];
  }).sort();
}
if (JSON.stringify(inventory(source)) !== JSON.stringify([...files].sort())) {
  throw new Error('Runtime file inventory changed; review and update the explicit packaging list first');
}
const contents = new Map();
for (const name of files) {
  const target = path.join(source, name);
  if (!fs.lstatSync(target).isFile()) throw new Error(`Not a regular file: ${name}`);
  contents.set(name, fs.readFileSync(target));
}
if (!/^---\r?\nname: yetong-product-marketing\r?\n/.test(contents.get('SKILL.md').toString('utf8'))) {
  throw new Error('Unexpected Skill name or frontmatter');
}
const markdown = files.filter(name => name.endsWith('.md'));
let portable = '# 叶童产品营销：完整指令载荷\n\n'
  + '生成标识：mobile-distribution-01。以下8份Markdown原文逐字收录，没有压缩成摘要。\n'
  + '它是供平台原生技能导入或保存时使用的完整内容，不是通用安装器；上传附件、读过链接或记住摘要均不等于安装。\n'
  + '原文中的相对Markdown引用对应本文件同名“BEGIN FILE”区段；按原入口的条件选择对应区段，不需要假定能访问本地目录。\n'
  + 'agents/openai.yaml只是Codex显示元数据，不属于此文本指令；完整9文件原包见同目录ZIP和manifest.json。\n'
  + '若宿主不能完整读取、保存及再次加载这些区段，应报告缺口，不声称原生技能已安装。\n\n';
for (const name of markdown) {
  const text = contents.get(name).toString('utf8');
  portable += `===== BEGIN FILE: ${name} =====\n${text}`;
  portable += `${text.endsWith('\n') ? '' : '\n'}===== END FILE: ${name} =====\n\n`;
}
portable += '===== END OF COMPLETE PAYLOAD: 8 MARKDOWN FILES =====\n';

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'yetong-mobile-build-'));
const fixedTime = new Date('2000-01-01T00:00:00Z');
const members = [];
for (const [name, content] of contents) {
  const member = `${skill}/${name}`;
  const destination = path.join(temporary, member);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content, { mode: 0o644 });
  fs.utimesSync(destination, fixedTime, fixedTime);
  members.push(member);
}
const archivePath = path.join(temporary, `${skill}.zip`);
execFileSync('zip', ['-X', '-q', archivePath, ...members], {
  cwd: temporary,
  env: { ...process.env, TZ: 'UTC' },
});
const archive = fs.readFileSync(archivePath);
const textBytes = Buffer.from(portable, 'utf8');
const generated = new Map([
  ['yetong-product-marketing-full.txt', textBytes],
  ['yetong-product-marketing.zip', archive],
]);
const manifest = {
  schema_version: 1,
  distribution: 'mobile-distribution-01',
  source_skill: skill,
  source_directory: `skills/${skill}`,
  runtime_files: files.map(name => ({ path: name, bytes: contents.get(name).length, sha256: sha(contents.get(name)) })),
  portable_markdown_file_count: markdown.length,
  portable_policy: '8份Markdown原文不改；使用同名区段解析原相对引用；Codex显示元数据只保留在ZIP中',
  artifacts: [...generated].map(([name, content]) => ({ path: name, bytes: content.length, sha256: sha(content) })),
  native_mobile_installation_verified: false,
  note: '文件完整性不等于豆包、WorkBuddy或Grok Bot手机原生安装已通过，须以平台技能库与新对话调用验收。',
};
generated.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));
if (!check.length) fs.mkdirSync(output, { recursive: true });
for (const [name, content] of generated) {
  const destination = path.join(output, name);
  if (check.length) {
    if (!fs.existsSync(destination) || !fs.readFileSync(destination).equals(content)) {
      throw new Error(`Generated artifact differs: mobile/${name}`);
    }
  } else {
    fs.writeFileSync(destination, content);
  }
}
console.log(JSON.stringify({ mode: check.length ? 'check' : 'build', runtime_files: files.length, portable_sections: markdown.length, artifacts: [...generated.keys()], result: 'pass' }));
// Retain the isolated build directory for inspection; it contains only public files.
