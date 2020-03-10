import { Component, OnInit, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-retroball',
  templateUrl: './retroball.component.html',
  styleUrls: ['./retroball.component.css']
})
export class RetroballComponent implements OnInit {
  width = 1024;
  height = 768;
  barWidth = 200;
  barHeight = 20;
  barPosition = this.width / 2 - ( this.barWidth / 2);
  gameArea;
  gameStarted = false;
  gameOver = false;
  gameComplete = false;
  pos = 0;
  speed = 0;
  ballPosition = { x: this.width / 2, y: this.height / 2, xAngle: 0.2 + this.speed, yAngle: 1.8 + this.speed };
  // ballPosition = { x: 50, y: 50, xAngle: 1, yAngle: 1 };
  score = 0;
  hitCount = 0;
  points = [
    [0, 15], [50, 15], [100, 15], [150, 15], [200, 15], [250, 15], [300, 15], [350, 15], [400, 15], [450, 15], [500, 15], [550, 15], [600, 15], [650, 15], [700, 15], [750, 15],
    [0, 30], [50, 30], [100, 30], [150, 30], [200, 30], [250, 30], [300, 30], [350, 30], [400, 30], [450, 30], [500, 30], [550, 30], [600, 30], [650, 30], [700, 30], [750, 30],
    [0, 45], [50, 45], [100, 45], [150, 45], [200, 45], [250, 45], [300, 45], [350, 45], [400, 45], [450, 45], [500, 45], [550, 45], [600, 45], [650, 45], [700, 45], [750, 45],
    [0, 60], [50, 60], [100, 60], [150, 60], [200, 60], [250, 60], [300, 60], [350, 60], [400, 60], [450, 60], [500, 60], [550, 60], [600, 60], [650, 60], [700, 60], [750, 60],
    [0, 75], [50, 75], [100, 75], [150, 75], [200, 75], [250, 75], [300, 75], [350, 75], [400, 75], [450, 75], [500, 75], [550, 75], [600, 75], [650, 75], [700, 75], [750, 75]
  ];

  constructor() { 
  }

  ngOnInit() {

    this.gameArea = d3.select('#linechart')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    const background = this.gameArea.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.width)
      .attr('height', this.height);

    var myText =  this.gameArea.append("text")
      .attr('x', 320)
      .attr('y', 400)
      .attr('class', 'score')
      .attr('fill', 'white')
      .attr('font-size', '50px')
      .attr('font-family', 'Segoe UI')
      .attr('id', 'game-start')
      .text('CLICK TO START!');  


    this.drawPoints(this.points);
    this.drawScore(this.score);
    
    document.addEventListener('click', this.startGame);

  }

  startGame = () => {
    this.gameStarted = true;
    d3.select('#game-start').remove();
    d3.select('#game-over').remove();
    document.removeEventListener('click', this.startGame);
  }

  drawBar = (barPosition) => {
    const bar = this.gameArea.append('rect')
      .attr('x', barPosition )
      .attr('y', this.height - 50)
      .attr('width', this.barWidth)
      .attr('height', this.barHeight)
      .attr('fill', 'white')
      .attr('id', 'bar');
  }

  drawBall = (ballPosition) => {
    const ball = this.gameArea.append('circle')
      .attr('cx', ballPosition.x)
      .attr('cy', ballPosition.y)
      .attr('r', 5)
      .attr('fill', 'white')
      .attr('id', 'ball');
  }

  drawPoints = (points) => {
    for (let i = 0; i < points.length; i++) {
      const bar = this.gameArea.append('rect')
      .attr('x', points[i][0] + (this.width / 2) - (50 * 16 / 2))
      .attr('y', points[i][1] + 75)
      .attr('width', 50)
      .attr('height', 15)
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 3)
      .attr('id', `point${i}`)
      .attr('class', 'point')
      .attr('name', 'point');
    } 
  }

  drawScore = (score) => {
    var myText =  this.gameArea.append("text")
    .attr('x', 20)
    .attr('y', 30)
    .attr('class', 'score')
    .attr('fill', 'white')
    .attr('font-size', '20px')
    .attr('font-family', 'Segoe UI')
    .attr('id', 'score')
    .text(`${score}`);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e) {
    if (e.x > this.pos) {
      this.moveRight();
      this.pos = e.x;
    }

    if (e.x < this.pos) {
      this.moveLeft();
      this.pos = e.x;
    }
  }

  moveLeft = () => {
    if (this.barPosition > 0) {
      this.barPosition -= 15;
    }
  }

  moveRight = () => {
    if (this.barPosition < this.width - this.barWidth) {
      this.barPosition += 15;
    }
  }

  fps = 200;

  refresh = setInterval( () => {
    if (this.gameStarted) {
      d3.select('#bar').remove();
      d3.select('#ball').remove();
      this.drawBar(this.barPosition);
      this.ballPosition = this.nextBallPosition(this.ballPosition);
      this.drawBall(this.ballPosition);
  
      if (this.gameOver) {
        this.gameStarted = false;
        var myText =  this.gameArea.append("text")
          .attr('x', 240)
          .attr('y', 400)
          .attr('class', 'score')
          .attr('fill', 'white')
          .attr('font-size', '100px')
          .attr('font-family', 'Segoe UI')
          .attr('id', 'game-over')
          .text('GAME OVER');  
      }
  
      if (this.gameComplete) {
        this.gameStarted = false;
        var myText =  this.gameArea.append("text")
          .attr('x', 90)
          .attr('y', 400)
          .attr('class', 'score')
          .attr('fill', 'white')
          .attr('font-size', '100px')
          .attr('font-family', 'Segoe UI')
          .text('GAME COMPLETED');  
      }

    }


  }, 1000 / this.fps);

  offsetX = (this.width / 2) - (50 * 16 / 2);
  offsetY = 75;

  nextBallPosition = (pos) => {
    const barCenter = this.barPosition + this.barWidth / 2;
  
    // Detect bar
    if ((pos.x < barCenter + ( this.barWidth / 2 ) && pos.x > barCenter - ( this.barWidth / 2 )) && pos.y > this.height - 50 ) {
      pos.xAngle = ( pos.x - barCenter) / 100;
      pos.yAngle = - (2 + this.speed) + Math.abs(pos.xAngle);
    }

    // Fall through
    if (pos.x < this.width && pos.y > this.height + 50) {
      this.gameOver = true;
    }

    // Detect walls
    if (pos.x > this.width && pos.y < this.height) {
      pos.xAngle = pos.xAngle - ( pos.xAngle * 2 );
    }
    if (pos.x < this.width && pos.y < 0) {
      pos.yAngle = pos.yAngle - ( pos.yAngle * 2 );
    }
    if (pos.x < 0 && pos.y < this.height) {
      pos.xAngle = pos.xAngle - ( pos.xAngle * 2 );
    }

    // Detect points
    for (let i = 0; i < this.points.length; i++) {
      if (
        (pos.x > this.points[i][0] + this.offsetX && pos.x < this.points[i][0] + this.offsetX + 50 ) && 
        (pos.y < this.points[i][1] + this.offsetY + 15 && pos.y > this.points[i][1] + this.offsetY)) {
          
        d3.select(`#point${i}`).remove();

        if (
          (pos.x > this.points[i][0] + this.offsetX && pos.x < this.points[i][0] + this.offsetX + 50) && 
          (pos.y > this.points[i][1] + this.offsetY && pos.y < this.points[i][1] + this.offsetY + 15)) {
          pos.yAngle = pos.yAngle - ( pos.yAngle * 2 );
        }

        this.hitCount++;
        if (this.hitCount === this.points.length) {
          this.gameComplete = true;
        }

        this.speed += 0.1;
        this.points[i] = [-100, -100];
        d3.select('#score').remove();
        this.drawScore(this.score += 100);       
      }
    }

    return { x: pos.x + pos.xAngle, y: pos.y + pos.yAngle, xAngle: pos.xAngle, yAngle: pos.yAngle };
  }


}