const button = document.getElementById("runButton");

let result; //結果
//距離の変数
let distance_km;
//ペースの変数
let pace_minute;
let pace_second;
//時間の変数
let time_hour;
let time_minute;
let time_second;

/***********Function Definition***********/
function transfer_hhmmssToSs(hour,minute,second) {
    return hour*3600 + minute*60 + second;
}
/***********[END]Function Definition***********/


button.addEventListener("click", () => {
    pace_minute = document.getElementById("inputDistanceModePace_minute").valueAsNumber;
    pace_second = document.getElementById("inputDistanceModePace_second").valueAsNumber;

    time_hour = document.getElementById("inputDistanceModeTime_hour").valueAsNumber;
    time_minute = document.getElementById("inputDistanceModeTime_minute").valueAsNumber;
    time_second = document.getElementById("inputDistanceModeTime_second").valueAsNumber;

    result =  transfer_hhmmssToSs(time_hour,time_minute,time_second) / transfer_hhmmssToSs(0,pace_minute,pace_second) 

    console.log(result);
    document.getElementById("output").textContent = result +"km";

});