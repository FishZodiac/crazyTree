let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth
let npcImg = new Image()
npcImg.src = 'images/npc.png'

export default class npc{
	constructor(ctx){
		this.ctx = ctx
		this.posi = true
	}

	render(){
		let that = this
		that.treePosition()	
		if (that.posi) {
			that.ctx.drawImage(npcImg,that.x,that.y,90,120)
		}else{
			that.ctx.translate(300, 0);
		    that.ctx.scale(-1, 1);
		    // 下面画的图片是水平翻转的
			that.ctx.drawImage(npcImg,that.x,that.y,90,120)
		    // 恢复正常
		    that.ctx.translate(300, 0);
		    that.ctx.scale(-1, 1);
		}
			
	}

	treePosition(){
		if (this.posi) {
			this.x = screenWidth/2+60
		}else{
			this.x = screenWidth/2
		}
		this.y = screenHeight-180		
	}
}