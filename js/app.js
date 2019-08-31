(() => {
$(document).foundation()

	//
	console.log('Starship Troopers');

	const Atwo = document.querySelector('.twoA'),
		  Aone = document.querySelector('.oneA'),
		  actor1 = document.querySelector('.actor1'),
		  actor2 = document.querySelector('.actor2'),
		  fullCircle = document.querySelector('#full'),
		  emptyCircle = document.querySelector('#empty'),
		  vidPlayer = document.querySelector('.video'),
		  playPause = document.querySelector('.play-pause'),
		  ffWd = document.querySelector('.forward'),
		  rWnd = document.querySelector('.rewind'),
		  volume = document.querySelector('.volume'),
		  vidPlayer1 = document.querySelector('.video1'),
		  playPause1 = document.querySelector('.play-pause1'),
		  ffWd1 = document.querySelector('.forward1'),
		  rWnd1 = document.querySelector('.rewind1'),
		  volume1 = document.querySelector('.volume1'),
		  fScreen = document.querySelector('.fullScreen'),
		  fScreen1 = document.querySelector('.fullScreen1'),
		  Ptwo = document.querySelector('.twoP'),
		  Pone = document.querySelector('.oneP'),
		  gallery1 = document.querySelector('.gallery1'),
		  gallery2 = document.querySelector('.gallery2'),
		  rules = document.querySelector('#rules'),
   		  showScore = document.querySelector('#showScore'),
	      start = document.querySelector('#start'),
		  score1 = document.querySelector('#score'),
		  canvas = document.querySelector('#canvas'),
		  progress = document.querySelector('.progress'),
		  progressBar = document.querySelector('.progress__filled'),
		  ranges = document.querySelector('.player__slider'),
		  ranges1 = document.querySelector('.player__slider1'),
		  progress1 = document.querySelector('.progress1'),
		  progressBar1 = document.querySelector('.progress__filled1');
	
	
		  var sp;
		  var fps = 55;
		  var score = 0;

		  var boxx = 0;
		  var boxy = 0;
		  var boxwidth = 500;
		  var boxheight = 500;

		  var soldierImage;
		  var soldierx;
		  var soldiery;
		  var soldierwidth = 60;
		  var soldierheight = 60;

		  var bulletImage;
		  var herobullet;
		  window.allbullets = new Array();
		  var bulletwidth = 10;
		  var bulletheight = 10;

		  var enemyImage;
		  var heroenemy;
		  window.allenemys = new Array();
		  var enemywidth = 30;
		  var enemyheight = 30;

		  var gameTimmer;
		  var btimmer;
		  var etimmer;

		  bulletImage = new Image();
		  bulletImage.src = '../An_Liu_IDP/images/bullet.png';
		  enemyImage = new Image();
		  enemyImage.src = '../An_Liu_IDP/images/bug.png';
	
	function firstPage() {
		actor1.style.display = 'block';
		actor2.style.display = 'none';
	}

	function secondPage() {
		actor1.style.display = 'none';
		actor2.style.display = 'block';
		emptyCircle.className = "fas fa-dot-circle";
		fullCircle.className = "far fa-dot-circle";
	}
	
	function togglePlay() {
    var theSVG = this.firstElementChild;
    if(vidPlayer.paused){
      vidPlayer.play();
      theSVG.dataset.icon = "pause-circle";
	  }else {
      	vidPlayer.pause();
      	theSVG.dataset.icon = "play-circle";
	  }
	}
	function ffWdVid() {
		vidPlayer.currentTime += 3;
	}
	
	function rWindVid() {
		vidPlayer.currentTime -= 3;
	 }
	
	 function controlVolume() {
		 var theIcon = this.firstElementChild;
		 if (vidPlayer.muted === false) {
      		vidPlayer.muted = true;
      		theIcon.dataset.icon = "volume-off";
    	}else {
      		vidPlayer.muted = false;
			theIcon.dataset.icon = "volume-up";
		}
  	}
	
	function handleProgress() {
		const percent = (vidPlayer.currentTime / vidPlayer.duration) * 100;
		progressBar.style.flexBasis = `${percent}%`;
	}
	
	function scrub(e) {
		const  scrubTime = (e.offsetX / progress.offsetWidth) * vidPlayer.duration;
		vidPlayer.currentTime = scrubTime;
	}
	
	function handleRangeUpdate() {
		vidPlayer[this.name] = this.value;
	}
	
	function togglePlay1() {
    var theSVG1 = this.firstElementChild;
    if(vidPlayer1.paused){
      vidPlayer1.play();
      theSVG1.dataset.icon = "pause-circle";
	  }else {
      	vidPlayer1.pause();
      	theSVG1.dataset.icon = "play-circle";
	  }
	}
	function ffWdVid1() {
		vidPlayer1.currentTime += 3;
	}
	
	function rWindVid1() {
		vidPlayer1.currentTime -= 3;
	 }
	
	 function controlVolume1() {
		 var theIcon1 = this.firstElementChild;
		 if (vidPlayer1.muted === false) {
      		vidPlayer1.muted = true;
      		theIcon1.dataset.icon = "volume-off";
    	}else {
      		vidPlayer1.muted = false;
			theIcon1.dataset.icon = "volume-up";
		}
  	}
	function handleProgress1() {
		const percent1 = (vidPlayer1.currentTime / vidPlayer1.duration) * 100;
		progressBar1.style.flexBasis = `${percent1}%`;
	}
	
	function scrub1(e) {
		const  scrubTime1 = (e.offsetX / progress1.offsetWidth) * vidPlayer1.duration;
		vidPlayer1.currentTime = scrubTime1;
	}
	function handleRangeUpdate1() {
		vidPlayer1[this.name] = this.value;
	}
	
	function fScreenF() {
        fullscreen(vidPlayer);
	}
	
	function fScreenF1() {
        fullscreen(vidPlayer1);
	}
	
	function fullscreen(element) {
	  if(element.requestFullscreen) {
	    element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
	    element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
	    element.msRequestFullscreen();
	  }
	}
	
	function firstPageP() {
		gallery1.style.display = 'block';
		gallery2.style.display = 'none';
		
	}

	function secondPageP() {
		gallery1.style.display = 'none';
		gallery2.style.display = 'block';
	}
	
	function startHide() {
    rules.style.display = 'none';
    start.style.display = 'none';
	  }

	  function stop() {
		clearInterval(gameTimmer);
		clearInterval(btimmer);
		clearInterval(etimmer);
		cxt.clearRect(boxx, boxy, boxwidth, boxheight);
		allenemys.length = 0;
		allbullets.length = 0;
		rules.style.display = '';
		start.style.display = '';
	  }
	  function bullet(x, y) {
		this.x = x;
		this.y = y;
		this.islive = true;
		this.timmer = null;
		this.run = function run() {
		  if (this.y < -10 || this.islive == false) {
			clearInterval(this.timmer);
			this.islive = false;
		  } else {
			this.y -= 20;
		  }
		};
	  }

	  function enemy(x, y) {
		this.x = x;
		this.y = y;
		this.islive = true;
		this.timmer = null;
		this.run = function run() {
		  if (this.y > boxheight || this.islive == false) {
			clearInterval(this.timmer);
			this.islive = false;
		  } else {
			this.y += 2.5;
		  }
		};
	  }
	  function beginsoldier() {
		soldierx = boxwidth / 2 - soldierwidth / 2;
		soldiery = boxheight - soldierheight;
		soldierImage = new Image();
		soldierImage.src = '../An_Liu_IDP/images/soldier.png';
	  }

	  function init() {
		cxt = canvas.getContext('2d');
		cxt.lineWidth = 3;
		beginsoldier();
		var body = document.getElementsByTagName('body')[0];
		btimmer = setInterval(producebullet, 500);
		etimmer = setInterval(produceenemy, 800);
		body.addEventListener(
		  'keydown',
		  function(event) {
			switch (event.keyCode) {
			  case 37:
				if (soldierx > boxx) {
				  sp = 8;
				} else {
				  sp = 0;
				}
				soldierx -= sp;
				break;
			  case 38:
				if (soldiery > boxy) {
				  sp = 8;
				} else {
				  sp = 0;
				}
				soldiery -= sp;
				break;
			  case 39:
				if (soldierx + soldierwidth < boxwidth) {
				  sp = 8;
				} else {
				  sp = 0;
				}
				soldierx += sp;
				break;
			  case 40:
				if (soldiery + soldierheight < boxheight) {
				  sp = 8;
				} else {
				  sp = 0;
				}
				soldiery += sp;
				break;
			  default:
				break;
			}
		  },
		  false
		);
		gameTimmer = setInterval(run, 1000 / fps);
	  }

	  function drawenemy() {
		for (var i = 0; i < allenemys.length; i++) {
		  if (allenemys[i].islive) {
			cxt.drawImage(
			  enemyImage,
			  allenemys[i].x,
			  allenemys[i].y,
			  enemywidth,
			  enemyheight
			);
		  }
		}
	  }

	  function drawsoldier() {
		cxt.clearRect(boxx, boxy, boxwidth, boxheight);
		cxt.drawImage(soldierImage, soldierx, soldiery, soldierwidth, soldierheight);
	  }

	  function drawbullet() {
		for (var i = 0; i < allbullets.length; i++) {
		  if (allbullets[i].islive) {
			cxt.drawImage(
			  bulletImage,
			  allbullets[i].x,
			  allbullets[i].y,
			  bulletwidth,
			  bulletheight
			);
		  }
		}
	  }

	  function produceenemy() {
		var x = Math.ceil(Math.random() * (boxwidth - soldierheight));
		heroenemy = new enemy(x, 33);
		allenemys.push(heroenemy);
		var timmer = setInterval(
		  'allenemys[' + (allenemys.length - 1) + '].run()',
		  50
		);
		allenemys[allenemys.length - 1].timmer = timmer;
	  }

	  function producebullet() {
		herobullet = new bullet(soldierx + soldierwidth / 2, soldiery + 10);
		allbullets.push(herobullet);
		var timmer = setInterval(
		  'allbullets[' + (allbullets.length - 1) + '].run()',
		  50
		);
		allbullets[allbullets.length - 1].timmer = timmer;
	  }

	  function checkbullet() {
		for (var i = 0; i < allenemys.length; i++) {
		  if (allenemys[i].islive) {
			var e = allenemys[i];
			for (var j = 0; j < allbullets.length; j++) {
			  if (allbullets[j].islive) {
				var b = allbullets[j];
				if (
				  b.x > e.x - bulletwidth &&
				  b.x + bulletwidth < e.x + enemywidth + 10 &&
				  b.y < e.y
				) {
				  e.islive = false;
				  b.islive = false;
				  score += 100;
				}
			  }
			}
		  }
		}
	  }

	  function checksoldier() {
		for (var i = 0; i < allenemys.length; i++) {
		  if (allenemys[i].islive) {
			var e = allenemys[i];
			if (
			  (e.x + enemywidth > soldierx &&
				e.x < soldierx + soldierwidth &&
				e.y > soldiery) ||
			  e.y > boxheight
			) {
			  e.islive = false;
			  stop();
			  score = 0;
			}
		  }
		}
	  }

	  function drawscore() {
		score1.innerHTML = score;
	  }

	  function run() {
		drawsoldier();
		drawbullet();
		drawscore();
		drawenemy();
		checkbullet();
		checksoldier();
	  }
	  window.init = init;
	  window.startHide = startHide;


	Aone.addEventListener('click', firstPage);
	Atwo.addEventListener('click', secondPage);
  	playPause.addEventListener('click', togglePlay);
  	ffWd.addEventListener('click', ffWdVid);
  	rWnd.addEventListener('click', rWindVid);
	volume.addEventListener('click', controlVolume);
	vidPlayer.addEventListener('timeupdate', handleProgress);
	progress.addEventListener('click', scrub);
	progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
	progress.addEventListener('mousedown', () => mousedown = true);
	progress.addEventListener('mouseup', () => mousedown = false);
	ranges.addEventListener('change', handleRangeUpdate);
	ranges.addEventListener('mousemove', handleRangeUpdate);
	ranges1.addEventListener('change', handleRangeUpdate1);
	ranges1.addEventListener('mousemove', handleRangeUpdate1);
	vidPlayer1.addEventListener('timeupdate', handleProgress1);
	progress1.addEventListener('click', scrub1);
	progress1.addEventListener('mousemove', (e) => mousedown && scrub1(e));
	progress1.addEventListener('mousedown', () => mousedown = true);
	progress1.addEventListener('mouseup', () => mousedown = false);
	playPause1.addEventListener('click', togglePlay1);
  	ffWd1.addEventListener('click', ffWdVid1);
  	rWnd1.addEventListener('click', rWindVid1);
	volume1.addEventListener('click', controlVolume1);
	fScreen.addEventListener('click', fScreenF);
	fScreen1.addEventListener('click', fScreenF1);
	Pone.addEventListener('click', firstPageP);
	Ptwo.addEventListener('click', secondPageP);
	start.addEventListener('click', init);
  	start.addEventListener('click', startHide);
})();
