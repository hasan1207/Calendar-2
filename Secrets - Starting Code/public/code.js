var currYear;
var currMonth;

var currYearNumber;
var currMonthNumber;

// window.addEventListener('resize', function() {
//   var contentAboveHeight = document.getElementById('submit').offsetHeight;
//   var absoluteDiv = document.getElementById('calendar');
  
//   absoluteDiv.style.top = contentAboveHeight + 'px';
// });


//window.addEventListener('resize', scaleContents);

// document.querySelector('.p-btn > button').addEventListener('click', (event) => {
//   event.preventDefault();
//   console.log(event.target.textContent);
// });

function scaleContents() {
  var div = document.getElementById('calendar');
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  //var windowHeight = div.offsetWidth;
  //var windowHeight = div.offsetHeight;


  
  // Calculate the scale factor based on the window size
  var scaleFactor = Math.min(windowWidth / 1200, windowHeight / 1000);
  
  // Apply the scale transform
  div.style.transform = 'scale(' + scaleFactor + ')';
}

const date = new Date();
const options = {
  weekday: 'long', // Display the full weekday name (e.g., Sunday)
  day: 'numeric', // Display the numeric day (e.g., 18)
  month: 'long', // Display the full month name (e.g., June)
  year: 'numeric', // Display the full year (e.g., 2023)
};
const formattedDate = date.toLocaleDateString('en-US', options);

document.getElementById('dispDate').textContent = formattedDate;

let apiData = [];

window.addEventListener('DOMContentLoaded', function () {
    // Call the PrintCalendar function with the current year + 1
    var nextBtn = this.document.getElementById('next');
    //nextBtn.textContent = '';
    var prevBtn = this.document.getElementById('prev');
    //prevBtn.textContent = '';
    

    var year = new Date().getFullYear();
    currYear = year;
    var month = new Date().getMonth();
    month = month + 1;
    //this.document.querySelector('#bdaymonth').setAttribute('value',year + '-' + month);
    //var d = year + "-" + month;
    //this.document.querySelector('label').innerHTML = d;

    //currYearNumber = year;
    //currMonthNumber = month;

    /////////////new as of 22nd jul
      ///////////new as of 22nd jul

      // this.fetch('/calendar/events')
      // .then(res => res.json())
      // .then(data => {
      //   apiData = data;
      // });


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
        // Access the value of the "lastPostDate" cookie
        // lastPostDate = document.cookie.split(';')
        //   .find(cookie => cookie.trim().startsWith('lastPostDate='))
        //   .split('=')[1];
      
          this.document.querySelector('#bdaymonth').value = lastPostDate.substring(0,4) + "-" + lastPostDate.substring(5,7);
          currYear = lastPostDate.substring(0,4);
          currMonth = lastPostDate.substring(5,7);
          console.log('Cookie:', lastPostDate);
          PrintCalendar(lastPostDate.substring(0,4), apiData);
      }
      else {
        this.document.querySelector('#bdaymonth').value = year + "-" + m;
        console.log('Last Post Date cookie not found.');
        PrintCalendar(year, apiData);
        
      }
    }
    else {
      this.document.querySelector('#bdaymonth').value = year + "-" + m;
      console.log('Last Post Date cookie not found.');
      PrintCalendar(year, apiData);
      
    }


    // let lastPostDate = document.cookie.split(';')
    // .find(cookie => cookie.trim().startsWith('lastPostDate='))
    // .split('=')[1];

    // if (lastPostDate != 'j%3Anull' && lastPostDate.length == 10 && lastPostDate.substring(4,5) == '-' && lastPostDate.substring(7,8) == '-')  {
    //   // Access the value of the "lastPostDate" cookie
    //   // lastPostDate = document.cookie.split(';')
    //   //   .find(cookie => cookie.trim().startsWith('lastPostDate='))
    //   //   .split('=')[1];
    
    //     this.document.querySelector('#bdaymonth').value = lastPostDate.substring(0,4) + "-" + lastPostDate.substring(5,7);
    //     currYear = lastPostDate.substring(0,4);
    //     currMonth = lastPostDate.substring(5,7);
    //     console.log('Cookie:', lastPostDate);
    //     PrintCalendar(lastPostDate.substring(0,4), apiData);
    // }
    // else {
    //   this.document.querySelector('#bdaymonth').value = year + "-" + m;
    //   console.log('Last Post Date cookie not found.');
    //   PrintCalendar(year, apiData);
      
    // }

    // if(cookieExists){
    //   this.document.querySelector('#bdaymonth').value = lastPostDate.substring(0,4) + "-" + lastPostDate.substring(5,7);
    // }
    // else{
    //   this.document.querySelector('#bdaymonth').value = year + "-" + m;
    // }

    
    //PrintCalendar(year, month);
    //PrintCalendar(year, apiData);

    // async function fetchData() {
    //   try {
    //     const response = await fetch('/calendar/events');
    //     const apiData = await response.json();
    
    //     // You can do further processing with the data here or call another function
    //     //processFetchedData(data);
    //     PrintCalendar(year, month, apiData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // }

    // fetchData();

    HideRest();








  });







  document.querySelector('#submit').addEventListener('click',function(){
    if(currYear != (document.querySelector('#bdaymonth').value).substring(0,4)){
      currYear = (document.querySelector('#bdaymonth').value).substring(0,4);
      //PrintCalendar((document.querySelector('#bdaymonth').value).substring(0,4),(document.querySelector('#bdaymonth').value).substring(5));
      PrintCalendar((document.querySelector('#bdaymonth').value).substring(0,4), apiData);
    }

    if(currMonth != (document.querySelector('#bdaymonth').value).substring(5)){
      currMonth = (document.querySelector('#bdaymonth').value).substring(5);
      HideRest();
    }
  });


  document.querySelector('#next').addEventListener('click', function(){
    //currMonthNumber = currMonthNumber + 1;
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
      PrintCalendar(currYear, apiData);
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
      PrintCalendar(currYear, apiData);
    }

    HideRest();


  });

  // function PrintCalendar(year, apiData){
  //       var date = new Date().getDate();
  //       var month = new Date().getMonth();
  //       //var year = new Date().getFullYear();
  //       var y = new Date().getFullYear();
  //   //document.querySelector('.mon').innerHTML = '';
  //   //document.getElementsByTagName('h1')[0].style.color = 'red';
  //   //document.querySelector(".mon").classList.add("visible");
  //   // for(var i = 0; i < document.querySelectorAll('.mon').length; i++){
  //   //   var singleMonth = document.querySelectorAll('.mon')[i];
  //   //   //PrintDayLabel(singleMonth);
  //   //   singleMonth.
  //   // }


  //   // for(var i = 0; i < document.querySelectorAll('span'); i++){
  //   //   document.querySelectorAll('span')[i].remove();
  //   // }


  //     this.fetch('/calendar/events')
  //       .then(res => res.json())
  //       .then(data => {
  //       apiData = data;
  //       console.log("hasana" + apiData);
  //     });


  //   // function fetchData() {
  //   //   try {
  //   //     const response = await fetch('/calendar/events');
  //   //     apiData = await response.json();
  //   //     console.log(apiData);
  //   //     // You can do further processing with the data here or call another function
  //   //     //processFetchedData(data);
  //   //     //PrintCalendar(year, month, apiData);
  //   //   } catch (error) {
  //   //     console.error('Error fetching data:', error);
  //   //   }
  //   // }

  //   // fetchData();

    
      

  //   var spans = document.getElementsByTagName('span');

  //   // Convert the HTMLCollection to an array and remove each span element
  //   Array.from(spans).forEach(function (span) {
  //     span.remove();
  //   });


  //   var brs = document.getElementsByTagName('br');

  //   // Convert the HTMLCollection to an array and remove each span element
  //   Array.from(brs).forEach(function (br) {
  //     br.remove();
  //   });

  //   var innerDivs = document.getElementsByClassName('inner-div');
  //   Array.from(innerDivs).forEach(function (inner) {
  //     inner.remove();
  //   });

  //   // var brk = document.createElement('br');
  //   //   document.querySelectorAll(".mon")[i].appendChild(brk);
  //   var start = new Date(year, 0, 1).getDay();
  //   //start = start - 1;

  //   //document.querySelector('label').innerHTML = start;
  //   for(var i = 0; i < document.querySelectorAll(".mon").length; i++){
  //     // document.querySelectorAll(".mon")[i].addEventListener("click", function(){
  //     //   //document.getElementsByTagName('h1')[0].style.color = 'red';

  //     // });
  //     var yearElement = document.createElement('span');
  //     yearElement.textContent = currYear;
  //     //yearElement.classList.add('cati');
  //     //yearElement.id = 
  //     yearElement.setAttribute('id','year');
  //     document.querySelectorAll(".mon > h1")[i].appendChild(yearElement);
  //     PrintDayLabel(document.querySelectorAll(".mon")[i]);
  //     var brk = document.createElement('br');
  //     document.querySelectorAll(".mon")[i].appendChild(brk);

      

  //     var daysInMonth = new Date(year, i + 1, 0).getDate();
  //     //var count = 0;
  //     var spaced = false;
  //     var daysGroup = document.createElement('div');
  //     daysGroup.innerHTML = "";
  //     for(var j = 1; j <= daysInMonth; j++){
  //       if(spaced === false){
  //         var spaceElement = document.createElement('div');
  //         spaceElement.classList.add('inner-div');

  //         spaceElement.classList.add('start' + start);
  //         document.querySelectorAll(".mon")[i].appendChild(spaceElement);
  //         spaced = true;
  //       }

  //       start = (start + 1) % 7;
        
        
  //       var dayElement = document.createElement('span');


        
  //       if(month == i){
  //         if(currYear == y){
  //           if(date == j){
  //             dayElement.classList.add('today');
  //           }
  //         }
  //       }


  //       dayElement.textContent = j;

  //       //new again but with api code

  //       let monthNum = i + 1;
  //       const constructedDate = currYear + "-" + (monthNum % 10 == monthNum ? '0' + monthNum : monthNum) + "-" + (j % 10 == j ? '0' + j : j);
  //       console.log(constructedDate);

  //       // const match = apiData.find((obj) => {
  //       //   console.log("constructed date" + constructedDate + " , obj: " + obj);
  //       //   return (obj.date === constructedDate)
  //       // });

  //       // if(match){
  //       //   dayElement.textContent = j + ", " + match.title;
  //       // }


  //       /////////////////////////


  //               /////////////////////new as of 22nd along with oth lnes too
  //             // const popup = document.getElementById('popup');
  //             // const calendarDates = document.querySelectorAll('#calendar > div.jul.mon > span');

  //             // calendarDates.forEach((date) => {
  //             // date.addEventListener('contextmenu', (event) => {
  //             // event.preventDefault();
  //             // showPopup(event.clientX, event.clientY);
  //             // });
  //             // });

  //             // function showPopup(x, y) {
  //             // popup.style.top = `${y}px`;
  //             // popup.style.left = `${x}px`;
  //             // popup.classList.remove('hidden');
  //             // }

              

  //             const popup = document.getElementById('popup');
  //             //const currentDay = "";

  //             dayElement.addEventListener('contextmenu', (event) => {
  //               event.preventDefault();


  //             let dateElement = popup.querySelector('input[name="dateData"]');
  //             //dateElement.value = document.querySelector('.mon > h1').textContent + " " + 
  //             //dateElement.value = currMonth + " " + event.target.textContent + " " + currYear;
  //             //dateElement.value = new Date(currYear + "-" + currMonth + "-" + event.target.textContent);
  //             let dateNum = event.target.textContent;
  //             const num = Number(event.target.textContent);
  //             dateNum = num % 10 == num ? '0' + dateNum : dateNum;
  //             dateElement.value = (currYear + "-" + currMonth + "-" + dateNum);

  //               //console.log(event.target.textContent);
  //               console.log(dateElement.value);
  //               //
  //               showPopup(event.clientX, event.clientY);
  //               //currentDay = dayElement.textContent;
  //             });

  //             function showPopup(x, y) {
  //             popup.style.top = `${y}px`;
  //             popup.style.left = `${x}px`;
  //             popup.classList.remove('hidden');
  //             }


  //             document.addEventListener('click', (event) => {
  //               // Check if the clicked element is inside the popup or the calendar
  //               const isClickedInsidePopup = popup.contains(event.target);
  //               const isClickedInsideCalendar = event.target.closest('.calendar');
              
  //               // If the clicked element is outside both the popup and the calendar, hide the popup
  //               if (!isClickedInsidePopup && !isClickedInsideCalendar) {
  //                 let txt = popup.querySelector('input[name="eventTitle"]');
  //                 let area = popup.querySelector('textarea[name="eventDescription"]');
  //                 txt.value = '';
  //                 area.value = '';
  //                 hidePopup();
  //               }
  //             });

  //             function hidePopup() {
  //               popup.classList.add('hidden');
  //             }

  //             // document.querySelector('body').addEventListener('click', (event) => {
  //             //   popup.classList.add('hidden');
  //             //   console.log("clicked doc");
  //             // });









  //           // document.querySelector("#popup form").addEventListener('submit', (event) => {
  //           //   let dateElement = popup.querySelector('input[name="dateData"]');
  //           //   //dateElement.value = document.querySelector('.mon > h1').textContent + " " + 
  //           //   dateElement.value = currMonth + " " + currentDay + " " + currYear;
  //           // });


  //       //////////////////////

  //       dayElement.addEventListener('click', function(){
  //         //document.getElementById('dispDate').textContent = 
  //         var d = new Date(currYear + "-" + currMonth + "-" + this.textContent);

  //         const options = {
  //           weekday: 'long', 
  //           day: 'numeric', 
  //           month: 'long',
  //           year: 'numeric', 
  //         };
  //         const formattedDate = d.toLocaleDateString('en-US', options);
          
  //         document.getElementById('dispDate').textContent = formattedDate;

  //         if(this.style.backgroundColor == "#0d6efd"){
  //           //document.getElementById('dispDate').textContent = document.getElementById('dispDate').textContent.concat(" (Today)");
  //           //document.getElementById('dispDate').textContent = '';
  //         }

  //         toggleShading(this);

  //       });

  //       dayElement.classList.add("shadable-button");

  //       document.querySelectorAll(".mon")[i].appendChild(dayElement);
  //       // daysGroup.appendChild(dayElement);
  //       // daysGroup.classList.add('mon');
  //       // document.querySelectorAll(".mon")[i].appendChild(daysGroup);


        

  //       if (start === 0) {
  //         document.querySelectorAll(".mon")[i].appendChild(document.createElement('br'));
  //       }
  //     }

  //   }




  //   // setTimeout(function() {
  //   //   div1.style.display = 'none';
  //   //   div2.classList.remove('show');
  //   // }, 500);
  // }




















































  function PrintCalendar(year, apiData){
    //document.getElementById('loading-overlay').style.display = 'block';
    var date = new Date().getDate();
    var month = new Date().getMonth();
    //var year = new Date().getFullYear();
    var y = new Date().getFullYear();
//document.querySelector('.mon').innerHTML = '';
//document.getElementsByTagName('h1')[0].style.color = 'red';
//document.querySelector(".mon").classList.add("visible");
// for(var i = 0; i < document.querySelectorAll('.mon').length; i++){
//   var singleMonth = document.querySelectorAll('.mon')[i];
//   //PrintDayLabel(singleMonth);
//   singleMonth.
// }


// for(var i = 0; i < document.querySelectorAll('span'); i++){
//   document.querySelectorAll('span')[i].remove();
// }


  // this.fetch('/calendar/events')
  //   .then(res => res.json())
  //   .then(data => {
  //   // apiData = data;
  //   // console.log("hasana" + apiData);
  //     console.log(data);

  // const cookieExists = document.cookie.split(';').some(cookie => cookie.trim().startsWith('lastPostDate='));


  // if (cookieExists) {
  //   // Access the value of the "lastPostDate" cookie
  //   const lastPostDate = document.cookie.split(';')
  //     .find(cookie => cookie.trim().startsWith('lastPostDate='))
  //     .split('=')[1];
  
  //   console.log('Cookie:', lastPostDate);
  // }
  // else {
  //   console.log('Last Post Date cookie not found.');
  // }


  this.fetch('/calendar/events/' + year)
    .then(res => res.json())
    .then(data => {
    // apiData = data;
    // console.log("hasana" + apiData);
      console.log(data);




    var spans = document.getElementsByTagName('span');

    // Convert the HTMLCollection to an array and remove each span element
    Array.from(spans).forEach(function (span) {
      span.remove();
    });
    
    
    var brs = document.getElementsByTagName('br');
    
    // Convert the HTMLCollection to an array and remove each span element
    Array.from(brs).forEach(function (br) {
      br.remove();
    });
    
    var innerDivs = document.getElementsByClassName('inner-div');
    Array.from(innerDivs).forEach(function (inner) {
      inner.remove();
    });
    
    // var brk = document.createElement('br');
    //   document.querySelectorAll(".mon")[i].appendChild(brk);
    var start = new Date(year, 0, 1).getDay();
    //start = start - 1;
    
    //document.querySelector('label').innerHTML = start;
    for(var i = 0; i < document.querySelectorAll(".mon").length; i++){
      // document.querySelectorAll(".mon")[i].addEventListener("click", function(){
      //   //document.getElementsByTagName('h1')[0].style.color = 'red';
    
      // });
      var yearElement = document.createElement('span');
      yearElement.textContent = currYear;
      //yearElement.classList.add('cati');
      //yearElement.id = 
      yearElement.setAttribute('id','year');
      document.querySelectorAll(".mon > h1")[i].appendChild(yearElement);
      PrintDayLabel(document.querySelectorAll(".mon")[i]);
      var brk = document.createElement('br');
      document.querySelectorAll(".mon")[i].appendChild(brk);
    
      
    
      var daysInMonth = new Date(year, i + 1, 0).getDate();
      //var count = 0;
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
    
    
        //dayElement.textContent = j;
    
        //new again but with api code


          //       //new again but with api code

        let monthNum = i + 1;
        const constructedDate = currYear + "-" + (monthNum % 10 == monthNum ? '0' + monthNum : monthNum) + "-" + (j % 10 == j ? '0' + j : j);
        //console.log(constructedDate);

        const match = data.find((obj) => {
          //console.log("constructed date: " + constructedDate + " , obj.date: " + obj.date);
          return (obj.date === constructedDate)
        });

        // if(match){
        //   dayElement.innerHTML = j + "<br><span>event here</span>";
        // }
        // else{
        //   dayElement.textContent = j;
        // }
        if(match) {
          //dayElement.style.backgroundColor = 'green';
          //dayElement.style.backgroundImage = "url('/iconmonstr-circle-thin.svg')";
          dayElement.classList.add('svgStyle');








        //   const tooltip = document.getElementById('tooltip');
        // const tooltipTitle = document.getElementById('tooltipTitle');
        // const tooltipContent = document.getElementById('tooltipContent');

        // //const eventDates = document.querySelectorAll('#svgStyle');

        // dayElement.addEventListener('mouseenter', (event) => {
        //     // Get the event title and content from the data attributes
        //     console.log(event);

        //     const dayElementRect = event.target.getBoundingClientRect();
        //     console.log(dayElementRect);
        //     const tooltipTop = dayElementRect.top - 120 + window.scrollY - 12;
        //     const tooltipLeft = dayElementRect.left + window.scrollX - ((150 - dayElementRect.width) / 2);
        //     console.log(dayElementRect.width);

        //     const title = match.title;
        //     const content = match.content;
        
        //     // Update the tooltip content
        //     tooltipTitle.textContent = title;
        //     tooltipContent.textContent = content;
        
        //     // Position and show the tooltip
        //     // tooltip.style.top = `${event.clientY}px`;
        //     // tooltip.style.left = `${event.clientX}px`;

        //     tooltip.style.top = `${tooltipTop}px`;
        //     tooltip.style.left = `${tooltipLeft}px`;
        //     tooltip.classList.remove('hidden');
        //   });
        
        //   dayElement.addEventListener('mouseleave', () => {
        //     // Hide the tooltip when the mouse leaves the date element
        //     tooltip.classList.add('hidden');
        //   });








        let isTooltipVisible = false;
        const tooltipWrapper = document.getElementById('tooltipWrapper');

        const tooltip = document.getElementById('tooltip');
        const tooltipTitle = document.getElementById('tooltipTitle');
        const tooltipContent = document.getElementById('tooltipContent');

        //const eventDates = document.querySelectorAll('#svgStyle');
        //let tooltipTimer;


        let tooltipTimer;

        dayElement.addEventListener('mouseenter', (event) => {
            // Get the event title and content from the data attributes
            console.log(event);
            clearTimeout(tooltipTimer);

            const dayElementRect = event.target.getBoundingClientRect();
            console.log(dayElementRect);
            const tooltipTop = dayElementRect.top - 120 + window.scrollY - 12;
            const tooltipLeft = dayElementRect.left + window.scrollX - ((150 - dayElementRect.width) / 2);
            console.log(dayElementRect.width);

            const title = match.title;
            const content = match.content;
        
            // Update the tooltip content
            tooltipTitle.textContent = title;
            tooltipContent.textContent = content;
        
            // Position and show the tooltip
            // tooltip.style.top = `${event.clientY}px`;
            // tooltip.style.left = `${event.clientX}px`;
            //clearTimeout(tooltipTimer);

            tooltipWrapper.style.top = `${tooltipTop}px`;
            tooltipWrapper.style.left = `${tooltipLeft}px`;
            tooltipWrapper.classList.remove('hidden');
            //tooltipTimer = setTimeout(hideTooltip, 500);

          });

          
        
          dayElement.addEventListener('mouseleave', (event) => {
            // Hide the tooltip when the mouse leaves the date element
            //clearTimeout(tooltipTimer);
            // if(isTooltipVisible == false){
            //   setTimeout(hideTooltip, 700);
            // }

            console.log(event.relatedTarget);
            if(event.relatedTarget != tooltip) {
              //setTimeout(hideTooltip, 700);
              tooltipTimer = setTimeout(hideTooltip, 700);
            }
            

            
          });

          function hideTooltip() {
            tooltipWrapper.classList.add('hidden');
          }

          
          tooltipWrapper.addEventListener('mouseenter', (event) => {
            // Set isTooltipVisible to true when the cursor enters the tooltip
            //isTooltipVisible = true;
            //tooltipWrapper.classList.remove('hidden');
            console.log(event);
            clearTimeout(tooltipTimer);
          });
          
          tooltipWrapper.addEventListener('mouseleave', () => {
            // Set isTooltipVisible to false when the cursor leaves the tooltip
            //isTooltipVisible = false;
            //setTimeout(hideTooltip, 500);
            tooltipTimer = setTimeout(hideTooltip, 700);
          });

          // tooltipWrapper.addEventListener('mouseenter', () => {
          //   // Set isTooltipVisible to true when the cursor enters the tooltip
          //   isTooltipVisible = true;
          // });
          
          // dayElement.addEventListener('mouseleave', () => {
          //   // If the tooltip is not visible, hide it after a delay
          //   if (!isTooltipVisible) {
          //     setTimeout(hideTooltip, 700);
          //   }
          // });
          
          // function hideTooltip() {
          //   tooltipWrapper.classList.add('hidden');
          // }
          
          // tooltipWrapper.addEventListener('mouseleave', () => {
          //   // Set isTooltipVisible to false when the cursor leaves the tooltip
          //   isTooltipVisible = false;
          //   hideTooltip();
          // });


        }

        dayElement.textContent = j;

        


        /////////////////////////


    
        // let monthNum = i + 1;
        // const constructedDate = currYear + "-" + (monthNum % 10 == monthNum ? '0' + monthNum : monthNum) + "-" + (j % 10 == j ? '0' + j : j);
        // console.log(constructedDate);
    
              const popup = document.getElementById('popup');
              //const currentDay = "";
    
              dayElement.addEventListener('contextmenu', (event) => {
                event.preventDefault();
    
    
              let dateElement = popup.querySelector('input[name="dateData"]');
    
              let dateNum = event.target.innerText;
              console.log("dateNum : " + dateNum);
              const num = Number(event.target.textContent);
              dateNum = num % 10 == num ? '0' + dateNum : dateNum;
              dateElement.value = (currYear + "-" + currMonth + "-" + dateNum);

              //Cookies.set('lastPostDate', req.body.dateData);

    
                //console.log(event.target.textContent);
                console.log(dateElement.value);

                const dayElementRect = event.target.getBoundingClientRect();
                console.log(dayElementRect);
                //
                //showPopup(event.clientX, event.clientY);
                //dayElementRect.top + window.scrollX - ((190 - dayElementRect.height) / 2) , dayElementRect.left + dayElementRect.width + 10 + window.scrollY
                //showPopup(dayElementRect.top - 140 + window.scrollY, dayElementRect.left + window.scrollX - ((190 - dayElementRect.width) / 2));
                showPopup(dayElementRect.top + window.scrollY - ((122 - dayElementRect.height) / 2) , dayElementRect.left + dayElementRect.width + 10 + window.scrollX);
                //currentDay = dayElement.textContent;
              });

              
    
              function showPopup(x, y) {
              popup.style.top = `${x}px`;
              popup.style.left = `${y}px`;
              popup.classList.remove('hidden');
              }
    
    
              document.addEventListener('click', (event) => {
                // Check if the clicked element is inside the popup or the calendar
                const isClickedInsidePopup = popup.contains(event.target);
                const isClickedInsideCalendar = event.target.closest('.calendar');
              
                // If the clicked element is outside both the popup and the calendar, hide the popup
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
  // setTimeout(document.getElementById('loading-overlay').classList.add('hidden'), 2000);
  
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
    //obj.textContent = "Hasan";
    var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    //var days = ['S','M','T','W','T','F','S'];

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

  //document.getElementsByTagName('h1')[0].style.color = 'red';

  //alert('Hello');


  //document.querySelector('.dateEntered').setAttribute("value","2020-07");
  //document.querySelector('.dateEntered').value = "2020-07"

  //document.querySelector('.jan').classList.add('invisibl');



  // function DayOfWeek(year){

  // }





















// Function to render events on the calendar
function renderEvents(events) {
  // Clear existing events (if any)
  // ...

  // Iterate over the events and render them on the calendar
  events.forEach((event) => {
    // Create elements and display events
    // ...
  });
}

// Event listener for the form submission
// document.querySelector("#popup form").addEventListener("submit", (event) => {
//   event.preventDefault();

//   // Get the data from the form (event title, description, and dateData)
//   const eventTitle = document.querySelector('input[name="eventTitle"]').value;
//   const eventDescription = document.querySelector('textarea[name="eventDescription"]').value;
//   const dateData = document.querySelector('input[name="dateData"]').value;

//   // Make the POST request to update the events on the server
//   fetch("/update-events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ events: [{ date: dateData, title: eventTitle, content: eventDescription }] }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Update the events data in the code.js file
//       renderEvents(data.events);
//       hidePopup();
//     })
//     .catch((error) => {
//       console.error("Error updating events:", error);
//     });
// });




  