Crafty.c("Flee", {
	setTargetDistanceVector: function() {
	    // gives flee distance
	    return new Crafty.math.Vector2D(this.x - this._targetVector.x ,this.y - this._targetVector.y);	
	},
	arrived: function(length) {
		var viewport = Crafty.viewport.rect();
		var vector = new Crafty.math.Vector2D(viewport._w/2, viewport._h/2);
	    return ((length + 20) >= vector.magnitude());
	},
    init: function() {
	    this.requires("Seek").bind("EnterFrame");
	    return this;
	}
});