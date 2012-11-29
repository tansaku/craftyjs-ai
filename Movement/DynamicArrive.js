Crafty.c("DynamicSeek", {
    _count: 0,
    _radius: 0,
    _slowRadius: 50,
    _timeToTarget: 0.1,
    _maxAcceleration: 10,
    init: function() {
        var viewport = Crafty.viewport.rect();
        this.requires("Steering").bind("EnterFrame");
        this.bind("EnterFrame", function() {
            if (this._target) {
                //debugger;
                this._steeringVector = this._target.position().subtract(this.position());
                
                //seekCharacterTxt.text("Red steering vector (Raw): " + character._steeringVector.x.toFixed(0) + ", " + character._steeringVector.y.toFixed(0) + ", vel=" + this._steeringVector.magnitude().toFixed(0)+ ", max=" + this._maxSpeed)
                var targetSpeed = 0;
                
                if (this._steeringVector.magnitude() < this._radius) {
                    this._steeringVector.setValues(0, 0);
                } 
                else {
                    if (this._steeringVector.magnitude() > this._slowRadius){
                        targetSpeed = this._maxSpeed;
                    }
                    else {
                        // calculate a scaled speed
                        targetSpeed = this._maxSpeed * this._steeringVector.magnitude()/this._slowRadius;
                    }
                    
                    this._steeringVector.normalize();
                    this._steeringVector.scale(targetSpeed);

                    this._steeringVector.x /= this._timeToTarget;
                    this._steeringVector.y /= this._timeToTarget;

                    // Acceleration tries to get to the target velocity
                    this._steeringVector.subtract(this._velocity);

                    if (this._steeringVector.magnitude() > this._maxAcceleration) {
                        this._steeringVector.normalize();
                        this._steeringVector.scale(this._maxAcceleration);
                    }

                    
                }

                //altSeekCharacterTxt.text("Red steering vector (clipped): " + character._steeringVector.x.toFixed(0) + ", " + character._steeringVector.y.toFixed(0) + ", vel=" + this._steeringVector.magnitude().toFixed(0)+ ", max=" + this._maxSpeed)

                this.rotation = this.getNewOrientation();

                this._angularVelocity = 0; // could be pulled out
                this._steering.linear = this._steeringVector;
                this._steering.angular = this._angularVelocity;
            }
            return this;
        });
    },
    seek: function(target) {
        this._target = target;
        return this;
    }
});