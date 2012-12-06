module( "seek tests");
test( "a basic test example", function() {
  var value = "hello";
  equal( value, "hello", "We expect value to be hello" );
});
test( "testing seek initialization", function() {
  var target = Crafty.e("2D, Velocity").attr({w: 31, h: 42}).origin(15,35).velocity(-1,-2,0);
  var character = Crafty.e("2D, Velocity, Seek").attr({w: 31, h: 42}).origin(15,30).velocity(1,1,0).seek(target);
  //debugger
  equal( character._target, target, "We expected to be seeking the target" );
});
test( "testing seek initialization with NaN <- really a velocity test", function() {
  var target = Crafty.e("2D, Velocity").attr({w: 31, h: 42}).origin(15,35).velocity(-2,-1,0);
  var character = null;
  raises(function(){
  	 character = Crafty.e("2D, Velocity, Seek").attr({w: 31, h: 42}).origin(15,30).velocity(NaN,1,0).seek(target);},
  	"x is a NaN","no exception thrown");
  //debugger
  //equal( character._target, target, "We expected to be seeking the target" );
});

test( "testing update", function() {
  //Crafty.init(400, 400);
  var target = Crafty.e("2D, Velocity").attr({w: 31, h: 42}).origin(15,35).velocity(-2,-1,0);
  target.attr({x:5, y: 10});
  //target._x = 4;
  var character = Crafty.e("2D, Velocity, Seek").attr({w: 31, h: 42}).origin(15,30).velocity(2,1,0).seek(target);
  character.attr({x:10, y: 20});
  //debugger
  character.seekEnterFrame();
  ok(!isNaN(character._steeringVector.x), "update should not make steering vector NaN" );
    //debugger
  equal(character._targetVector.x,target.x);
  equal(character._targetVector.y,target.y);
  equal(character._targetDistanceVector.x,character._targetVector.x - character.x);
  equal(character._targetDistanceVector.y,character._targetVector.y - character.y);
  // These will fail unless we take timeToTarget into account
  equal(character._steeringVector.x,(character._targetVector.x - character.x)/character._timeToTarget);
  equal(character._steeringVector.y,(character._targetVector.y - character.y)/character._timeToTarget);
  // TODO assert that these are all not NaNs
  // adjust assertions taking into account arrival update thing ...

});