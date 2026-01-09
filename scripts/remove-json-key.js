const fs = require('fs');
const path = require('path');

// 获取命令行参数
const targetKey = process.argv[2];
const targetDir = process.argv[3] ? path.resolve(process.argv[3]) : path.join(__dirname, '../messages');

if (!targetKey) {
  console.error('❌ 请指定要删除的 Key.\n用法: node scripts/remove-json-key.js <keyName> [directory]');
  process.exit(1);
}

// 递归删除对象中的 Key
function removeKeyRecursively(obj, keyToRemove) {
  let removedCount = 0;

  if (Array.isArray(obj)) {
    obj.forEach(item => {
      removedCount += removeKeyRecursively(item, keyToRemove);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    // 检查当前层级是否包含该 Key
    if (obj.hasOwnProperty(keyToRemove)) {
      delete obj[keyToRemove];
      removedCount++;
    }

    // 递归检查子属性
    Object.keys(obj).forEach(k => {
      removedCount += removeKeyRecursively(obj[k], keyToRemove);
    });
  }

  return removedCount;
}

// 获取所有 JSON 文件
let files = [];
try {
    files = fs.readdirSync(targetDir).filter(f => f.endsWith('.json'));
} catch (e) {
    console.error(`❌ 无法读取目录: ${targetDir}`, e.message);
    process.exit(1);
}

console.log(`🔍 正在从 ${targetDir} 中的 ${files.length} 个文件删除 Key: "${targetKey}"...
`);

let totalRemoved = 0;

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(raw);
    
    const count = removeKeyRecursively(content, targetKey);

    if (count > 0) {
      // 保持 JSON 格式美观
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
      console.log(`✅ [${file}] 删除了 ${count} 处`);
      totalRemoved += count;
    } else {
      // console.log(`⚪ [${file}] 未找到`);
    }
  } catch (e) {
    console.error(`❌ [${file}] 处理失败:`, e.message);
  }
});

console.log(`\n🎉 完成！共删除了 ${totalRemoved} 个 "${targetKey}" 键值对。`);
