Crafty.c("Seek", {
	_target: null,
	_radius: 1,
	_timeToTarget: 10,
	setTargetVector: function() {
	    // default seek behaviour (not flee point)
	    return new Crafty.math.Vector2D(this._target.x,this._target.y);
	},
	setTargetDistanceVector: function() {
	    // default seek behaviour (not flee distance)
	    return new Crafty.math.Vector2D(this._targetVector.x - this.x,this._targetVector.y - this.y);	
	},
	steeringVectorInit: function() {
	    // default seek behaviour (not flee distance)
	    return new Crafty.math.Vector2D(this._targetDistanceVector.x,this._targetDistanceVector.y);
	},
	updateSteeringVector: function() {
		// default to non-toroidal seek
		return this.steeringVectorInit();
	},
	arrived: function(length) {
	    return length < this._radius;
	},
	arrival: function() {
	    // default is closing in on a single point, appropriate for seek and flee to point	
		var length = this._steeringVector.magnitude();
		if(isNaN(length)) throw "lengthis a NaN";
		// Check if we’re within radius
	    if(this.arrived(length)){
		
			// we have arrived, set intended velocity to zero
		  	this._steeringVector.setValues(0,0);
		  	this.checkNotNaN(this._steeringVector);
		}
		else
		{
			// We need to move to our target, we’d like to
			// get there in timeToTarget seconds
			this._steeringVector.x /= this._timeToTarget;
			this._steeringVector.y /= this._timeToTarget;
			this.checkNotNaN(this._steeringVector);
            if(this._steeringVector.magnitude() > this._maxSpeed){
	            this._steeringVector.normalize();
	            this.checkNotNaN(this._steeringVector);
	            this._steeringVector.scaleToMagnitude(this._maxSpeed);
	            this.checkNotNaN(this._steeringVector);
            }
		}
	},
    init: function() {
        this.requires("Velocity").bind("EnterFrame");
        this.bind("EnterFrame",function() {
            this.update();
        });
        return this;
    },
    update: function(){
       if(this._target){
			this._targetVector = this.setTargetVector();
			this._targetDistanceVector = this.setTargetDistanceVector();

			this._steeringVector = this.updateSteeringVector();
			this.checkNotNaN(this._steeringVector);
			this.arrival();
			this.checkNotNaN(this._steeringVector);
			// output steering
	
			this.steering(this._steeringVector.x,this._steeringVector.y);
        }
    },
    checkNotNaN: function(vector){
    	if(isNaN(vector.x)) throw "vector.x is a NaN";
    	if(isNaN(vector.y)) throw "vector.y is a NaN";
    },
    seek: function(target) {
        this._target = target;
        return this;
    },
    radius: function(radius) {
        this._radius = radius;
        return this;
    },
    timeToTarget: function(timeToTarget) {
        this._timeToTarget = timeToTarget;
        return this;
    }
});
