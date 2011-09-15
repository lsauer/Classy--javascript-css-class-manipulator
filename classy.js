/**
HTMLElement css-class setter/getter Object
HTML Elements can have several classes, separated by space ' '. The rightmost css-class takes precedence
author: L.Sauer 2011, MIT License
*/		
Classy = function(el){
	//constructor
	if(el && el.constructor === ''.constructor){ //I dislike 'typeof'
		el = document.getElementsByClassName(el)[0];
	}
	//private shared
	var	that = el; //set to DOM element
	return {
		self : el,
		//set a new element
		set : function(ele){if(!ele.length){ this.self = ele; }else{this.self = ele[0]; that = ele;} return this;}, 
		//object, function, callbackEnd
		foreach : function (cls, o, f) {	//classname, object, function
			for(var i=0; i<o.length; i++) { // iterate through all objects
				f(cls, o[i]); // execute a function and make the obj, objIndex available
			}
		},
		has : function (cls, ele) {
			//this.foreach(this.self, has, )
			if( this.self ) {ele =  this.self;}
				var reg = new RegExp('(^|\\s)' + cls + '(\\s?)');
				return ele.className.match(reg);
		},
		add : function (cls, ele) {
			if( this.self ) {ele =  this.self;}
			if (!this.has(cls, ele)) {ele.className += ' ' + cls;}
			return this;
		},
		del : function (cls, ele) {
			if( this.self ) {ele =  this.self;}
			if (this.has(cls, ele)) {
				var reg = new RegExp('(^|\\s)' + cls + '(\\s?)');
				ele.className = ele.className.replace(reg, ' ');
			}
			return this;
		},
		repl : function (cls,clsNew, ele)  {
			if( this.self ) {ele =  this.self;}
			if(this.has(cls, ele)) {
				this.del(cls, ele);
			}
			this.add(clsNew, ele);
			return this;
		},
		focus : function(ele){
			if( this.self ) {ele =  this.self;}
			var i = 100;var pos = {x:0,y:0};
			while(ele != null ){
				pos.x += ele.offsetLeft;
				pos.y += ele.offsetTop;
				ele = ele.offsetParent;
			  }
			window.scrollTo(pos.x,pos.y);
		},
		prototype : {toString :function(){
			return JSON.stringify(self)
		}},
	};
};