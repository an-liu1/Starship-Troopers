(() => {
  const rules = document.querySelector('#rules'),
   		showScore = document.querySelector('#showScore'),
		start = document.querySelector('#start'),
		score1 = document.querySelector('#score'),
		canvas = document.querySelector('#canvas');
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
  bulletImage.src = '../An_L_MMED1005_HW3/images/bullet.png';
  enemyImage = new Image();
  enemyImage.src = '../An_L_MMED1005_HW3/images/bug.png';

	
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
    soldierImage.src = '../An_L_MMED1005_HW3/images/soldier.png';
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
	
  start.addEventListener('click', init);
  start.addEventListener('click', startHide);
})();
