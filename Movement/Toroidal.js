Crafty.c("Toroidal", {		
	updateSteeringVector: function() {
		var steeringVector = this.steeringVectorInit();
		// calculates the alternate toroidal distances
		var viewport = Crafty.viewport.rect();
		this._targetAltDistanceVector.x = (viewport._w - Math.abs(this._targetDistanceVector.x)) * - this._targetDistanceVector.x/Math.abs(this._targetDistanceVector.x);
        this._targetAltDistanceVector.y = (viewport._h - Math.abs(this._targetDistanceVector.y)) * - this._targetDistanceVector.y/Math.abs(this._targetDistanceVector.y);

        // prefers steering across shortest path given toroid
			if(Math.abs(this._targetAltDistanceVector.x) < Math.abs(this._targetDistanceVector.x)){
		    steeringVector.x = this._targetAltDistanceVector.x; 
		}
		if(Math.abs(this._targetAltDistanceVector.y) < Math.abs(this._targetDistanceVector.y)){
		    steeringVector.y = this._targetAltDistanceVector.y; 
		}	
		return steeringVector;
	},
    init: function() {
	    this.requires("Seek").bind("EnterFrame");
	    return this;
	}
});