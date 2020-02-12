var WINDOW_WIDTH=document.body.clientWidth;
var WINDOW_HEIGHT=document.body.clientHeight;
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext("2d");

var stars=[];
var pic = new Image();
pic.src = "pri_images/star.png";

var circleStarsmax = 30;	//外圆头部最大星星数
var trigonStarsmax = 30;	//一条三角线头部最大星星数

var centerx=WINDOW_WIDTH/2;
var centery=WINDOW_HEIGHT/2-80;
var circleR=WINDOW_HEIGHT/4;

var starstri=[];
var starstep=Math.sqrt(3)*circleR/(trigonStarsmax*(2));

var starstricop=[];
var trinum=4;
var digitleft=WINDOW_WIDTH/6;	//底部数字间距
var digittop=centery+circleR+50;	//底部数字距浏览器内容顶部距离
var digitnum=[1,4,3,0];	//底部数字
var timecur = 0;
var lightupdate=0;
var flgnum=0;

window.onload = function(){

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	createcircleStars();
	createtrigonStars();
	createtrigonStarscop();
	timecur = getCurrentShowTimeSeconds();
	//createdigit();
	setInterval(
		function(){
			render();
			update();
		}
		,50
		);
}

function getCurrentShowTimeSeconds()
{
	var curTime = new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}

function createcircleStars(){
	for(var i=circleStarsmax;i>0;i--)
	{
		for(var j=0;j<i;j++)
		{
			var starradin = (Math.random()*2/(circleStarsmax+1)+(circleStarsmax-i)*2/circleStarsmax)*Math.PI;	//将圆分为starmax份，star在所属圆弧中随机取值
			var stard = (19/20+Math.random()*1/10)*circleR;		//star与圆心距离
			var astar={
				radin:starradin,	//star相对于过圆心垂直线的角度
				d:stard,	//star与圆心距离
				x:stard*Math.cos(starradin)+centerx,	//star坐标x
				y:centery-stard*Math.sin(starradin),	//star坐标y
				sx:Math.floor(Math.random()*7)	//star在图片中的位置，即亮度

			}
			stars.push(astar);
		}
	}

}

function createtrigonStars(){
	for(var i=trigonStarsmax;i>0;i--)
	{
		for(j=0;j<i;j++)
		{
			var starlong = (trigonStarsmax-i+Math.random())*Math.sqrt(3)*circleR*trinum/trigonStarsmax;
			var starw = (1/40-Math.random()/20)*circleR*trinum;
			var astartri={
				sx:Math.floor(Math.random()*7),
				x:centerx-starlong/2+starw*Math.sqrt(3)/2,
				y:centery-circleR+Math.sqrt(3)*starlong/2+starw/2,
				stepx:starstep/2,
				stepy:-starstep*Math.sqrt(3)/2
			}
			starstri.push(astartri);

		}
	}
}

function createtrigonStarscop(){
	for(var i=trigonStarsmax;i>0;i--)
	{
		for(j=0;j<i;j++)
		{
			var starlong = (trigonStarsmax-i+Math.random())*Math.sqrt(3)*circleR*trinum/trigonStarsmax;
			var starw = (1/40-Math.random()/20)*circleR*trinum;
			var astartri={
				sx:Math.floor(Math.random()*7),
				x:centerx+starlong/2-starw*Math.sqrt(3)/2,
				y:centery+circleR-Math.sqrt(3)*starlong/2-starw/2,
				stepx:starstep/2,
				stepy:starstep*Math.sqrt(3)/2
			}
			starstricop.push(astartri);

		}
	}
}


function update(){
	updatecircle();	//更新圆弧star坐标和亮度
	updatetrigon();
	updatetrigoncop();
}

function updatecircle(){
	for(var i=0;i<stars.length;i++)
	{
		stars[i].sx++;
		if (stars[i].sx>=7)
		{
			stars[i].sx=0;
		}
		stars[i].radin-=2*Math.PI/(circleStarsmax+1);	//圆弧旋转速度
		if(Math.abs(stars[i].radin)>=2*Math.PI)
		{
			stars[i].radin+=2*Math.PI;
		}
		stars[i].x=stars[i].d*Math.cos(stars[i].radin)+centerx;
		stars[i].y=centery-stars[i].d*Math.sin(stars[i].radin);
	}
}

function updatetrigon(){
	for(var i=0;i<starstri.length;i++)
	{
		starstri[i].sx++;
		if (starstri[i].sx>=7)
		{
			starstri[i].sx=0;
		}
		starstri[i].x+=starstri[i].stepx;
		starstri[i].y+=starstri[i].stepy;
		//直线折射
		if((starstri[i].x>=centerx)&&(starstri[i].y<=centery-circleR))
		{
			starstri[i].stepy=starstep*Math.sqrt(3)/2;
		}
		if((starstri[i].x>=centerx+Math.sqrt(3)*circleR/2)&&(starstri[i].y>=centery+circleR/2))
		{
			starstri[i].stepy=0;
			starstri[i].stepx=-starstep/2;
		}
		if((starstri[i].x<=centerx-Math.sqrt(3)*circleR/2)&&(starstri[i].y>=centery+circleR/2))
		{
			starstri[i].stepy=-starstep*Math.sqrt(3)/2;
			starstri[i].stepx=starstep/2;
		}
	}
}

function updatetrigoncop(){
	for(var i=0;i<starstricop.length;i++)
	{
		starstricop[i].sx++;
		if (starstricop[i].sx>=7)
		{
			starstricop[i].sx=0;
		}
		starstricop[i].x-=starstricop[i].stepx;
		starstricop[i].y+=starstricop[i].stepy;
		if((starstricop[i].x<=centerx)&&(starstricop[i].y>=centery+circleR))
		{
			starstricop[i].stepy=-starstep*Math.sqrt(3)/2;
		}
		if((starstricop[i].x<=centerx-Math.sqrt(3)*circleR/2)&&(starstricop[i].y<=centery-circleR/2))
		{
			starstricop[i].stepy=0;
			starstricop[i].stepx=-starstep/2;
		}
		if((starstricop[i].x>=centerx+Math.sqrt(3)*circleR/2)&&(starstricop[i].y<=centery-circleR/2))
		{
			starstricop[i].stepy=starstep*Math.sqrt(3)/2;
			starstricop[i].stepx=starstep/2;
		}
	}
}

function render(){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	fillCanvas();	//刷新画布背景
	drawStars();	//绘制stars
	flgnum++;	//底部数字star亮度更新
	//var timenow = getCurrentShowTimeSeconds();
	//亮度更新频率
	if(flgnum==2){
		lightupdate++;
		flgnum=0;
	}

	if(lightupdate==7)
	{
		lightupdate=0;
	}
	

	//var picno = Math.floor(Math.random()*7);
	drawdigit(digitleft+digitleft/4,digittop,digitnum[0]);
	drawdigit(digitleft*2+digitleft/4,digittop,digitnum[1]);
	drawdigit(digitleft*3+digitleft/4,digittop,digitnum[2]);
	drawdigit(digitleft*4+digitleft/4,digittop,digitnum[3]);

	/*cxt.font = 'bold 144px consolas';
    cxt.textAlign = '#fff';
    cxt.textBaseline = 'top';
    cxt.strokeStyle = 'red';
    cxt.strokeText('Z', 100, 100);*/

    /*cxt.font = 'bold 100px arial';
    cxt.fillStyle = '#fff';
    cxt.fillText('h', centerx-20,centery+20);*/
}

function fillCanvas() {
    cxt.fillStyle = "#000";
    cxt.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
}

function drawStars(){

	for(var i=0;i<stars.length;i++)
	{
		cxt.drawImage(pic,stars[i].sx*7,0,7,7,stars[i].x,stars[i].y,7,7);
	}
	for(var i=0;i<starstri.length;i++)
	{
		cxt.drawImage(pic,starstri[i].sx*7,0,7,7,starstri[i].x,starstri[i].y,7,7);
		cxt.drawImage(pic,starstricop[i].sx*7,0,7,7,starstricop[i].x,starstricop[i].y,7,7);
	}
}

function drawdigit(x,y,num){
	
	for(var i=0;i<digit[num].length;i++)
	{
		for(var j=0;j<digit[num][i].length;j++)
		{
			if(digit[num][i][j]==1)
			{
				var picno = (lightupdate+j)%7;	//底部数字star亮度随数组列循环递增
				cxt.drawImage(pic,picno*7,0,7,7,x+j*13+3,y+i*13+3,7,7);
			}
		}
	}
}

