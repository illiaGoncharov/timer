const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Создаем глобальную переменную для хранения идентификатора интервала
let intervalID = null;

const createTimerAnimator = () => {
  return (seconds) => {
    // Очищаем интервал, если он уже был запущен 
    clearInterval(intervalID);

    // Вычесляем время окончания таймера 
    const endTime = Date.now() + seconds * 1000;

    const updateTimer = () => {
      // Вычисляем оставшееся время
      const remainingTime = Math.max(0, endTime - Date.now());
      // Проверяем, если время вышло и очищаем интервал
      if (remainingTime === 0) {
        clearInterval(intervalID);
        intervalID = null;
        buttonEl.disabled = false;
        buttonEl.textContent = 'Старт';
        timerEl.textContent = "0:00:00";
        return;
      }
      // Вычисляем кол-во оставшихся минут, секунд и долей 
      const remainingSeconds = Math.floor(remainingTime / 1000);
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingMilliseconds = remainingTime % 1000;
      const remainingHundredths = Math.floor(remainingMilliseconds / 10);

      // Отображаем оставшееся время на странице 
      timerEl.textContent = `${remainingMinutes}:${String(remainingSeconds % 60).padStart(2, '0')}:${String(remainingHundredths).padStart(2, '0')}`;
    } 

    // Обновляем таймер в первый раз и запускаем интервал
    updateTimer();
    intervalID = setInterval(updateTimer, 100);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
    inputEl.value = inputEl.value.replace(/[^\d]/g, '');
});

buttonEl.addEventListener('click', () => {
  // Проверяем, если таймер уже запущен и очищаем его в этом случае 
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
    buttonEl.textContent = 'Старт';
    return;
  }

  const seconds = Number(inputEl.value);

  animateTimer(seconds);
  inputEl.value = '';

  buttonEl.textContent = 'Стоп';
});
