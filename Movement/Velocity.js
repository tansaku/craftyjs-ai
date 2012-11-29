Crafty.c("Velocity",{
	_MF_rotation:0,
    _time:1,
	_maxSpeed: 10,
    init:function(){
	    this._viewport = Crafty.viewport.rect();
        this._velocity = new Crafty.math.Vector2D();
        this.bind("EnterFrame", function () {

            // TODO extract this so that we can call it by history fundion TODO

            // updates position according to current velocity wrapped for toroid
            //this.x = (viewport._w + this.x + this._velocity.x * this._time) % viewport._w;
            //this.y = (viewport._h + this.y + this._velocity.y * this._time) % viewport._h;

            this.x = this.newXPosition();
            this.y = this.newYPosition();
			this.rotation += this._MF_rotation * this._time; 

        });
        return this;
    },
    newXPosition: function(){
	  return this.newPosition(this.x, this._velocity.x, this._viewport._w);
    },
    newYPosition: function(){
	  return this.newPosition(this.y, this._velocity.y, this._viewport._h);
    },
    newPosition: function(variable,velocity,toroid){
      return ((toroid + variable + velocity * this._time) % toroid);
    },
	steering: function(x, y) {
		if(isNaN(x)) throw "x is a NaN"
    	if(isNaN(y)) throw "y is a NaN"
        this._velocity.x = x;
        this._velocity.y = y;
        return this;
    },
    velocity: function(x,y,MF_rotation){
    	if(isNaN(x)) throw "x is a NaN"
    	if(isNaN(y)) throw "y is a NaN"
	    this.steering(x,y);
	    this._MF_rotation = MF_rotation;
        return this;
    },
    position: function() {
        return new Crafty.math.Vector2D(this._x, this._y);
    },
    getNewOrientation: function() {
        var newOrientation = this._rotation;
        // Make sure we have a velocity (if not just return current orientation)
        if (this._velocity.magnitude() !== 0){
          // Calculate orientation using an arc tangent of
          // the velocity components. 
          newOrientation = (Math.atan2(this._velocity.y,this._velocity.x) * 180.0/ Math.PI) + 90.0;
        }
        return newOrientation;
    },
    maxSpeed: function(maxSpeed) {
        this._maxSpeed = maxSpeed;
        return this;
    }
});

