Crafty.c("Steering", {
    init: function() {
        this.requires("Velocity").bind("EnterFrame");
        this._steering = {angular:0};
        this._steering.linear = new Crafty.math.Vector2D(0,0);
        this.bind("EnterFrame", function() {
            // updates velocity and MF rotation using steering
            this._velocity.add(this._steering.linear.scale(this._time));
            this._MF_rotation += this._steering.angular * this._time;
            if (this._velocity.magnitude() > this._maxSpeed) {
                this._velocity.normalize();
                this._velocity.scale(this._maxSpeed);
            }
        });
        return this;
    }
});
