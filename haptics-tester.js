// haptics-tester.js

// 状态提示
const statusEl = document.getElementById('status');

function showStatus(msg, isError = false) {
  statusEl.textContent = msg;
  statusEl.style.color = isError ? '#c00' : '#080';
}

// 确保在安全上下文中运行
if (!window.isSecureContext) {
  showStatus('请在 HTTPS 或 localhost 环境下打开此页面。', true);
  throw new Error('不安全上下文');
}

// 提示用户先按下按钮以激活手柄
window.addEventListener('gamepadconnected', () => {
  showStatus(`手柄已连接：${navigator.getGamepads()[0].id}`);
});

// 获取并验证手柄和振动支持
function getGamepad() {
  const gp = navigator.getGamepads()[0];
  if (!gp) {
    showStatus('未检测到手柄，请先连接并按下任意按钮。', true);
    return null;
  }
  if (!gp.vibrationActuator) {
    showStatus('当前手柄不支持振动。', true);
    return null;
  }
  return gp;
}

// 测试握把振动
document.getElementById('gripTest').addEventListener('click', () => {
  const gp = getGamepad();
  if (!gp) return;

  const effects = gp.vibrationActuator.effects;
  if (!effects.includes('dual-rumble')) {
    showStatus('当前手柄不支持双马达振动（dual‑rumble）。', true);
    return;
  }

  const intensity = parseFloat(document.getElementById('gripIntensity').value);
  gp.vibrationActuator.playEffect('dual-rumble', {
    startDelay: 0,
    duration: 500,           // 必须 >0
    weakMagnitude: intensity,
    strongMagnitude: intensity
  });
  showStatus('已触发握把振动');
});

// 测试扳机振动
document.getElementById('triggerTest').addEventListener('click', () => {
  const gp = getGamepad();
  if (!gp) return;

  const effects = gp.vibrationActuator.effects;
  if (!effects.includes('trigger-rumble')) {
    showStatus('当前手柄不支持扳机振动（trigger‑rumble）。', true);
    return;
  }

  const intensity = parseFloat(document.getElementById('triggerIntensity').value);
  gp.vibrationActuator.playEffect('trigger-rumble', {
    startDelay: 0,
    duration: 500,            // 必须 >0
    leftTrigger: intensity,
    rightTrigger: intensity
  });
  showStatus('已触发扳机振动');
});
