let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class tree{
	constructor(ctx,src='',l=true){
		this.ctx = ctx
		this.img = new Image()
		this.img.src = src
		this.posiDr = l  // 1代表左边，0代表右边
	}


	renderTree(i){
		let that = this
		that.treePosition(i)
		//that.img.onload = function(){	
			that.ctx.drawImage(that.img,that.x,that.y,210,60)
		//}
	}

	treePosition(i){
		i++
		if (this.posiDr && this.posiDr != "center") {
			this.x = screenWidth/2-56
		}else{
			this.x = screenWidth/2-159
			
		}
		this.y = screenHeight-60-i*60		
	}
}