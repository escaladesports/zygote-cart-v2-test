
function Cart(){
	this.products = []
	this.qty = []
	this.findQty()
	this.inject()
	this.readCookie()
	this.findButtons()
	this.findIcon()
	return this
}
Cart.prototype = {
	isOpen: false,
	body: document.getElementsByTagName('body')[0],

	inject: require('./bin/inject'),

	// Finds and activates "Add to Cart" buttons
	findButtons: function(){
		const els = document.querySelectorAll('[data-id][data-price]')
		for(let i = els.length; i--;){
			els[i].addEventListener('click', () => {
				this.add(getData(els[i]))
			}, false)
		}
		return this
	},

	findIcon: function(){
		const els = document.querySelectorAll('.zygoteIco')
		for(let i = els.length; i--;){
			els[i].addEventListener('click', () => this.open(), false)
		}
	},

	findQty: function(){
		const els = document.querySelectorAll('.zygoteQty:not(.zygoteProcessed)')
		for(let i = els.length; i--;){
			this.qty.push(els[i])
		}
		return this
	},

	// Add item to cart with object
	add: function(obj){
		if(typeof obj.qty !== 'number') obj.qty = 1
		if(obj.qty < 1) return this
		obj.price = obj.price.replace('$', '')
		obj.price = Number(obj.price)
		const index = this.findProduct(obj.id)
		if(index !== false){
			this.products[index].qty += obj.qty
		}
		else{
			this.products.push(obj)
		}
		this.update()
		console.log(obj)
		console.log(this.open)
		if(obj.openCart){
			this.open()
		}
		return this
	},

	// Remove item from cart by ID
	remove: function(id){
		const index = this.findProduct(id)
		if(index !== false){
			this.products.splice(index, 1)
		}
		return this.update()
	},

	// Change quantity of a product by ID
	changeQty: function(id, qty){
		if(qty < 1) return this.remove(id)
		const index = this.findProduct(id)
		if(index !== false){
			this.products[index].qty = qty
		}
		return this.update()
	},

	// Save cart to cookie
	saveCookie: function(){
		try{
			let expires = ""
			let date = new Date()
			date.setTime(date.getTime() + (5*24*60*60*1000))
			document.cookie = `products=${JSON.stringify(this.products)}; expires=${date.toUTCString()}; path=/`
		}
		catch(e){
			console.log(e)
		}
		return this
	},

	// Load cart from cookie
	readCookie: function(){
		try{
			let nameEQ = 'products='
			let ca = document.cookie.split(';')
			for(let i=0; i < ca.length; i++) {
				let c = ca[i]
				while (c.charAt(0)==' ') c = c.substring(1,c.length)
				if(c.indexOf(nameEQ) == 0){
					let str = c.substring(nameEQ.length, c.length)
					this.products = JSON.parse(str)
					return this.render()
				}
			}
		}
		catch(e){
			console.log(e)
		}
	},

	// Find a product index by ID
	findProduct: function(id){
		for(let i = this.products.length; i--;){
			if(this.products[i].id == id){
				return i
			}
		}
		return false
	},

	update: function(){
		this.saveCookie()
		return this.render()
	},

	// Render current cart
	render: function(){
		const ids = []
		let totalQty = 0
		// Create/alter new products
		for(let i = 0; i < this.products.length; i++){
			ids.push(this.products[i].id)
			let el = this.els.list.querySelector(`[data-id="${this.products[i].id}"]`)
			// Create new element if it doesn't exist
			if(!el){
				this.els.list.appendChild(listItem(this.products[i]))
			}
			else{
				el.querySelector('[data-qty]').textContent = this.products[i].qty
			}
			totalQty += this.products[i].qty
		}
		// Delete old products
		const els = this.els.list.children
		for(let i = els.length; i--;){
			if(ids.indexOf(els[i].dataset.id) === -1){
				this.els.list.removeChild(els[i])
			}
		}
		if(this.products.length){
			addClass(this.els.container, 'zygoteNotEmpty')
		}
		else{
			removeClass(this.els.container, 'zygoteNotEmpty')
			this.close()
		}
		// Update quantity buttons
		for(let i = this.qty.length; i--;){
			this.qty[i].textContent = totalQty
			if(totalQty) addClass(this.qty[i], 'zygoteHasQty')
			else removeClass(this.qty[i], 'zygoteHasQty')
		}
		return this
	},

	open: function(){
		this.isOpen = true
		addClass(this.body, 'zygoteOpen')
		return this
	},
	close: function(){
		this.isOpen = false
		removeClass(this.body, 'zygoteOpen')
		return this
	},
	toggle: function(){
		this.isOpen = toggleClass(this.body, 'zygoteOpen')
		return this
	}
}




function addClass(el, str){
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index === -1){
		el.className = `${el.className} ${str}`
	}
}
function removeClass(el, str){
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index > -1){
		classes.splice(index, 1)
		el.className = classes.join(' ')
	}
}
function toggleClass(el, str){
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index > -1){
		classes.splice(index, 1)
		el.className = classes.join(' ')
		return false
	}
	else{
		el.className = `${el.className} ${str}`
		return true
	}
}


function listItem(obj){
	const el = document.createElement('li')
	el.dataset.id = obj.id
	el.innerHTML = `
		<div class="zygoteProdImg">
			<a href="${obj.url}"><img src="${obj.img}" /></a>
		</div>
		<div class="zygoteProdName">
			<a href="${obj.url}">${obj.name}</a>
			<span>${obj.desc || ''}</span>
		</div>
		<div class="zygoteProdQty"><span data-qty>${obj.qty}</span></div>
		<div class="zygoteProdPrice">$${obj.price}</div>
		<button class="zygoteProdDelete">Delete</button>
	`
	return el
}

function getData(el){
	const obj = {}
	console.log(el.dataset)
	for(let i in el.dataset){
		obj[i] = (el.dataset[i] !== '') ? el.dataset[i] : true
	}
	return obj
}


window.zygote = new Cart()
