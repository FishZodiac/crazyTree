import Databus from './base/databus.js'
import Back from './base/bg.js'
import Tree from './base/tree.js'
import Npc from './base/npc.js'
import Gameinfo from './base/gameinfo.js'

let ctx = canvas.getContext('2d')
let databus = new Databus()

let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

let treeLeft = "images/treeLeft.png"
let treeCen = "images/tree.png"
let treeRight = "images/treeRight.png"

let npcImg = 'images/npc.png'
let npcMove = 'images/npcMove.png'
let npcDie = 'images/npcDie.png'

export default class main{
	constructor(){
		this.restart = false
		this.init()				
	}

	init(){
		databus.reset()
		canvas.removeEventListener('touchstart',this.touchHandler)
		wx.triggerGC()
		/*降低帧率*/
		//wx.setPreferredFramesPerSecond(20)
		this.back = new Back(ctx)	
		this.npc = new Npc(ctx)		
		this.gameinfo = new Gameinfo(ctx)
					
		for (var i = 1; i < 12; i++) {
			let _img = this.randomTree()		
			let _tree =  databus.pool.getItemByClass('tree',Tree,ctx,_img.img,_img.p)	
			databus.pushTree(_tree)
		}
		this.touch()
		window.requestAnimationFrame(
	      this.loop.bind(this),
	      canvas
	    )
	    
				
	}

	run(){			
		/*计算当前点击位置*/
		this.collisionDetection()
		if(databus.gameOver){
			return
		}
		let tap = this.touchX>=screenWidth/2
		if (!(this.npc.posi == tap)) {
			this.npc.posi = !this.npc.posi
			return
		}		

		databus.score++
		this.npc.blood = (this.npc.blood + 160>=6000)?6000:this.npc.blood+160
		/*木头池*/
		databus.shiftTree() //弹出		
		let _img = this.randomTree()
		let _tree =  databus.pool.getItemByClass('tree',Tree,ctx,_img.img,_img.p)	
		databus.pushTree(_tree)
	}

	/*随机产生木头*/
	randomTree(){
		/*判断上一个木头*/
		let _a,_b,_random=true;
		let random = Math.random()
		let last = true
		if (databus.trees.length>0) {
			last = databus.trees[databus.trees.length-1].posiDr
		}
		if (last == "center") {
			if (random<=0.3334) {
				_a = treeRight
				_b = true
			}else if(random>0.3334&&random<=0.6667){
				_a = treeLeft
				_b = false
			}else{
				_a = treeCen
				_b = "center"
			}			
			
		}else{
			_a = treeCen
			_b = "center"
		}
		return {
			img:_a,
			p:_b
		}
	}

	/*碰撞检测*/
	collisionDetection(){
		let isCollision = (this.npc.posi==databus.trees[0].posiDr)
		isCollision&&(databus.gameOver = true)&&(this.npc.update(npcDie))
	}
  	//游戏结束后的触摸事件处理逻辑
	touchEventHandler(e) {
	     e.preventDefault()

	    let x = e.touches[0].clientX
	    let y = e.touches[0].clientY

	    let area = this.gameinfo.btnArea
	    if (x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY ){
		   	ctx.clearRect(0, 0, canvas.width, canvas.height)
		    this.init()
		}
	}

	touchCuttree(e){
		e.preventDefault()
		let that = this;
		if (databus.gameOver) {
			return
		}
		that.npc.update(npcMove)
		setTimeout(()=>{
			that.npc.update(npcImg)
		},100)
		that.touchX = e.touches[0].clientX;
		that.run()	
	}

	touch(){
		let that = this;
		this.touchCuttrees = that.touchCuttree.bind(this) // 更改this指向
		canvas.addEventListener('touchstart', this.touchCuttrees)
	}
	loop() { 
		let that = this
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.back.render()
		this.npc.render()

		for(var k in databus.trees){
			databus.trees[k].renderTree(k)
		}
		this.npc.renderLifebar()
		/*检测结束*/
		if (databus.gameOver||this.npc.blood<0.017) {	
		  databus.gameOver = true
		  this.gameinfo.gameOver(databus.score)
		  canvas.removeEventListener('touchstart',this.touchCuttrees)			 
		  this.touchHandler = that.touchEventHandler.bind(this)
      	  canvas.addEventListener('touchstart', this.touchHandler)		 	  
	      return
	    }else{				  
		  this.gameinfo.render(databus.score)
		}			

	 	window.requestAnimationFrame(
	      this.loop.bind(this),
	      canvas
	    )
	}

}