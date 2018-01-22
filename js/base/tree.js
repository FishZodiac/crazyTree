let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class tree{
	constructor(ctx,src='',l=true){
		this.ctx = ctx
		this.img = new Image()
		this.img.src = src
		this.posiDr = l  // 1代表左边，0代表右边
	}

	update(src,posiDr){
		this.img.src = src
		this.posiDr =posiDr
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
			this.x = screenWidth/2-55
		}else{
			this.x = screenWidth/2-159
			
		}
		this.y = screenHeight-60-i*60		
	}

	renderMove(pos){
		let that = this
		that.treePosition(0)
		if (pos) {
			that.x=100
		}else{
			that.x=that.x+100
		}
		that.ctx.drawImage(that.img,that.x,that.y,210,60)
	}
}