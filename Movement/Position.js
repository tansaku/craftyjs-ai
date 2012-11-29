Crafty.c("Position",{
    init:function(){

        return this;
    },
    position: function() {
        return new Crafty.math.Vector2D(this._x, this._y);
    }
});

