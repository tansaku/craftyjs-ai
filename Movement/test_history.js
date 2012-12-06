module( "history tests");
test( "a basic test example", function() {
  var value = "hello";
  equal( value, "hello", "We expect value to be hello" );
});
test( "testing history long", function() {
   //Crafty.init();
    //Crafty.canvas.init();
  Crafty.viewport.width = 400;
  Crafty.viewport.height = 400;

  var target = Crafty.e("2D");
  target.x = 200;
  target.y = 200;
  var character = Crafty.e("2D, Velocity, History, Seek").velocity(1,3,0).history(100);
  character.x = 0;
  character.y = 0;
  character.seek(target);
  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  //debugger
  equal( character._target, target, "We expected to be seeking the target" );
  // so this is simulating the enter frame function 
  // would be great if we could be plugging directly into CraftyJS enter frame or something ...

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);

  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  ok(character._velocity.x!==0, "seeking should not make character velocity x 0" );
  ok(character._velocity.y!==0, "seeking should not make character velocity y 0" );

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);
  equal( character.historyArray.length, 1, "expected to have one element in history");

  Crafty.timer.simulateFrames(200);
  equal( character.historyArray.length, 12, "expected to have 12 elements in history");
 
  character._timeToTarget = 9;
  character.adjustHistory(character._timeToTarget, character._maxSpeed, character._radius);
  equal( character.historyArray.length, 12, "expected to still have 12 elements in history");
   
});

test( "testing history short", function() {
   //Crafty.init();
    //Crafty.canvas.init();
  Crafty.viewport.width = 400;
  Crafty.viewport.height = 400;

  var target = Crafty.e("2D");
  target.x = 10;
  target.y = 10;
  var character = Crafty.e("2D, Velocity, History, Seek").velocity(1,3,0).history(100);
  character.x = 0;
  character.y = 0;
  character.seek(target);
  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  //debugger
  equal( character._target, target, "We expected to be seeking the target" );
  // so this is simulating the enter frame function 
  // would be great if we could be plugging directly into CraftyJS enter frame or something ...

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);

  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  ok(character._velocity.x!==0, "seeking should not make character velocity x 0" );
  ok(character._velocity.y!==0, "seeking should not make character velocity y 0" );

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);
  equal( character.historyArray.length, 1, "expected to have one element in history");

  Crafty.timer.simulateFrames(200);
  equal( character.historyArray.length, 4, "expected to have 12 elements in history");
 
  character._timeToTarget = 9;
  character.adjustHistory(character._timeToTarget, character._maxSpeed, character._radius);
  equal( character.historyArray.length, 4, "expected to still have 12 elements in history");
   
});

test( "testing history max speed 0", function() {
   //Crafty.init();
    //Crafty.canvas.init();
  Crafty.viewport.width = 400;
  Crafty.viewport.height = 400;

  var target = Crafty.e("2D");
  target.x = 10;
  target.y = 10;
  var character = Crafty.e("2D, Velocity, History, Seek").velocity(1,3,0).history(100);
  character.x = 0;
  character.y = 0;
  character.seek(target);
  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  //debugger
  equal( character._target, target, "We expected to be seeking the target" );
  // so this is simulating the enter frame function 
  // would be great if we could be plugging directly into CraftyJS enter frame or something ...

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);

  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  ok(character._velocity.x!==0, "seeking should not make character velocity x 0" );
  ok(character._velocity.y!==0, "seeking should not make character velocity y 0" );

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);
  equal( character.historyArray.length, 1, "expected to have one element in history");

  Crafty.timer.simulateFrames(200);
  equal( character.historyArray.length, 4, "expected to have 4 elements in history");
 
  character._maxSpeed = 0;
  character.adjustHistory(character._timeToTarget, character._maxSpeed, character._radius);
  equal( character.historyArray.length, 4, "expected to still have 4 elements in history");
  for(var i in character.historyArray){
    equal(character.historyArray[i]._velocity.magnitude(), 0, "expected "+i+" to have zero velocity");
  }
   
});

test( "testing dynamic history max speed 0", function() {
   //Crafty.init();
    //Crafty.canvas.init();
  Crafty.viewport.width = 400;
  Crafty.viewport.height = 400;

  var target = Crafty.e("2D, Position");
  target.x = 10;
  target.y = 10;
  var character = Crafty.e("2D, Velocity, Position, History, DynamicSeek, Steering").velocity(1,3,0).history(100);
  character.x = 0;
  character.y = 0;
  character.seek(target);
  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  //debugger
  equal( character._target, target, "We expected to be seeking the target" );
  // so this is simulating the enter frame function 
  // would be great if we could be plugging directly into CraftyJS enter frame or something ...

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);

  ok(!isNaN(character.x), "seeking should not make character x NaN" );
  ok(!isNaN(character.y), "seeking should not make character y NaN" );
  ok(character._velocity.x!==0, "seeking should not make character velocity x 0" );
  ok(character._velocity.y!==0, "seeking should not make character velocity y 0" );

  equal( character.historyArray.length, 0, "expected to have zero elements in history");
  Crafty.timer.simulateFrames(1);
  equal( character.historyArray.length, 1, "expected to have one element in history");

  Crafty.timer.simulateFrames(200);
  equal( character.historyArray.length, 41, "expected to have 41 elements in history");
 
  character._maxSpeed = 0;
  character.adjustHistory(character._timeToTarget, character._maxSpeed, character._radius);
  equal( character.historyArray.length, 41, "expected to still have 41 elements in history");
  for(var i in character.historyArray){
    equal(character.historyArray[i]._velocity.magnitude(), 0, "expected "+i+" to have zero velocity");
  }
   
});