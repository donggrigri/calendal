let stopwatchApp =function(){
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
stopwatchApp();















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
let CalendalApp = function(){
        let calendal = document.getElementById("calendal");
        let today = new Date();//당일 월 계산하기위한 date //usedate
        let month = today.getMonth();
        let year = today.getFullYear();
        let curday = today.getDate();//usedateday

        let todoAppArray = [];
        let todoObj;

        let monthlastnum = [31,28,31,30,31,30,31,31,30,31,30,31];
        const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const monthnames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const colorpicker = ["red","green","coral","pink","#9e47ef","gold","#4286f4"];
        Arraycreate();//각각의 날마다 배열 생성
        initialize(month);//실행시 오늘날짜 정의





        //달력 이동 기능
        function calendalMovable(){//nextback
            let next = document.getElementById("next");
            let back = document.getElementById("back");
            next.addEventListener("click",
                ()=>{moveCalendalBtn(1)}
            )
            back.addEventListener("click",
                ()=>{moveCalendalBtn(-1)}
            )
        }
        //날짜를 인자값으로 받아온후 왼쪽에 날짜와 요일 표시하는함수
        function selectedDay(number){      //days
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
            let content = ev.target.innerHTML;
            let daynumber = parseInt(content);
            selectedDay(daynumber);
            let dayselect = document.querySelectorAll(".daydiv");
            for(let i=0; i<dayselect.length; i++){
                if( dayselect[i].classList.contains("choice") ){
                    dayselect[i].classList.remove("choice");
                    break;
                }
            }
            ev.target.classList.add("choice");
            
            //클릭하면 n번쨰 객체에서 쇼함수 실행 하고 addbtn 실행
            show(month,content-1);
            itemCheck();
        }
//월 변경 후 기존삭제 후 새로 draw
        function moveCalendalBtn(number){
            month += number;
            if(month < 0){
                month = 11;
            }else if(month > 11){
                month = 0;
            }
            calendal.innerHTML='';
            calendalCreate(month);
            fillnum(month);
            calendalTopText(month);
        }


//달력의 상단 text값 설정
        function calendalTopText(month){//monthnameinsert
            let monthname = monthnames[month];
            let navmonth = document.getElementById("monthname");
            navmonth.innerHTML = `${monthname} 2018`;
        }

//달력 일수 + 시작요일위치 만큼 생성 후 시작일부터 클래스네임추가
        function calendalCreate(month){//daycreate
            let startposition = firstdayName(month);
            
            for(let i=0; i < startposition + monthlastnum[month]; i++){
                let el = document.createElement("div");
                
                if(i >= startposition){
                    el.setAttribute('class','daydiv');
                     
                }
                calendal.appendChild(el);
            }

        }

//호출당시의 달의 시작요일 리턴
        function firstdayName(){
            let date = new Date(year,month);
            return date.getDay();
        }

//윤년 확인 후 시작위치부터 달 일수 까지 숫자채워나가면서 이벤트등록
        function fillnum(month){
            let number = 1;
            if( year%4 == 0 && year%100 != 0){
                monthlastnum[1] = 29;
            }
            let calendaldaystart = firstdayName();
            for(let i=0;i<monthlastnum[month];calendaldaystart++,i++){
                calendal.childNodes[calendaldaystart].innerHTML = number;
                calendal.childNodes[calendaldaystart].addEventListener("click",clickev);
                number++;
            }
        }

//초기 구동시 오늘date를 기준으로 달력생성
        function initialize(month){
            calendalCreate(month);
            fillnum(month);
            selectedDay(curday);
            calendalTopText(month);
            calendalMovable();
            show(month,curday-1);
            itemCheck();
            addBtnSetting();
            AllBtnSetting();
            ActiveBtnSetting();
            CompletedBtnSetting();
            let daydiv = document.querySelectorAll(".daydiv");
            daydiv[curday-1].classList.add("choice");
            
        }

        //가지고있는 텍스트 및 밑줄여부 foreach로 나타냄
        function show(month,day){
            todoObj = todoAppArray[month][day];    
            let todoBody = document.getElementsByClassName("todoBody");
            todoBody[0].innerHTML = '';
            todoObj.forEach( (currentValue)=>{
                let p =pTagrender(currentValue);
                let span =spanTagrender(currentValue);
                divTagrender(p,span);
                });
        }
        //foreach 함수에서 사용되는 함수로 각각의obj를 가져와 pTag생성후 값대입
        function pTagrender(currentValue){
            let p = pTag();
            p.innerHTML = currentValue.store;
            if(currentValue.doneCheck){
                p.classList.add("done");
            }
            return p;
        }
        //spanTag 생성
        function spanTagrender(){
            let spanTag = document.createElement("span");
                spanTag.innerHTML = "[ 삭제 ]";
                spanTag.classList.add("delete");
                spanTag.addEventListener('click',(ev)=>{spanTagClickEvFunc(ev,spanTag)});
            return spanTag;
        }
        //div의 자식태그로 p , span 추가
        function divTagrender(p,span){
            let divTag = document.createElement("div");
            let todoBody = document.getElementsByClassName("todoBody");
            divTag.classList.add("itembox");
            divTag.appendChild(p);
            divTag.appendChild(span);
            todoBody[0].appendChild(divTag);
        }
        //pTag 생성시 클릭이벤트 설정에사용하는 함수
        function pTagClickEvFunc(ev,pTag){
            pTag.classList.toggle("done");
            let targetContent = ev.target.innerHTML;
            let indexNum = todoObj.findIndex(doneCheckfind);
            todoObj[indexNum].doneCheck=!todoObj[indexNum].doneCheck;
        
            function doneCheckfind(ele){
                return ele.store==targetContent;
            }
            itemCheck();
        }
        //pTag 생성
        function pTag(){
            let pTag = document.createElement("p");
            pTag.addEventListener('click',(ev)=>{pTagClickEvFunc(ev,pTag)});
            pTag.classList.add("content");
            return pTag;
        }
        //spanTag 생성시 클릭이벤트 설정에 사용되는 함수
        function spanTagClickEvFunc(ev,spanTag){
            let todoBody = document.getElementsByClassName("todoBody");
            let removeIndexnum =todoObj.findIndex(removeText);
            todoObj.splice(removeIndexnum,1);
            todoBody[0].removeChild(spanTag.parentNode);
            itemCheck();
            function removeText(ele){
                return ele.store==spanTag.previousSibling.innerHTML;
            }
        }
        //추가버튼 이벤트설정함수
        function addBtnSetting(){
            let addbtn = document.getElementById("addbtn");
            addbtn.addEventListener('click',
                ()=>{
                    addBtnEventfunc();
                    itemCheck();
                });
        
            
            document.addEventListener('keypress',
                (ev)=>{
                    let keyname = ev.key;
                    if(keyname=="Enter"){
                        addBtnEventfunc();
                        itemCheck();
                    }
                });
            }
        function addBtnEventfunc(){
            let inputObj = document.getElementById("inputObj");
            if( inputObj.value !== ""){
                let p = pTagCreate();
                let span = spanTagrender();
                divTagrender(p,span);
                Objpush();
            }
            function pTagCreate(){
                let p = pTag();
                p.innerHTML = inputObj.value;
                return p;
            }
        }
        //추가버튼 클릭시 실행되는함수로써 생성해놓은배열에 객체를 push함
        function Objpush(){
            todoObj.push({store:inputObj.value,doneCheck:false});
            inputObj.value='';
            console.log(todoObj);
        }
        //done 체크되어있지않은 item 갯수를 체크, 0개일떄는 invisible
            function itemCheck(){
            let count=0;
            let itemleft = document.getElementsByClassName("itemleft");
            let content = document.getElementsByClassName("content");
            for(let i=0; i<content.length; i++){
                if( !content[i].classList.contains("done") ){
                    count++;
                }
            }
            itemleft[0].innerHTML = `${count} item left`;
            let todoFooter = document.getElementsByClassName("todoFooter");
            if(todoObj.length > 0 ) {
                todoFooter[0].classList.remove("invisible");
            }else{
                todoFooter[0].classList.add("invisible");
            }
        }
        //월 일 에 해당하는 배열을 생성
        function Arraycreate(){
            for(let i=0; i<monthlastnum.length;i++){
                todoAppArray[i]=[];
                for(let j=0; j<monthlastnum[i];j++){
                    todoAppArray[i][j]=[];
                    
                }
            }
        }       
        

        
        function AllBtnSetting(){
            let AllBtn = document.getElementById("All");
            AllBtn.addEventListener('click',()=>{
            let itembox = document.getElementsByClassName("itembox");
            for(let i=0; i<itembox.length; i++){
                if(itembox[i].classList.contains("invisible")){
                    itembox[i].classList.remove("invisible");
                }
            }
        })
        }

        function CompletedBtnSetting(){
            let CompletedBtn = document.getElementById("Completed");
            CompletedBtn.addEventListener('click',
                ()=>{
                    let itembox = document.getElementsByClassName("itembox");
                    let content = document.getElementsByClassName("content");
                    for(let i=0; i<itembox.length; i++){
                        if( content[i].classList.contains("done") ){
                            itembox[i].classList.remove("invisible");
                        }else{
                            itembox[i].classList.add("invisible");
                        }
                    }
            })
        }
        function ActiveBtnSetting(){
            let ActiveBtn = document.getElementById("Active");
            ActiveBtn.addEventListener('click',
                ()=>{
                    let itembox = document.getElementsByClassName("itembox");
                    let content = document.getElementsByClassName("content");
                    for(let i=0; i<itembox.length; i++){
                        if( content[i].classList.contains("done") ){
                            itembox[i].classList.add("invisible");
                        }else{
                        itembox[i].classList.remove("invisible");
                        }
                    }
                })
        }
        
        
}
CalendalApp();