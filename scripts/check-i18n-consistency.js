const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const enPath = path.join(messagesDir, 'en.json');

// 读取基准文件
let enContent;
try {
  enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
} catch (e) {
  console.error('❌ 无法读取基准文件 en.json:', e.message);
  process.exit(1);
}

// 递归获取所有键的函数
function getAllKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((res, el) => {
    const newKey = prefix ? `${prefix}.${el}` : el;
    if (Array.isArray(obj[el])) {
        // 对于数组，我们只检查第一项的结构作为代表
        res.push(newKey);
        if (obj[el].length > 0 && typeof obj[el][0] === 'object') {
            const subKeys = getAllKeys(obj[el][0], `${newKey}[0]`);
            res = res.concat(subKeys);
        }
    } else if(typeof obj[el] === 'object' && obj[el] !== null) {
      res = res.concat(getAllKeys(obj[el], newKey));
    } else {
      res.push(newKey);
    }
    return res;
  }, []);
}

const enKeys = new Set(getAllKeys(enContent));

// 获取所有其他语言文件
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

let hasError = false;

console.log('🔍 开始检查语言文件一致性...\n');

files.forEach(file => {
  const filePath = path.join(messagesDir, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const keys = new Set(getAllKeys(content));
    
    // 检查缺失的键 (以英文为准)
    const missingKeys = [...enKeys].filter(k => !keys.has(k));
    
    if (missingKeys.length > 0) {
      hasError = true;
      console.log(`❌ [${file}] 缺失 ${missingKeys.length} 个键:`);
      missingKeys.slice(0, 5).forEach(k => console.log(`  - ${k}`));
      if (missingKeys.length > 5) console.log(`  ... 以及其他 ${missingKeys.length - 5} 个`);
    } else {
      console.log(`✅ [${file}] 结构完整`);
    }

  } catch (e) {
    hasError = true;
    console.error(`❌ [${file}] JSON 格式错误:`, e.message);
  }
});

if (hasError) {
    console.log('\n🚫 检查失败：发现不一致或错误。');
    process.exit(1);
} else {
    console.log('\n✨ 检查通过：所有语言文件结构一致！');
    process.exit(0);
}
