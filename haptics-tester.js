// haptics-tester.js

let gamepad = null;

// 持续轮询直到检测到第一个手柄
function initGamepad() {
  const poll = setInterval(() => {
    const gps = navigator.getGamepads();
    if (gps[0]) {
      gamepad = gps[0];
      clearInterval(poll);
      console.log('Gamepad connected:', gamepad.id);
    }
  }, 400);
}
initGamepad();

// 按钮与滑块元素
const gripBtn = document.getElementById('gripTest');
const gripSlider = document.getElementById('gripIntensity');
const triggerBtn = document.getElementById('triggerTest');
const triggerSlider = document.getElementById('triggerIntensity');

// 握把振动触发
gripBtn.addEventListener('click', () => {
  if (!gamepad || !gamepad.vibrationActuator.effects.includes('dual-rumble')) return;
  gamepad.vibrationActuator.playEffect('dual-rumble', {
    startDelay: 0,
    duration: 1000,
    weakMagnitude: parseFloat(gripSlider.value),
    strongMagnitude: parseFloat(gripSlider.value)
  });
});

// 扳机振动触发
triggerBtn.addEventListener('click', () => {
  if (!gamepad || !gamepad.vibrationActuator.effects.includes('trigger-rumble')) return;
  gamepad.vibrationActuator.playEffect('trigger-rumble', {
    startDelay: 0,
    duration: 1000,
    leftTrigger: parseFloat(triggerSlider.value),
    rightTrigger: parseFloat(triggerSlider.value)
  });
});
