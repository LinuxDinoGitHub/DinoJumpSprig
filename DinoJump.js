/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: DinoJump
@author: LinuxDino
@tags: []
@addedOn: 2024-00-00
@GitHub: https://github.com/LinuxDinoGitHub/DinoJumpSprig
*/

const player = "p"
const small = 'd'
const floor = 'f'
const floor2 = 'l'
const cactus1 = 'c'
const cactus2 = 'e'
const cactus3 = 'g'

setLegend(
  [player, bitmap`
................
.........0000...
.......00DDD00..
.......0DDD0D0..
......0DDDDDDD0.
......0DDDDD220.
......0DDD0000..
......0DDDD90...
.....00DDDDC0...
....04DDDDD9000.
...04DDDDDDC0...
..04DDDDDDD000..
.00000000000....
....0....0......
....0....0......
....00...00.....`],
  [small, bitmap`
................
................
................
................
................
................
................
................
...DDD..........
...DDDD.........
...DDD0.........
...DDD9.........
..DDDDC.........
.DDD0D9.........
.0..0...........
................`],
  [floor, bitmap`
0000000000000000
9999999999999999
9999999999999999
9999999999999999
9999C99999999999
9999999999999999
9999999999999999
99999999999C9999
9C99999999999999
9999999999999999
9999999999999999
9999999999999999
999999999999999C
9999999C99999999
9999999999999999
9999999999999999`],
  [floor2, bitmap`
0000000000000000
9999999999999999
9999999999999999
9999999999999999
999C999999999999
9999999999999999
9999999999999999
9999999999999999
99999999C9999C99
9999999999999999
9999999999999999
999C999999999999
9999999999999999
9999999999999C99
9999999999999999
9999999999999999`],
  [cactus1, bitmap`
................
................
......00000.....
.....004D40.00..
..00.044D4D0D0..
.00D04D4D4D0D0..
.0DD04D4D4D0D00.
.0DD04D4D400DD0.
.0DD04D4D4DDDD0.
.0DD04D4D4DD000.
.0DD04D4D4D00...
..0004D4D440....
....04D4D4D0....
....04D4D4D0....
....0444D4D0....
....0444D440....`],
  [cactus2, bitmap`
................
................
................
................
................
................
................
................
......000.......
.....00400......
...0.044400.....
..0D004D440.0...
..0DD04D4D00D0..
...0004D4D0DD0..
.....04D4D000...
.....0444D0.....`],
  [cactus3, bitmap`
................
................
................
................
................
.........0......
....0....0000...
0..00...0044000.
000000.0044D4000
0044D4004DD44D0.
04D4D4004DD44D0.
04DDD4004DD44D0.
04DD44004DD44D0.
0D4D44004DD44D0.
99DD4400D4D49999
994D4400D4D49999`],
)


setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
..........
p........c
flflflflfl`]

setMap(levels[level])

setPushables({
  [player]: []
})

let jumpPower = 1;
let jumping = false;

onInput("w", () => {
  if (!jumping){
    jumping = true;
    getFirst(player).y -= jumpPower;
    setTimeout(()=>{
    getFirst(player).y += jumpPower;
    jumping = false;
    },300)
  }  
})

afterInput(() => {

})
function placeCactus(){
  let randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0){
    addSprite(5,6,cactus1);
  }
  else if(randomNum == 1){
    addSprite(5,6,cactus2);
  }
  else{
    addSprite(5,6,cactus3);
  }
}

function checkCollision(){
  let cactuspos = tilesWith(cactus1, cactus2, cactus3);
  let playerpos = tilesWith(player);
  for(const x of cactuspos){
    if(x == playerpos){
      gameOver = true;
    }
  }
}
function frame(){
  let cacti = getAll(cactus1, cactus2, cactus3);
  for(const c of cacti){
    c.x -= 1;
  }
  let randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0){
    placeCactus()
  }
  checkCollision()
}
let gameOver = false;
while(!gameOver){
  setInterval(()=>{
    frame();
  },200);
}