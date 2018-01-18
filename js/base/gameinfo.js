let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class gameinfo{
	constructor(ctx){
		this.ctx = ctx
	}

	render(score){	
		this.ctx.font = "20px Arial"
		this.ctx.fillStyle = "#ffffff"	
  		this.ctx.fillText("得分："+score,  screenWidth / 2 - 40,  75)
	}

	gameOver(score){
		this.ctx.font = "20px Arial"
		this.ctx.fillStyle = "#ffffff"	
		   this.ctx.fillText(
		      '游戏结束',
		      screenWidth / 2 - 40,
		      screenHeight / 2 - 100 + 50
		    )

		    this.ctx.fillText(
		      '得分: ' + score,
		      screenWidth / 2 - 40,
		      screenHeight / 2 - 100 + 130
		    )
	}
}