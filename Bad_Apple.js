var btn = document.getElementById('playbtn');
var resetBtn = document.getElementById("resetbtn");
var img = new Image();
	img.src = "imgs/Bad_Apple 0001.jpg";
var badapple={
	NUM:0,
	timer:null,
	bloon:false,
	move:function (){ 
		_this=this;	      
	    timer=setInterval(function(){
	        _this.NUM++;
	        if(_this.NUM <= 9){
	            img.src = "imgs/Bad_Apple 000" + _this.NUM + ".jpg";
	        }else if(_this.NUM > 9 && _this.NUM < 99){
	            img.src = "imgs/Bad_Apple 00" + _this.NUM + ".jpg";
	        }else if(_this.NUM > 99 && _this.NUM < 999){
	            img.src = "imgs/Bad_Apple 0" + _this.NUM + ".jpg";
	        }else if(_this.NUM > 999){
	            img.src = "imgs/Bad_Apple " + _this.NUM + ".jpg";
	        	if(_this.NUM == 4381){
	            	_this.NUM = 0;
	            	clearInterval(timer);
	            	audio.load();
	            	playbtn.style.background = 'url(play.jpg)';
	            }
	        }
	    },50);	    
	}, 
	play:function (){	                          
	    var _this=this;
	    var audio = document.getElementById('audio'); 
	    img.src="imgs/Bad_Apple 0001.jpg";
	    btn.onclick=function (){
	        if(_this.bloon==true){
	            audio.pause();
	            clearInterval(timer);
	            playbtn.style.background = 'url(play.jpg)';
	            playbtn.title = '点击播放';            
	            _this.bloon=false;
	        }else{
	            audio.play();               
	            _this.move();
	            playbtn.style.background = 'url(stop.jpg)';
	            resetbtn.style.background = 'url(reset.jpg)';
	            playbtn.title = '点击暂停'; 
	            _this.bloon=true;
	        }           
	    };
	    resetBtn.onclick=function (){
	        audio.load();
	        clearInterval(timer);
	        img.src = 'imgs/Bad_Apple 0001.jpg';
	        _this.NUM = 1;
	        resetbtn.style.background = 'url(get.jpg)';
	        playbtn.style.background = 'url(play.jpg)';
	        resetbtn.title = '点击重置';
	        _this.bloon = false;
	    } 
	},
	    // 根据rgb值计算灰度
	getGray:function (r, g, b) {
	    return 0.3 * r + 0.6 * g + 0.1 * b;
	},
	    // 根据灰度生成相应字符
	toText:function  (g) {
	    if (g <= 30) {
	        return '8';
	    } else if (g > 30 && g <= 60) {
	        return '&';
	    } else if (g > 60 && g <= 120) {
	        return '$';
	    }  else if (g > 120 && g <= 150) {
	        return '*';
	    } else if (g > 150 && g <= 180) {
	        return 'o';
	    } else if (g > 180 && g <= 210) {
	        return '!';
	    } else if (g > 210 && g <= 240) {
	        return ';';
	    }  else {
	        return '.';
	    }
	},
	    // 转换
	init:function () {
	    var cv = document.getElementById('cv');
	    var c = cv.getContext('2d');
	    var txtBox = document.getElementById('txt');
	    txtBox.style.width = img.width + 'px';
	    cv.width = img.width;
	    cv.height = img.height;
	    c.drawImage(img, 0, 0);
	    var imgData = c.getImageData(0, 0, img.width, img.height);
	    var imgDataArr = imgData.data;
	    var imgDataWidth = imgData.width;
	    var imgDataHeight = imgData.height;
	    var txt = '';
	    for (h = 0; h < imgDataHeight; h += 12) {
	        var p = '<p>';
	        for (w = 0; w < imgDataWidth; w += 6) {
	            var index = (w + imgDataWidth * h) * 4;
	            var r = imgDataArr[index + 0];
	            var g = imgDataArr[index + 1];
	            var b = imgDataArr[index + 2];
	            var gray =badapple.getGray(r, g, b);
	            p +=badapple.toText(gray);
	        }
	        p += '</p>';
	        txt += p;
	    }
	    txtBox.innerHTML = txt;
	    //通过控制台打印可以看到一帧一帧的txt
	     //console.log(txtBox.innerHTML);
	}
}
//图片加载完毕的时候运行badapple里面的 
img.onload = badapple.init;  
//开始播放
badapple.play();