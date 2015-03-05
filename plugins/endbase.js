//@const
var name = "EndBase_Plugin";

//the function below is REQUIRED!!!
function getName() {
//    "use strict";
    return name;
}

//the function below is REQUIRED!!!
function run() {
//    "use strict";
    c.gui.addText("§4EndBase plugin reloaded");
    return true;
}

//the function below is REQUIRED!!!
function getListener() {
//    "use strict";
    return ""; //register 
}

//this is a command, name this function the same name as what you called the command in getCommand

function getBlocks(id) {
    var mySlot = c.invhandler.getItem(id),
        current = c.invhandler.inventory.get(c.invhandler.currentSlot);
    //c.invhandler.swapSlots(mySlot,current);
    return false;
}

function bridge(command) {
//    "use strict";
    var dir = command[2];
        length = parseInt(command[1], 10);
        ifx = parseInt(0);
        ifz = parseInt(0);
        i = parseInt(0);
    if (dir == "x") {
        ifx = parseInt(1);
    } else {
        ifz = parseInt(1);
    }
    var initial = new Packages.me.woder.world.Location(c.location.world,parseInt(c.location.getBlockX()) + parseInt(ifx), c.location.getBlockY() - 1, parseInt(c.location.getBlockZ()) + parseInt(ifz)),
   //find initial placement position
        count = parseInt(c.invhandle.inventory.get(c.invhandle.currentSlot).getCount()),
        id = parseInt(c.invhandle.inventory.get(c.invhandle.currentSlot).getId());
    if (count < 5) {
        c.chat.sendMessage("not enough blocks in hand");
        return;
    }
    
    //stuff we stole in front of us
	var setTimeout,
        clearTimeout,
        setInterval,
        clearInterval;
        
        (function () {
    var timer = new java.util.Timer();
    var counter = 1; 
    var ids = {};

    setTimeout = function (fn,delay) {
        var id = counter++;
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay);
        return id;
    }

    clearTimeout = function (id) {
        ids[id].cancel();
        timer.purge();
        delete ids[id];
    }

    setInterval = function (fn,delay) {
        var id = counter++; 
        ids[id] = new JavaAdapter(java.util.TimerTask,{run: fn});
        timer.schedule(ids[id],delay,delay);
        return id;
    }

    clearInterval = clearTimeout;

})()
	//stuff we stole behind us
    
    var ourID = setInterval(
       function placemovedig() {
           //c.chat.sendMessage("step= "+i);
           var b = c.whandle.getWorld().getBlock(parseInt(ifx * i) + parseInt(initial.getX()), initial.getY(), parseInt(initial.getZ()) + parseInt(ifz * i));
           c.whandle.getWorld().placeBlock(b.getX(), b.getY(), b.getZ(), 3);
           //place block in front
           count--;
           if (!(count > 0)) {
               if (!getBlocks(id)) {
                   i = length;
               }
           }
           if (i!=0) {
               var l = new Packages.me.woder.world.Location(c.whandle.getWorld(), c.location.getX(), c.location.getY() - 1, c.location.getZ());
               var loc = new Packages.me.woder.world.Location(c.whandle.getWorld(), parseInt(c.location.getX()) + parseInt(ifx), c.location.getY()-1, parseInt(c.location.getZ()) + parseInt(ifz));
               c.move.runPathing(l, loc, 10);
           }
           if (!(i < 8)) {
               //c.chandle.processConsoleCommand("!dig " + (ifx * -3) + " -1 " + (ifz * -3));
               //and break block behind us
           }
           c.chandle.processConsoleCommand("!dig " + (ifx * -3) + " -1 " + (ifz * -3));
           i++;
    }, 1000);
    setTimeout(function() {clearInterval(ourID);},length*parseInt(1000)+parseInt(1));
}



function test(command) {
    var a = parseInt(command[1]);
    var b = parseInt(command[2])
    
    c.chat.sendMessage("test1");
    c.chat.sendMessage(1+a);
    c.chat.sendMessage(1+b);
}

//the function below is REQUIRED!!!
function getCommand() { //nameofcommand;description,nameofcommand;description
    c.perms.register(1, "bridge");
    c.perms.register(1, "test");
    return "bridge;constructs a bridge of a passed length,test;tests the input for hacks";
}
