Crafty.c("FleePoint", {		
	setTargetVector: function() {
		// this assumes we are fleeing to a point on a toroid
	    this._fleePoint =  new Crafty.math.Vector2D();
		// given a toroid can think of a flee point we are trying to move towards that 
        // is the furthest point on the toroid from the target ...
        var viewport = Crafty.viewport.rect();
		this._fleePoint.x = (this._target.x + viewport._w/2) % viewport._w; 
        this._fleePoint.y = (this._target.y + viewport._h/2) % viewport._h;
	    return this._fleePoint;	
	},
    init: function() {
	    this.requires("Toroidal").bind("EnterFrame");
	    return this;
	}
});