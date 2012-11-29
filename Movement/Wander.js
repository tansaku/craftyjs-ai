Crafty.c("Wander", {
	_maxRotation: 5,
	getNewOrientation: function() {
        var newOrientation = this._rotation + (Math.random() - Math.random()) * this._maxRotation;
        var vx = Math.sin(newOrientation * (Math.PI/180)) * this._maxSpeed;
        var vy = -Math.cos(newOrientation * (Math.PI/180)) * this._maxSpeed;
		this.steering(vx,vy);
        return newOrientation;
    },
    init: function() {
	    this.requires("Velocity").bind("EnterFrame");
	    return this;
	}
});