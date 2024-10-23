$(document).ready(function() {
  // .weekdays 안에 요일(span 태그)을 추가
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
    $("#clock").toggleClass("light dark"); // light와 dark 클래스를 토글
  });


  function updateTime() {
    const now = new Date();

    // 요일 업데이트
    const day = now.getDay();
    $(".weekdays span").removeClass("active").eq(day).addClass("active");

    // 날짜 업데이트
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    $(".date").text(`${year} / ${month} / ${date}`);

    // 시간 업데이트
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    $(".time").text(`${hours}:${minutes}:${seconds}`);
  }

  setInterval(updateTime, 1000);  // 1초마다 시간 업데이트


  // 배터리 상태 업데이트 함수
  function updateBattery() {
    batteryLevel--;
    if (batteryLevel <= 0) {
      batteryLevel = 0;
      $(".display").css({ color: "black",          
				backgroundColor: "black" });  // 배터리가 0%가 되면 시간 숨김
				$(".weekdays").css("visibility", "hidden");  // 요일 숨기기
			} else {
				$(".weekdays").css("visibility", "visible");  // 배터리가 0%가 아니면 요일 다시 보이게
			}
    $(".battery").text(`🔋 배터리: ${batteryLevel}%`);
  }

  setInterval(updateBattery, 1000);  // 1초마다 배터리 감소

 // 충전 버튼 클릭 이벤트: 배터리 100%로 복구
 $(".charging-status").click(function() {
	batteryLevel = 100;
	$(".battery").text(`🔋 배터리: ${batteryLevel}%`); // 배터리 상태 업데이트
	$(".display").css({ color: "", backgroundColor: "" }); // 원래 상태로 복구
	$(".weekdays").css("visibility", "visible");  // 요일 다시 보이게
});

  // 알람 추가 기능
  function addAlarm() {
    if (alarms.length >= maxAlarms) {
      alert('알람은 최대 3개까지 추가 가능합니다.');
      return;
    }

    const alarmTime = alarmTimeInput.value;
    if (alarmTime) {
      alarms.push(alarmTime);
      updateAlarmList();
    }
  }
	

  // 알람 삭제 기능
  function deleteAlarm(index) {
    alarms.splice(index, 1); // 해당 인덱스의 알람을 배열에서 삭제
    updateAlarmList();
  }

  function updateAlarmList() {
    alarmListElement.innerHTML = '';
    alarms.forEach((alarm, index) => {
      const alarmElement = document.createElement('div');
      alarmElement.textContent = `알람 ${index + 1}: ${alarm}`;
			const deleteButton = document.createElement('button');
      deleteButton.textContent = '삭제';
      deleteButton.addEventListener('click', () => deleteAlarm(index));

      alarmElement.appendChild(deleteButton);
      alarmListElement.appendChild(alarmElement);
    });
  }

  document.querySelector('.add-alarm-btn').addEventListener('click', addAlarm);
});