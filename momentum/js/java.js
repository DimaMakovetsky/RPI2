const time=document.getElementById('time'), greeting=document.getElementById('greeting'),name=document.getElementById('name'),focus=document.getElementById('focus')
    ,weekDay=document.getElementById('weekDay'), quote=document.getElementById('quote'),author=document.getElementById('author'), city=document.getElementById('city');

    name.addEventListener('keydown',setName);
    name.addEventListener('blur',setNameBlur);
    document.getElementById("name").onclick=function(){clearName()};
    focus.addEventListener('keydown',setFocus);
    focus.addEventListener('blur',setFocusBlur);
    document.getElementById("focus").onclick=function(){clearFocus()};
    city.addEventListener('keydown',setCity);
    city.addEventListener('blur',setCityBlur);
    document.getElementById("city").onclick=function(){clearCity()};
    document.getElementById('changeBack').onclick=function(){backgroundChangeWithBitton(arrayBg)};
    document.getElementById('changeQuote').onclick=function(){getQuote();};
    let arrayBg=setArray();
    let lastPicture=0, currentSeason;
    arrayBg=backgroundList(arrayBg);
    currentTime();
    getDate();
    getQuote();
    casualBackground(arrayBg);
    getName();
    getFocus();
    getCity();
    
function clearCity()
{
    city.textContent="";
}
function checkCity(cityCheck)
{
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityCheck+"&lang=en&appid=866c939ee1b8cb5eb99d0349a3e096be&units=metric").then(resp=>resp.json()).then(data=>
    {
        console.log("KURWA");
        if(data.cod==404)
        {
            console.log(data.cod+" город жопы");
            
            return 1;
        }
        return 0;
        
        
    });
}
async function getWeather(cityCheck)
{
    const responce=await fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityCheck+"&lang=en&appid=866c939ee1b8cb5eb99d0349a3e096be&units=metric");
    const myJson=await responce.json();
    if(myJson.cod==404)
    {
        return 1;    
    }
    document.getElementById("icon").className='weather-icon owf';
    document.getElementById("temperature").textContent=myJson.main.temp+ " °C";
    document.getElementById("wind").textContent=myJson.wind.speed+" mph";
    document.getElementById("humidity").textContent=myJson.main.humidity+"%";
    document.getElementById("icon").classList.add(`owf-${myJson.weather[0].id}`);
    document.getElementById("h3_1").style.visibility='visible';
    document.getElementById("h3_2").style.visibility='visible';
    document.getElementById("h3_3").style.visibility='visible';
    return 0;
}
function getCity()
{
    
    if(localStorage.getItem('city')===null)
    {
        city.textContent='[Enter city]';
    }
    else
    {
        city.textContent=localStorage.getItem('city');
        getWeather(localStorage.getItem('city'));
    }
}
async function setCityBlur(e)
{
    if(e.target.innerHTML=='')
    {
        if(localStorage.getItem('city')===null)
        {
            city.textContent='[Enter city]';
        }
        else
        {
            city.textContent=localStorage.getItem('city');
        }
    }
    else
    {
        console.log("ass");
        if(await (getWeather(e.target.innerHTML))!=0)
        {
            window.alert("Cuty not found");
            if(localStorage.getItem('city')===null)
            {
                city.textContent='[Enter city]';
            }
            else
            {
                city.textContent=localStorage.getItem('city');
            }
        }
        else
        {
            localStorage.setItem('city',city.textContent);
        }
    }
    city.blur();
    
}
function setCity(e)
{
    if(e.code==="Enter")
    {
        city.blur();
    }
}

async function getQuote()
{
    await fetch("https://type.fit/api/quotes").then(response=>response.json()).then(data=>
    {
        var index =Math.floor(Math.random()*data.length);
        quote.innerHTML=data[index].text;
        
        if(data[index].author!=null)
            author.innerHTML=data[index].author;
        else
            author.innerHTML="Unnown author";
    });
    
}
function currentTime()
{
    let now=new Date(), hour=now.getHours(), min=now.getMinutes(), sec=now.getSeconds();
    //let now=new Date(), hour=now.getHours(), min=0, sec=0;
    if(min==0&&sec==0)
    {
        
        casualBackground(arrayBg);
    }
    time.innerHTML=`${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    setTimeout(currentTime, 1000);
}
function getDate()
{
    let now=new Date(), week=now.getDay(), day=now.getDate(), month=now.getFullYear();
    let weekDays=new Array(7);
    weekDays[0]="Sunday";
    weekDays[1]="Monday";
    weekDays[2]="Tuesday";
    weekDays[3]="Wednesday";
    weekDays[4]="Thursday";
    weekDays[5]="Friday";
    weekDays[6]="Saturday";
    let options ={month: 'long'};
    weekDay.innerHTML=`${weekDays[week]}, ${new Intl.DateTimeFormat('en-Us',options).format(now)} ${day} `;
}
function addZero(n)
{
    return (parseInt(n,10) <10 ? '0':'')+n;
}
function casualBackground(arrayBg)
{
    let now =new Date()
    , hour=now.getHours();
    let img=new Image();
    if(hour==6||hour==12||hour==18||hour==22)
        lastPicture=0;
    if  (hour>=6&&hour<12)
    {
        var i=arrayBg[lastPicture];
        if (i<10)
            i=addZero(i);
        img.src="css/images/morning/"+i+".jpg";
        img.onload=()=>{document.body.style.backgroundImage="url('css/images/morning/"+i+".jpg')"};
        greeting.textContent="Good morning, ";
        document.body.style.color='white';
        lastPicture++;
        //localStorage.setItem('lastPicture',lastPicture);
        currentSeason=0;
    }
    else
    {
        if (hour>=12&&hour<18)
        {
            var i=arrayBg[lastPicture];
            if (i<10)
                i=addZero(i);
            img.src="css/images/day/"+i+".jpg";
            img.onload=()=>{document.body.style.backgroundImage="url('images/day/"+i+".jpg')"};
            greeting.textContent="Good day, ";
            document.body.style.color='white';
            lastPicture++;
            //localStorage.setItem('lastPicture',lastPicture);
            currentSeason=1;
        }
        else
        {
            if (hour>=18&&hour<22)
            {
                var i=arrayBg[lastPicture];
                if (i<10)
                    i=addZero(i);
                img.src="css/images/evening/"+i+".jpg";
                img.onload=()=>{document.body.style.backgroundImage="url('css/images/evening/"+i+".jpg')"};
                greeting.textContent="Good evening, ";
                document.body.style.color='white';
                lastPicture++;
                //localStorage.setItem('lastPicture',lastPicture);
                currentSeason=2;
            }
            else
            {
                var i=arrayBg[lastPicture];
                if (i<10)
                    i=addZero(i);
                img.src="css/images/night/"+i+".jpg";
                img.onload=()=>{document.body.style.backgroundImage="url('css/images/night/"+i+".jpg')"};
                greeting.textContent="Good night, ";
                document.body.style.color='white';
                lastPicture++;
                //localStorage.setItem('lastPicture',lastPicture);
                currentSeason=4;
            }
        }    
    }
}
function backgroundChangeWithBitton(arrayBg)
{
    
    let now =new Date()
    , hour=now.getHours();
    //,hour=19;
    //lastPicture=localStorage.getItem('lastPicture');
    var i=arrayBg[lastPicture];
    var img =new Image();
    if (i<10)
        i=addZero(i);
    switch(currentSeason)
    {
        case 0:
            img.src="css/images/morning/"+i+".jpg";
            img.onload=()=>{document.body.style.backgroundImage="url('css/images/morning/"+i+".jpg')"};
            break;
        case 1:
            
            img.src="css/images/day/"+i+".jpg";
            img.onload=()=>{document.body.style.backgroundImage="url('css/images/day/"+i+".jpg')"};
            break;
        case 2:
            img.src="css/images/evening/"+i+".jpg";
            img.onload=()=>{document.body.style.backgroundImage="url('css/images/evening/"+i+".jpg')"};
            break;
        case 3:
            
            img.src="css/images/night/"+i+".jpg";
            img.onload=()=>{document.body.style.backgroundImage="url('css/images/night/"+i+".jpg')"};
            break;
    }
    lastPicture++;
    if  (lastPicture==20)
    {
        lastPicture=0;
        currentSeason++;
        if(currentSeason==4)
            currentSeason=0;
    }
    
    
}

function clearName()
{
    name.textContent="";
    //name.focus();
}
function getName()
{
    if(localStorage.getItem('name')===null)
    {
        name.textContent='[Enter name]';
    }
    else
    {
        name.textContent=localStorage.getItem('name');
    }
}
function setNameBlur(e)
{
    if(e.target.innerHTML=='')
    {
        if(localStorage.getItem('name')===null)
        {
            name.textContent='[Enter name]';
        }
        else
        {
            name.textContent=localStorage.getItem('name');
        }
    }
    else
    {
        localStorage.setItem('name',name.textContent);
    }
    name.blur();
}
function setName(e)
{
    if(e.code==="Enter")
    {
        name.blur();
    }
}
function clearFocus()
{
    focus.textContent="";
}
function getFocus()
{
    if(localStorage.getItem('focus')===null)
        focus.textContent='[Enter focus]';
    else
        focus.textContent=localStorage.getItem('focus');
}


function setFocusBlur(e)
{
    if(e.target.innerHTML=='')
    {
        if(localStorage.getItem('focus')===null)
        {
            focus.textContent='[Enter focus]';
        }
        else
        {
            focus.textContent=localStorage.getItem('focus');
        }
    }
    else
    {
        localStorage.setItem('focus',focus.textContent);
    }
    focus.blur();
}

function setFocus(e)
{
    if(e.code==="Enter")
    {
        focus.blur();
    }
}
function setArray()
{
    var array=new Array(20);
    for (let i =0; i<20;i++)
    {
        array[i]=i+1;
    }
    return array;
    
}
function backgroundList(array)
{
    for (let i =19; i>=0;i--)
    {
        var j=Math.floor(Math.random()*(i+1));
        //console.log(i+": "+array[i]+"  "+array[j]);

        
        var temp=array[i];
        array[i]=array[j];
        array[j]=temp;
        //console.log(i+": "+array[i]+"  "+array[j]);
    }
    return array;
}