function pulsar() {}

pulsar.init = function(id) {
  engine.softTakeover("[Master]","crossfader",true);
  engine.softTakeover("[Channel1]","volume",true);
  engine.softTakeover("[Channel1]","rate",true);
  engine.softTakeover("[Channel2]","volume",true);
  engine.softTakeover("[Channel2]","rate",true);
}

pulsar.shutdown = function(id) {
  // nothing to do here
}

pulsar.rubber = function(channel, control, value, status, group) {
  channel = "[Channel" + channel + "]";
  if((control == 0x02 || control == 0xB0)  && value > 0) { //0x3C =  jog 2 clockwise, 0x3A =  jog 1 clockwise
    engine.setValue(group, 'rate_temp_down', 0);
    engine.setValue(group, 'rate_temp_up', 1);
  } else if ((control == 0x3B || control == 0x3D) && value > 0) { 
    engine.setValue(group, 'rate_temp_up', 0);
    engine.setValue(group, 'rate_temp_down', 1);    
  } else {
    engine.setValue(group, 'rate_temp_down', 0);
    engine.setValue(group, 'rate_temp_up', 0);    
  }
}

pulsar.previewSeek = function(channel, control, value, status, group) {  
  engine.setValue(group, 'playposition', value/127);      
}


pulsar.jogRotate = function(channel, control, value, status, group) { 
  var scrConst = 1;  //Adjust to suit. 
  var scrVal = (value == 0x41)?scrConst:-scrConst;
  engine.setValue(group, "jog", scrVal);
}

//https://www.mixxx.org/wiki/doku.php/midi_scripting#scratching_and_jog_wheels
pulsar.scratchRotate = function(channel, control, value, status, group) { 
  var scrConst = 1;  //Adjust to suit. 
  var scrVal = (value == 0x41)?scrConst:-scrConst;
  engine.scratchTick(control - 0x10 + 1, scrVal);
}


pulsar.scratchTouch = function(channel, control, value, status, group) { 
  if (value == 0x7f) {
    var intervalsPerRev = 80;
    var rpm = 15.3; //Adjust to suit.
    var alpha = 0.125; //Adjust to suit. 
    var beta = (alpha/32); //Adjust to suit.
    engine.scratchEnable(control - 37 , intervalsPerRev, rpm, alpha, beta, false);  
  } else {
    engine.scratchDisable(control - 37 );      
  }
}

pulsar.volume     = function (channel, control, value, status, group) {
  engine.setValue(group, "volume", (value/127)); 
};

pulsar.rate       = function (channel, control, value, status, group) {
  engine.setValue(group, "rate",  ((value-64)/63));
};

pulsar.crossfader = function (channel, control, value, status, group) {
  engine.setValue(group, "crossfader", ((value-64)/63));
};

pulsar.scroll = function (midino, control, value, status, group) {
  // This function scroll up or down 10 tracks on the main playlist/library

  if(control == 0x0E && value == 0x3F) {
    engine.setValue("[Library]", "MoveUp", "1");
    }
  if (control == 0x0E && value == 0x41) {
    engine.setValue("[Library]", "MoveDown", "1");
    }
};

// pulsar.scrollMore = function (midino, control, value, status, group) {
//   // This function scroll up or down 10 tracks on the main playlist/library

//   if(control == 0x0E && value == 0x3F) {
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "1");
//     engine.setValue("[Library]", "MoveUp", "0");
//     }
//   if (control == 0x0E && value == 0x41) {
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "1");
//     engine.setValue("[Library]", "MoveDown", "0");
//     }
//};