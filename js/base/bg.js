let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

let bg = new Image()
bg.src = 'images/bg.jpg'

export default class back{
	constructor(ctx){
		this.ctx = ctx
	}

	render(){
		var that = this		
		that.ctx.drawImage(bg,0,0,screenWidth,screenHeight)		
	}
}