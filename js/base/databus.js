import Pool from './pool.js'

/*状态管理*/
export default class databus{
	constructor(){
		this.score = 0
		this.gameOver = false
		this.pool = new Pool()
		this.trees = []
		this.moveTree = []
	}

	reset(){
		this.score = 0
		this.gameOver = false
		this.trees = []
		this.moveTree = []
	}	

	pushTree(tree){		
		this.trees.push(tree)
	}

	shiftTree(){
		let temp = this.trees.shift()
	    this.pool.recover('tree', temp)
	}
}