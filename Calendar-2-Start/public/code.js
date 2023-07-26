var currYear;
var currMonth;

var currYearNumber;
var currMonthNumber;
let dateHidden = true;

const date = new Date();
const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};
const formattedDate = date.toLocaleDateString('en-US', options);

document.getElementById('dispDate').textContent = formattedDate;

window.addEventListener('DOMContentLoaded', function () {
    // var nextBtn = this.document.getElementById('next');
    // var prevBtn = this.document.getElementById('prev');

    let submitCalInput = this.document.querySelector('#bdaymonth');
    

    var year = new Date().getFullYear();
    currYear = year;
    var month = new Date().getMonth();
    month = month + 1;

    if(month > 9){
      var m = month;
    }
    else{
      var m = "0" + month;
    }
    currMonth = m;

    const cookieExists = document.cookie.split(';').some(cookie => cookie.trim().startsWith('lastPostDate='));

    if(cookieExists){
      let lastPostDate = document.cookie.split(';')
      .find(cookie => cookie.trim().startsWith('lastPostDate='))
      .split('=')[1];
  
      if (lastPostDate != 'j%3Anull' && lastPostDate.length == 10 && lastPostDate.substring(4,5) == '-' && lastPostDate.substring(7,8) == '-')  {
      
        submitCalInput.value = lastPostDate.substring(0,4) + "-" + lastPostDate.substring(5,7);
          currYear = lastPostDate.substring(0,4);
          currMonth = lastPostDate.substring(5,7);
          //console.log('Cookie:', lastPostDate);
          PrintCalendar(lastPostDate.substring(0,4));
      }
      else {
        submitCalInput.value = year + "-" + m;
        //console.log('Last Post Date cookie not found.');
        PrintCalendar(year);
        
      }
    }
    else {
      submitCalInput.value = year + "-" + m;
      //console.log('Last Post Date cookie not found.');
      PrintCalendar(year);
      
    }

    HideRest();


  });


  document.querySelector('#submit').addEventListener('click',function(){
    let submitCalInput = this.document.querySelector('#bdaymonth'); 
    if(currYear != (submitCalInput.value).substring(0,4)){
      currYear = (submitCalInput.value).substring(0,4);
      PrintCalendar((submitCalInput.value).substring(0,4));
    }

    if(currMonth != (submitCalInput.value).substring(5)){
      currMonth = (submitCalInput.value).substring(5);
      HideRest();
    }
  });


  document.querySelector('#next').addEventListener('click', function(){
    var input = document.getElementById('bdaymonth');
    var currentValue = input.value;

    var currentYear = parseInt(currentValue.substring(0, 4));
    var currentMonth = parseInt(currentValue.substring(5));

    var nextMonth = currentMonth + 1;
    var nextYear = currentYear;

    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }

    if (nextMonth < 10) {
      nextMonth = '0' + nextMonth;
    }

    var nextValue = nextYear + '-' + nextMonth;
    input.value = nextValue;
    var lastYear = currYear;
    currYear = nextYear;
    currMonth = nextMonth;

    if(lastYear != currYear){
      PrintCalendar(currYear);
    }
    
    HideRest();
  });

  document.querySelector('#prev').addEventListener('click', function(){
    var input = document.getElementById('bdaymonth');
    var currentValue = input.value;

    var currentYear = parseInt(currentValue.substring(0, 4));
    var currentMonth = parseInt(currentValue.substring(5));

    var prevMonth = currentMonth - 1;
    var prevYear = currentYear;

    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear--;
    }

    if (prevMonth < 10) {
      prevMonth = '0' + prevMonth;
    }

    var prevValue = prevYear + '-' + prevMonth;
    input.value = prevValue;
    var lastYear = currYear;
    currYear = prevYear;
    currMonth = prevMonth;

    if(lastYear != currYear){
      PrintCalendar(currYear);
    }

    HideRest();


  });


  function PrintCalendar(year){
    var dateObj = new Date();
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var y = dateObj.getFullYear();


  this.fetch('/calendar/events/' + year)
    .then(res => res.json())
    .then(data => {
      //console.log(data);




    var spans = document.getElementsByTagName('span');

    Array.from(spans).forEach(function (span) {
      span.remove();
    });
    
    
    var brs = document.getElementsByTagName('br');
    
    Array.from(brs).forEach(function (br) {
      br.remove();
    });
    
    var innerDivs = document.getElementsByClassName('inner-div');
    Array.from(innerDivs).forEach(function (inner) {
      inner.remove();
    });
    

    var start = new Date(year, 0, 1).getDay();

    for(var i = 0; i < document.querySelectorAll(".mon").length; i++){
      var yearElement = document.createElement('span');
      yearElement.textContent = currYear;
      yearElement.setAttribute('id','year');
      document.querySelectorAll(".mon > h1")[i].appendChild(yearElement);
      PrintDayLabel(document.querySelectorAll(".mon")[i]);
      var brk = document.createElement('br');
      document.querySelectorAll(".mon")[i].appendChild(brk);
    
      
    
      var daysInMonth = new Date(year, i + 1, 0).getDate();
      var spaced = false;
      var daysGroup = document.createElement('div');
      daysGroup.innerHTML = "";
      for(var j = 1; j <= daysInMonth; j++){
        if(spaced === false){
          var spaceElement = document.createElement('div');
          spaceElement.classList.add('inner-div');
    
          spaceElement.classList.add('start' + start);
          document.querySelectorAll(".mon")[i].appendChild(spaceElement);
          spaced = true;
        }
    
        start = (start + 1) % 7;
        
        
        var dayElement = document.createElement('span');
    
    
        
        if(month == i){
          if(currYear == y){
            if(date == j){
              dayElement.classList.add('today');
            }
          }
        }
    


        let monthNum = i + 1;
        const constructedDate = currYear + "-" + (monthNum % 10 == monthNum ? '0' + monthNum : monthNum) + "-" + (j % 10 == j ? '0' + j : j);

        const match = data.find((obj) => {
          return (obj.date === constructedDate)
        });

        if(match) {
          dayElement.classList.add('svgStyle');


        const tooltipWrapper = document.getElementById('tooltipWrapper');

        const tooltip = document.getElementById('tooltip');
        const tooltipTitle = document.getElementById('tooltipTitle');
        const tooltipContent = document.getElementById('tooltipContent');

        let tooltipTimer;

        dayElement.addEventListener('mouseenter', (event) => {
            //console.log(event);
            clearTimeout(tooltipTimer);

            const dayElementRect = event.target.getBoundingClientRect();
            //console.log(dayElementRect);
            const tooltipTop = dayElementRect.top - 120 + window.scrollY - 12;
            const tooltipLeft = dayElementRect.left + window.scrollX - ((150 - dayElementRect.width) / 2);
            //console.log(dayElementRect.width);

            const title = match.title;
            const content = match.content;
        
            tooltipTitle.textContent = title;
            tooltipContent.textContent = content;


            tooltipWrapper.style.top = `${tooltipTop}px`;
            tooltipWrapper.style.left = `${tooltipLeft}px`;
            tooltipWrapper.classList.remove('hidden');

          });

          
        
          dayElement.addEventListener('mouseleave', (event) => {


            //console.log(event.relatedTarget);
            if(event.relatedTarget != tooltip) {
              tooltipTimer = setTimeout(hideTooltip, 700);
            }
            

            
          });

          function hideTooltip() {
            tooltipWrapper.classList.add('hidden');
          }

          
          tooltipWrapper.addEventListener('mouseenter', (event) => {
            //console.log(event);
            clearTimeout(tooltipTimer);
          });
          
          tooltipWrapper.addEventListener('mouseleave', () => {
            tooltipTimer = setTimeout(hideTooltip, 700);
          });
        }

        dayElement.textContent = j;

    
              const popup = document.getElementById('popup');
    
              dayElement.addEventListener('contextmenu', (event) => {
                event.preventDefault();
    
    
              let dateElement = popup.querySelector('input[name="dateData"]');
    
              let dateNum = event.target.innerText;
              //console.log("dateNum : " + dateNum);
              const num = Number(event.target.textContent);
              dateNum = num % 10 == num ? '0' + dateNum : dateNum;
              dateElement.value = (currYear + "-" + currMonth + "-" + dateNum);

                //console.log(dateElement.value);

                const dayElementRect = event.target.getBoundingClientRect();
                //console.log(dayElementRect);
                
                showPopup(dayElementRect.top + window.scrollY - ((122 - dayElementRect.height) / 2) , dayElementRect.left + dayElementRect.width + 10 + window.scrollX);
              });

              
    
              function showPopup(x, y) {
              popup.style.top = `${x}px`;
              popup.style.left = `${y}px`;
              popup.classList.remove('hidden');
              }
    
    
              document.addEventListener('click', (event) => {
                const isClickedInsidePopup = popup.contains(event.target);
                const isClickedInsideCalendar = event.target.closest('.calendar');
              
                if (!isClickedInsidePopup && !isClickedInsideCalendar) {
                  let txt = popup.querySelector('input[name="eventTitle"]');
                  let area = popup.querySelector('textarea[name="eventDescription"]');
                  txt.value = '';
                  area.value = '';
                  hidePopup();
                }
              });
    
              function hidePopup() {
                popup.classList.add('hidden');
              }
    
    
        dayElement.addEventListener('click', function(){
          if(dateHidden){
            document.querySelector('#dispDatediv').classList.remove('hidden');
            dateHidden = false;
          }
          var d = new Date(currYear + "-" + currMonth + "-" + this.textContent);
    
          const options = {
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric', 
          };
          const formattedDate = d.toLocaleDateString('en-US', options);
          
          document.getElementById('dispDate').textContent = formattedDate;
    
          toggleShading(this);
    
        });
    
        dayElement.classList.add("shadable-button");
    
        document.querySelectorAll(".mon")[i].appendChild(dayElement);
        
    
        if (start === 0) {
          document.querySelectorAll(".mon")[i].appendChild(document.createElement('br'));
        }
      }
    
    }

  });
}




  function toggleShading(button) {
    const shadedButtons = document.querySelectorAll('.shadable-button');
    
    shadedButtons.forEach(btn => {
      if (btn === button) {
        btn.classList.add('shaded');
      } else {
        btn.classList.remove('shaded');
      }
    });
  }




  function PrintDayLabel(obj){
    var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

    for(var i = 0; i < days.length; i++){
      var dayLbl = document.createElement('span');
      dayLbl.textContent = days[i] + '  ';
      dayLbl.id = "days";
      obj.appendChild(dayLbl);
    }
  }


  function HideRest(){
    var monToKeep = InputDayToMonth(document.querySelector('#bdaymonth').value);
    for(var i = 0; i < document.querySelectorAll('.mon').length; i++){
      document.querySelectorAll('.mon')[i].classList.add('invisibl');
    }
    document.querySelector("." + monToKeep).classList.remove('invisibl');
  }

  function InputDayToMonth(date){
    switch (date.substring(5)) {
      case "01":
        return "jan";
      break;
      case "02":
        return "feb";
      break;
      case "03":
        return "mar";
      break;

      case "04":
        return "apr";
      break;
      case "05":
        return "may";
      break;
      case "06":
        return "jun";
      break;
      case "07":
        return "jul";
      break;
      case "08":
        return "aug";
      break;
      case "09":
        return "sep";
      break;
      case "10":
        return "oct";
      break;
      case "11":
        return "nov";
      break;
      case "12":
        return "dec";
      break;

      default:
        break;
    }
  }
  
  document.getElementById('calendar').classList.add('invisibl');

  