//var WINDOW_WIDTH = 1024;
//var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
//定时器
/*var endTime = new Date(2016,9,18,47,52);*/
//倒计时
/*var endTime = new Date();
endTime.setTime(endTime.getTime()+3600*1000);*/
var curShowTimeSeconds = 0

var balls=[];
colors = ["#f33","#90c","#fcf","#6ff","#66f","#c6f","#3c6","#ff9","#c60","#0f3"];

var WINDOW_WIDTH=document.body.clientWidth
var WINDOW_HEIGHT=document.body.clientHeight
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext("2d");

var pic = new Image();
pic.src = "pri_images/star.png";
var stars=[];
window.onload = function(){

	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);



    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds()
    createStars();
    setInterval(
    	function(){
    		render();
    		update();
    	}
    	,
    	50
    	);
	
}
function getCurrentShowTimeSeconds()
{
	var curTime = new Date();
	/*var ret = endTime.getTime() - curTime.getTime();*/
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

	return ret;
}
//创建并初始化星星
function createStars()
{
    for (var i=0;i<100;i++)
    {
    
        var astar={
        sx:Math.floor(Math.random()*7),
        x:Math.floor(Math.random()*WINDOW_WIDTH),
        y:Math.floor(Math.random()*WINDOW_HEIGHT),
        vx:5
    }
        stars.push(astar);
    }  
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
    var nextSeconds = nextShowTimeSeconds%60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
    var curSeconds = curShowTimeSeconds%60;

    if(nextSeconds != curSeconds){
    	if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(nextHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }

    	curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
    updateStars();
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-balls[i].ynum*2*(RADIUS+1)-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-balls[i].ynum*2*(RADIUS+1)-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    //统计当前视线中小球数量，将超出浏览器视线的小球删除
    var cnt = 0;
    for(var i=0;i<balls.length;i++)
    {
    	if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH)
    		balls[cnt++] = balls[i];
    }
    while(balls.length>Math.min(cnt,1000))
    {
    	balls.pop();
    }
}

function updateStars(){
    for(var i=0;i<stars.length;i++)
    {
        stars[i].sx++;
        stars[i].x += stars[i].vx;
        if(stars[i].sx>=7)
        {
            stars[i].sx=0;
        }
        if(stars[i].x>=WINDOW_WIDTH)
        {
            stars[i].x=0;
        }
    }
}

function addBalls( x , y , num ){
    var ballsgrandom = Math.random();
    var ballsvxrandom = Math.pow( -1 , Math.ceil( Math.random()*10 ) );
    var ballscolorrandom = Math.floor( Math.random()*colors.length )

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+ballsgrandom,
                    vx:ballsvxrandom * 4,
                    vy:-5,
                    color: colors[ ballscolorrandom ],
                    ynum:9-i
                }

                balls.push( aBall )
            }
}
function render(){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    fillCanvas();
    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    var seconds = curShowTimeSeconds%60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS+1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }

    drawStars();

}

function fillCanvas() {
    cxt.fillStyle = "#000";
    cxt.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function renderDigit( x , y , num ){

    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()
                cxt.fill()
            }
}

function drawStars(){
    for (var i=0;i<stars.length;i++)
    {
        cxt.drawImage(pic ,stars[i].sx*7,0 ,7,7 ,stars[i].x,stars[i].y ,7,7);
    }

}