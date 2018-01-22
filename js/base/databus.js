import Pool from './pool.js'

/*状态管理*/
export default class databus{
	constructor(){
		this.score = 0
		this.gameOver = false
		this.pool = new Pool()
		this.trees = []
	}

	reset(){
		this.score = 0
		this.gameOver = false
		this.trees = []
	}	

	pushTree(tree){		
		this.trees.push(tree)
	}

	shiftTree(posi){
		//this.trees[0].renderMove(posi)		
		let temp = this.trees.shift()
	    this.pool.recover('tree', temp)
	}
}