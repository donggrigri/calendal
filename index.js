let stopwatchapp =function(){
    let now;
    let sum = 0;
    let start = null;
    let startboolean = false;
    let init = document.getElementById("init");
    let startbtn = document.getElementById("start");

    //초기화버튼 클릭이벤트
    init.addEventListener("click", 
        ()=>{
        sum = 0;
        document.getElementById("Timer").innerHTML=timeformat(sum); 
        }
    );


    //스타트버튼 클릭이벤트
    startbtn.addEventListener("click",
        ()=>{
        startboolean=!startboolean;
        toggle(startboolean);
        }
    );

    //boolean값을 받은 후  true ,false 에 따라 now값 할당 interval 삽입 or 제거
    function toggle(bool){
        if(bool){
            now = Date.now();
            start=setInterval(update,80);
            document.getElementById("start").innerHTML="중지"
        }else{
            clearInterval(start);
            document.getElementById("start").innerHTML="시작"
        }
    }
    
    //later-now은 n초만큼 차이가남 그 값을 더해가면서 흐른시간의총합을 format한후 표시함
    function update(){
        let later = Date.now();
            sum += later-now;
            now = Date.now();
        let result = timeformat(sum);
        document.getElementById("Timer").innerHTML=result; 
     }
    
    //흐른시간을 인수로 받은 뒤 date로 변환후 각각 해당값을 얻은 후 2자리미만이면 "0"추가 후 text리턴
     function timeformat(time){
        let timeformmater = new Date(2018, 1, 1, 0, 0, 0, time);
        let hour = timeformmater.getHours().toString();
        let minute = timeformmater.getMinutes().toString();
        let second = timeformmater.getSeconds().toString();
        let millisecond = (timeformmater.getMilliseconds()/10).toFixed(0);//2자리수까지 포현하기위해 10으로나눈후 fixed
        
        if(hour.length < 2){
           hour = "0" + hour;
        }
        if(minute.length < 2){
          minute = "0" + minute;
        }
        if(second.length < 2){
          second = "0" + second;
        }
        return `${hour}:${minute}:${second}.${millisecond}`;
     }
      
}
stopwatchapp();















//  시간에 따라 am pm 변경
//Date.now는 millisecond이므로 Date에 인자로 넣어 현재시간설정 후 get 후 write

let watch = function(){
    let setting= setInterval(
        ()=>{
            let watchnow=new Date(Date.now());
            let APM="AM";
            let hour=watchnow.getHours();
            let minute=watchnow.getMinutes();
            let second=watchnow.getSeconds();

            if(hour > 12 && hour<=24){
                APM="PM";
                hour=hour-12;
            }
            hour=hour.toString();
            minute=minute.toString();
            second=second.toString();
            if(hour.length < 2){
                hour = "0" + hour;
            }
            if(minute.length < 2){
            minute = "0" + minute;
            }
            if(second.length < 2){
            second = "0" + second;
            }

            let watch=document.getElementById("Watch");
            let result=`${APM}: ${hour}:${minute}:${second}`
            watch.innerHTML=result;
    },100);
}
watch();













/* Calendal*/
let CalendalApp = function(){;
        let calendal = document.getElementById("calendal");
        let usedate = new Date();//당일 월 계산하기위한 date
        let month = usedate.getMonth();
        let year = usedate.getFullYear();
        let usedateday = usedate.getDate();

        let monthlastnum = [31,28,31,30,31,30,31,31,30,31,30,31];
        const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const colorpicker = ["red","green","coral","pink","#9e47ef","gold","#4286f4"];
        initialize(month);//실행시 오늘날짜 정의

//달력 이동 기능
        function nextback(){
            let next = document.getElementById("next");
            let back = document.getElementById("back");
            next.addEventListener("click",
                ()=>{btnfunc(1)}
            )
            back.addEventListener("click",
                ()=>{btnfunc(-1)}
            )
        }
//날짜를 인자값으로 받아온후 왼쪽에 날짜와 요일 표시하는함수
        function days(number){      
            let date= new Date(year, month , number);   
            let num = date.getDay();
            let daysnum = document.getElementById("daysnum");
            let daywrite = document.getElementById("days");
            daywrite.innerHTML = week[num];
            daysnum.innerHTML = number;
            daywrite.style.color = colorpicker[num];
        }
//이벤트함수 클릭시 타겟의 text값 int로 변환 후 class추가   
        function clickev(ev){
            let obj = ev.target.innerHTML;
            let receive = parseInt(obj);
            days(receive);
            let dayselect = document.querySelectorAll(".dayselect");
            for(let i=0; i<dayselect.length; i++){
                if( dayselect[i].classList.contains("choice") ){
                    dayselect[i].classList.remove("choice");
                    break;
                }
            }

            ev.target.classList.add("choice");
        }
//월 변경 후 기존삭제 후 새로 draw
        function btnfunc(number){
            month += number;
            if(month < 0){
                month = 11;
            }else if(month > 11){
                month = 0;
            }
            calendal.innerHTML='';
            daycreate(month);
            draw(month);
            monthnameinsert(month);
        }


//달력의 상단 text값 설정
        function monthnameinsert(month){
            let monthname = monthnames[month];
            let navmonth = document.getElementById("monthname");
            navmonth.innerHTML = `${monthname} 2018`;
        }


//달력 일수 + 시작요일위치 만큼 생성 후 시작일부터 클래스네임추가
        function daycreate(month){
            let startposition = dayName(month);
            for(let i=0; i < startposition + monthlastnum[month]; i++){
                let el = document.createElement("div");
                if(i >= startposition){
                    el.setAttribute('class','dayselect');
                }
                calendal.appendChild(el);
            }

        }

//호출당시의 달의 시작요일 리턴
        function dayName(){
            let date = new Date(year,month);
            return date.getDay();
        }

//윤년 확인 후 시작위치부터 달 일수 까지 숫자채워나가면서 이벤트등록
        function draw(month){
            let number = 1;
            if( year%4 == 0 && year%100 != 0){
                monthlastnum[1] = 29;
            }
            let daystart = dayName();
            for(let i=0;i<monthlastnum[month];daystart++,i++){
                calendal.childNodes[daystart].innerHTML = number;//만들면서 클릭 이벤트 추가?
                calendal.childNodes[daystart].addEventListener("click",clickev);
                number++;
            }
        }

//초기 구동시 오늘date를 기준으로 달력생성
        function initialize(month){
            daycreate(month);
            draw(month);
            days(usedateday);
            monthnameinsert(month);
            nextback();
            let dayselect = document.querySelectorAll(".dayselect");
            dayselect[usedateday-1].classList.add("choice");
        }
}
CalendalApp();