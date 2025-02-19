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
const player2 = '2'
const small = 'd'
const floor = 'f'
const floor2 = 'l'
const cactus1 = 'c'
const cactus2 = 'e'
const cactus3 = 'g'

setLegend(
  [player, bitmap`
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
....0....0......
....00...00.....`],
  [player2, bitmap`
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
....0....00.....
....0...........
....00..........`],
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
...........
...........
...........
...........
...........
..p.......c
fflflflflfl`]

setMap(levels[level])

setPushables({
  [player]: []
})
const animationFrames = [ bitmap`
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
....00...0......
.........0......
.........00.....`,
 bitmap`
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
....0....00.....
....0...........
....00..........`]
//const animatedSprite = addSprite(2,5, player);
//animatedSprite.bitmapKey = animationFrames[0]
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
    addSprite(10,5,cactus1);
  }
  else if(randomNum == 1){
    addSprite(10,5,cactus2);
  }
  else{
    addSprite(10,5,cactus3);
  }
}

function checkCollision(){
  let tile = getTile(2,5);
  if(tile.length > 1){
    gameOver = true;
  }
}
let currFrame = 0;
function frame(){
  //animatedSprite.bitmapKey = animatedFrames[currFrame % 2]
  //getFirst(player) = animationFrames[currFrame % 2];
  console.log(getFirst(player))
  currFrame += 1;
  let cactus1s = getAll(cactus1);
  let cactus2s = getAll(cactus2);
  let cactus3s = getAll(cactus3);
  
  for(let c of cactus1s){
    c.x -= 1;
  }
  for(let c of cactus2s){
    c.x -= 1;
  }
  for(let c of cactus3s){
    c.x -= 1;
  }
  let randomNum = Math.floor(Math.random() * 8);
  if (randomNum == 0){
    placeCactus()
  }
  checkCollision()
  clearTile(0,5);
}
let gameOver = false;


setInterval(()=>{
  if(!gameOver){
    frame();
  }
  else{
    addText("Game Over", {
      x: 0,
      y: 0,
      color: color`3`
    })
  }
},100);

