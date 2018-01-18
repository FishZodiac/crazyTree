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

export default class main{
	constructor(){
		this.starting = false
		this.init()				
	}

	init(){
		this.back = new Back(ctx)	
		this.npc = new Npc(ctx)
		this.gameinfo = new Gameinfo(ctx)
					
		for (var i = 1; i < 12; i++) {
			let _img = this.randomTree()
			databus.pushTree(new Tree(ctx,_img.img,_img.p))		
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

		let tap = this.touchX>=screenWidth/2
		if (!(this.npc.posi == tap)) {
			this.npc.posi = !this.npc.posi
			return
		}		

		databus.score++

		/*木头池*/
		databus.shiftTree() //弹出		
		let _img = this.randomTree()
		databus.pushTree(new Tree(ctx,_img.img,_img.p))
	}

	/*随机产生木头*/
	randomTree(){
		/*判断上一个木头*/
		let _a,_b,_random=true;
		let random = Math.random()
		let last = "center"
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
		isCollision&&(databus.gameOver = true)

	}

	touch(){
		let that = this;
		wx.onTouchStart((touches)=>{			
			that.touchX = touches.changedTouches[0].clientX;
			that.run()			
		})	
	}
	loop() { 
		/*检测结束*/

		if (databus.gameOver) {
		  this.gameinfo.gameOver(databus.score)
	      return;
	    }
		ctx.clearRect(0, 0, canvas.width, canvas.height)	
		this.back.render()
		for(var k in databus.trees){
			 databus.trees[k].renderTree(k)
		}
		this.npc.render()

		this.gameinfo.render(databus.score)

	 	window.requestAnimationFrame(
	      this.loop.bind(this),
	      canvas
	    )
	}

}