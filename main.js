const runButton = document.getElementById("runButton");
const modeSelecter = document.getElementById("modeSelects");
let result; //結果
let mode = 1; //選択モードを格納(distance:1,pace:2,time:3)
//距離の変数
let distance_km;
//ペースの変数
let pace_minute;
let pace_second;
//時間の変数
let time_hour;
let time_minute;
let time_second;

/***********初期状態***********/
document.getElementById("distanceModeInput").style.display = "block";
document.getElementById("paceModeInput").style.display = "none";
document.getElementById("timeModeInput").style.display = "none";
/***********[END]初期状態***********/

/***********Function Definition***********/
function transfer_hhmmssToSs(hour,minute,second) {
    return hour*3600 + minute*60 + second;
}

function transfer_ssToHhmmss(second) {
    const result_hour = Math.floor(second / 3600);
    const result_minute = Math.floor((((second / 3600) - result_hour) * 3600) / 60);
    const result_second = Math.floor((((((second / 3600) - result_hour) * 3600) / 60) - result_minute) * 60)
    const result_milisecond = Math.floor((((((((second / 3600) - result_hour) * 3600) / 60) - result_minute) * 60) - result_second) * 100);
     const resultArray = [result_hour,result_minute,result_second,result_milisecond];
    return resultArray;
}
/***********[END]Function Definition***********/

//モードが変わったときのイベントハンドラ
modeSelecter.addEventListener("change", (eventObject) => {
    if(eventObject.target.value == "distance") mode = 1;
    if(eventObject.target.value == "pace") mode = 2;
    if(eventObject.target.value == "time") mode = 3;
    console.log("mode changed " + mode);

    if(mode === 1) { //distanceMode
        document.getElementById("distanceModeInput").style.display = "block";
        document.getElementById("paceModeInput").style.display = "none";
        document.getElementById("timeModeInput").style.display = "none";
    } else if(mode == 2) { //paceMode
        document.getElementById("distanceModeInput").style.display = "none";
        document.getElementById("paceModeInput").style.display = "block";
        document.getElementById("timeModeInput").style.display = "none";
    } else if(mode == 3) { //timeMode
        document.getElementById("distanceModeInput").style.display = "none";
        document.getElementById("paceModeInput").style.display = "none";
        document.getElementById("timeModeInput").style.display = "block";
    }
})

//Distanceモードのイベントハンドラ
runButton.addEventListener("click", () => { 
    if(mode === 1) { //distanceMode
        pace_minute = document.getElementById("inputDistanceModePace_minute").valueAsNumber;
        pace_second = document.getElementById("inputDistanceModePace_second").valueAsNumber;
    
        time_hour = document.getElementById("inputDistanceModeTime_hour").valueAsNumber;
        time_minute = document.getElementById("inputDistanceModeTime_minute").valueAsNumber;
        time_second = document.getElementById("inputDistanceModeTime_second").valueAsNumber;
    
        result = transfer_hhmmssToSs(time_hour,time_minute,time_second) / transfer_hhmmssToSs(0,pace_minute,pace_second);
    
        console.log(result);
        result = Math.floor(result * 1000) / 1000; //小数点以下2桁調整
        document.getElementById("output").textContent = result +"km";
    } else if(mode === 2) { //paceMode 
        distance_km = document.getElementById("inputPaceModeDistance").valueAsNumber;

        time_hour = document.getElementById("inputPaceModeTime_hour").valueAsNumber;
        time_minute = document.getElementById("inputPaceModeTime_minute").valueAsNumber;
        time_second = document.getElementById("inputPaceModeTime_second").valueAsNumber;

        result = transfer_hhmmssToSs(time_hour,time_minute,time_second) / distance_km;
        result = transfer_ssToHhmmss(result);

        console.log(result);
        
        if(result[0] === 0) {
            document.getElementById("output").textContent = result[1] + "'" + result[2] + '"' + result[3] + "/km";
        } else {
            document.getElementById("output").textContent = result[0] + ":" + result[1] + "'" + result[2] + '"' + result[3] + "/km";
        }

    } else if(mode == 3) { //timeMode 
        distance_km = document.getElementById("inputTimeModeDistance").valueAsNumber;

        pace_minute = document.getElementById("inputTimeModePace_minute").valueAsNumber;
        pace_second = document.getElementById("inputTimeModePace_second").valueAsNumber;

        result = transfer_hhmmssToSs(0,pace_minute,pace_second) * distance_km;
        result = transfer_ssToHhmmss(result);
        
        console.log(result);
        
        if(result[0] === 0) {
            document.getElementById("output").textContent = result[1] + "'" + result[2] + '"' + result[3];
        } else {
            document.getElementById("output").textContent = result[0] + ":" + result[1] + "'" + result[2] + '"' + result[3];
        }
    }
    
});