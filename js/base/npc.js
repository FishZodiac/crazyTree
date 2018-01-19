let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class npc{
	constructor(ctx){
		this.ctx = ctx
		this.img = new Image()
		this.img.src = 'images/npc.png'
		this.posi = true

		/*定义血条*/
		this.blood = 6000
	}
	update(src){
		this.img.src = src
	}
	render(){
		let that = this
		that.treePosition()	
		if (that.posi) {
			that.ctx.drawImage(that.img,that.x,that.y,100,100)
		}else{
			that.ctx.translate(300, 0);
		    that.ctx.scale(-1, 1);
		    // 下面画的图片是水平翻转的
			that.ctx.drawImage(that.img,that.x,that.y,100,100)
		    // 恢复正常
		    that.ctx.translate(300, 0);
		    that.ctx.scale(-1, 1);
		}
			
	}
	treePosition(){
		if (this.posi) {
			this.x = screenWidth/2+40
		}else{
			this.x = screenWidth/2-25
		}
		this.y = screenHeight-160		
	}

	renderLifebar(){
		this.blood = this.blood - 16
		this.ctx.fillStyle = "#222"
		this.ctx.fillRect(screenWidth/2-95,30,190,30)
		this.ctx.fillStyle = "red"
		this.ctx.fillRect(screenWidth/2-90,35,180*(this.blood/6000),20)
	}
}