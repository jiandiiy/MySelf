$(document).ready(function() {
  const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekdayHolder = $(".weekdays");

  // 요일 초기화
  weekdayNames.forEach(day => {
    weekdayHolder.append(`<span>${day}</span>`);
  });

  let batteryLevel = 100;
  const alarms = [];
  const maxAlarms = 3;
  const alarmListElement = document.querySelector('.alarm-list');
  const alarmTimeInput = document.querySelector('.alarm-time');

  // 테마 변경 버튼 클릭 이벤트
  $(".button").click(function() {
    $("#clock").toggleClass("light dark");
  });

  function updateTime() {
    const now = new Date();
    const day = now.getDay();
    $(".weekdays span").removeClass("active").eq(day).addClass("active");

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    $(".date").text(`${year} / ${month} / ${date}`);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    $(".time").text(`${hours}:${minutes}:${seconds}`);
  }

  setInterval(updateTime, 1000);

  function updateBattery() {
    batteryLevel--;
    if (batteryLevel <= 0) {
      batteryLevel = 0;
      $(".display").css({ color: "black", backgroundColor: "black"});
$(".weekdays").css("opacity", "0");
    } else {
      $(".weekdays, .date-times").css("opacity", "1"); 
    }
    $(".battery").text(`🔋 배터리: ${batteryLevel}%`);
  }

  setInterval(updateBattery, 1000);

  $(".charging-status").click(function() {
    batteryLevel = 100;
    $(".battery").text(`🔋 배터리: ${batteryLevel}%`);
    $(".display").css({ color: "", backgroundColor: "" });
    $(".weekdays, .date-time").css("opacity", "1");
  });

  // alarms 배열 수정 및 목록 갱신 함수
  function updateAlarms(action, timeOrIndex) {
    if (action === 'add') {
      alarms.push(timeOrIndex);
    } else if (action === 'delete') {
      alarms.splice(timeOrIndex, 1);
    }
    updateAlarmList();
  }

  // 알람 목록 업데이트 함수
  function updateAlarmList() {
    alarmListElement.innerHTML = '';
    alarms.forEach((alarm, index) => {
      const alarmElement = document.createElement('div');
      alarmElement.textContent = `알람 ${index + 1}: ${alarm}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', () => updateAlarms('delete', index));

      alarmElement.appendChild(deleteButton);
      alarmListElement.appendChild(alarmElement);
    });
  }

 
  // 알람 추가 함수
  function addAlarm() {
    if (alarms.length >= maxAlarms) {
      alert('알람은 최대 3개까지 추가 가능합니다.');
      return;
    }

    const alarmTime = alarmTimeInput.value;
    if (alarmTime && !alarms.includes(alarmTime)) {  // 중복 확인
      alarms.push(alarmTime);
      updateAlarmList();
    } else if (alarms.includes(alarmTime)) {
      alert('이미 추가된 알람 시간입니다.');
    }
  }

  // 알람 추가 버튼 클릭 이벤트
  document.querySelector('.add-alarm-btn').addEventListener('click', addAlarm);
});