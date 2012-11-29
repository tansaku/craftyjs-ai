Crafty.c("DynamicSeek", {
    _count: 0,
    _radius: 0,
    _slowRadius: 50,
    _timeToTarget: 1,
    _maxAcceleration: 0.5,
    init: function() {
        var viewport = Crafty.viewport.rect();
        this.requires("Steering").bind("EnterFrame");
        this.bind("EnterFrame", function() {
            if (this._target) {
                //debugger;
                this._steeringVector = this._target.position().subtract(this.position());
            
                this._steeringVector.normalize();
                this._steeringVector.scale(this._maxAcceleration);

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