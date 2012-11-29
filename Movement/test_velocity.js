module( "velocity tests");
test( "a basic test example", function() {
  var value = "hello";
  equal( value, "hello", "We expect value to be hello" );
});
test( "testing velocity initialization", function() {
  var target = Crafty.e("2D, Velocity").attr({w: 31, h: 42}).origin(15,35).velocity(-1,-2,0);
  //debugger
  equal( target._velocity.x, -1, "We expect x velocity to be -1" );
  equal( target._velocity.y, -2, "We expect y velocity to be -2" );
});