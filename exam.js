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



function days(number){      //날짜를 인자값으로 받아온후 왼쪽에 날짜와 요일 표시하는함수
    let date= new Date(year, month , number);   
    let num = date.getDay();
    let daysnum = document.getElementById("daysnum");
    let daywrite = document.getElementById("days");
    daywrite.innerHTML = week[num];
    daysnum.innerHTML = number;
    daywrite.style.color=colorpicker[num];
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
    let date = new Date(year,month);
    calendal.innerHTML='';
    daycreate(month);
    draw(month);
    monthnameinsert(month);
}


//달력의 상단 text값 설정
function monthnameinsert(month){
    let monthname = monthnames[month];
    let navmonth = document.getElementById("monthname");
    navmonth.innerHTML=`${monthname} 2018`;
}


//달력 일수 + 시작요일위치 만큼 생성 후 시작일부터 클래스네임추가
function daycreate(month){
    let startposition = dayName(month);
    for(let i=0; i < startposition + monthlastnum[month]; i++){
        let el= document.createElement("div");
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
    let number=1;
    
    if( year%4 == 0 && year%100 != 0){
        monthlastnum[1]=29;
    }

    let daystart = dayName();
    
    for(let i=0;i<monthlastnum[month];daystart++,i++){
        calendal.childNodes[daystart].innerHTML=number;//만들면서 클릭 이벤트 추가?
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
    let dayselect = document.querySelectorAll(".dayselect");
    dayselect[usedateday-1].classList.add("choice");
}
