//Player Stats
var players = function(className,health,magic,defense,attack,stats,inv) {
    //Constructor
    this.className = className;
    this.health = health;
    this.magic = magic;
    this.defense = defense;
    this.attack = attack;
    //0=Str, 1=Dex, 2=Con, 3=Int, 4=Wis, 5=Cha
    this.stats = stats;
    this.inv = inv;
    
    //Use an Item
    this.useItem = function(item){
    	for(var i=0; i<this.inv.length; i++){
    		if(this.inv[i].name == item){
	    		if(this.inv[i].useable == true){
	    			//Remove Item after Usage
	    			player.inv.splice(i,1);
	    			
	    			return item;
	    		}
    		}
    	}
    	return false;
    };
    this.equipItem = function(item){
    	if(item.weapon == true){
    		player.attack += item.stats;
    		
    		item.weapon = false;
    		
    		return true;
    	}
    	else if(item.armor == true){
    		player.stats += item.stats;
    		
    		item.armor = false;
    		
    		return true;
    	}
    	else{
    		return false;
    	}
    };
    //Add to Inv
    this.addItem = function(item){
    	this.inv.push(item);
    };
    //Drop from Inv
    this.dropItem = function(item){
    	for(var i=0; i<this.inv.length; i++){
    		if(this.inv[i].name == item){
    			//Change Pick Up Setting
    			this.inv[i].pickUp = true;
    			
    			if(this.inv[i].weapon == true){
    				player.attack -= this.inv[i].stats;
    			}
    			if(this.inv[i].armor == true){
    				player.defense -= this.inv[i].stats;
    			}
    			
    			//Switch from Player to Room Inventory
    			curRoom.addItem(this.inv[i]);
    			player.inv.splice(i,1);
    			
    			return true;
    		}
    	}
    	return false;
    };
};

//Monster Stats
var monsters = function(health,defense,attack) {
    this.health = health;
    this.defense = defense;
    this.attack = attack;
};
//Monster Types
var testMon = new monsters(0,0,0);
var Harambe = new monsters(200,20,20);
var goblin = new monsters(50,5,6);
var skeleton = new monsters(100,5,6);
var ogre = new monsters(150,5,6);
var monstername;
//Selected Monster
var selectedmonster = testMon;

//Item Class
var Items = function(name,use,pick,weap,arm,desc,stats,equip){
	//Constructor
	this.name = name;
	this.useable = use;
	this.pickUp = pick;
	this.weapon = weap;
	this.armor = arm;
	this.desc = desc;
	this.stats = stats;
	
	//Functions
	this.changeDesc = function(newDesc){
		this.desc = newdesc;
	};
	this.changeSettings = function(newUse,newPick,newWeap,newArm){
		this.useable = newUse;
		this.pickUp = newPick;
		this.weapon = newWeap;
		this.armor = newArm;
	};
};
//List of Items
var sword = new Items("sword",false,true,true,false,"Rusty Sword",5,false);
var club = new Items("club",false,true,true,false,"Basic Club",3,true);
var leatherArmor = new Items("leather armor",false,false,false,true,"Basic Leather Armor",2,true);
var key = new Items("key",true,true,false,false,"Rusty Key",0,false);
var stone_key = new Items("stone key",true,true,false,false,"Stone Key to get inside the Temple",0,false);

//Player Inventory
var playerInv = [club,leatherArmor];
var roomInv = [sword,key];
var room_0Inv = [stone_key];

/* First room = Hall of Champions; choose class
 * then teleported to Jungle Clearing, with Harambe
 * 
 * Harambe enters from the west, secret room
 * not described after initial encounter
 * 
 * Harambe follows player through rooms
 * Harambe will give hints to players with "Tell Harambe Help"
 */

//Room Class
var Rooms = function(name,desc,item,roomNum,exit){
	//Constructor
	this.name = name;
	this.desc = name + ": " + desc;
	this.enemy = testMon;
	this.item = item;
	this.roomNum = roomNum;
	this.exit = exit;
	this.inRoom = '[ '+roomNum+' ]';
	
	//Functions
	this.setRoom = function(){
		this.inRoom = '[ x ]';
	};
	this.setSecret = function(){
		this.inRoom = '[ w ]';
	};
	this.switchRooms = function(room){
		this.inRoom = '[ x ]';
		room.inRoom = '[ '+room.roomNum+' ]';
	};
	this.roomDesc = function(){
		var temp = this.desc;
		for(var i=0; i<this.item.length; i++){
			temp = this.desc + " " +
			this.item[i].desc + " on the ground of " + this.name+ ".";	
		}
		return temp;
	};
	this.addItem = function(newItem){
		this.item.push(newItem);
	};
	this.removeItem = function(){
		this.item.pop();
	};
	this.moveRoom = function(newRoom,newNum,newExit,newDesc){
		this.name = newRoom;
		this.roomNum = newNum;
		this.exit = newExit;
		this.desc = newDesc;
	};
	this.openRoom = function(roomNum,direction){
		this.exit.push(roomNum,direction);
	};
	this.findItem = function(itemName){
		for(var i=0; i<this.item.length; i++){
			if(this.item[i].name == itemName){
				if(this.item[i].pickUp == true){
					//Change Pick Up Setting
					this.item[i].pickUp = false;
					
					//Switch from Room to Player Inventory
					player.addItem(this.item[i]);
					this.item.splice(i,1);
					
					return true;
				}
			}
		}
		return false;
	};
	this.checkExit = function(direction,exit){
		for(var i=1; i<exit.length; i+=2){
			if(direction == this.exit[i]){
				return true;
			}
		}
		return false;
	};
};
//Room Descriptions 
var roomDescs = [
	//Room 0
	"You stand in a tranquil clearing in the middle of a jungle. "+
	   "The tall canopy of trees shades you from the bright sun, "+
	   "except for the few beams of light that break through the exotic leaves above you. "+
	   "Dense tall grass surrounds the area. "+
	   "The entrance to a mysterious cave looms to the NORTH.",
	//Room 1
	"An ornate door is built into the NORTH wall of the cave entrance. "+
	   "A small crudely written SIGN is nailed to the front of the door. "+
	   "A small potted sunflower sits in the corner of the entrance.",
	//Room 2
	"This room is a mess of furniture and old banana peels. "+
	   "A large wooden dining table takes up most of the middle of the room, "+
	   "with chairs, rugs, and bookshelves taking up the rest. "+
	   "An empty fruit BOWL rests at the center of the dining table. "+
	   "A grand PORTRAIT of Doctor Zaius hangs on the north wall. "+
	   "The cave entrance door leads to the SOUTH. "+
	   "Another door leads to the EAST.",
	//Room 3
	"You stand in an immaculately clean room. "+
	   "Paper walls surround a bamboo mat floor. "+
	   "A smoldering lantern hangs from a wooden beam crossing the ceiling. "+
	   "A cheesed off looking target dummy is propped up in the center of the room. "+
	   "A door leads WEST. "+
	   "A sliding paper door leads NORTH.",
	//Room 4
	"An ominous red field of light cuts this vaulting chamber in half. "+
	   "It shimmers and pulses as you draw closer to it. "+
	   "You feel as if passing through the field would harm you so you decide not to. "+
	   "It blocks off the WEST side of the room.",
	//Room 5
	"An ominous red field of light cuts this vaulting chamber in half. "+
	   "It shimmers and pulses as you draw closer to it. "+
	   "You feel as if passing through the field would harm you so you decide not to. "+
	   "It blocks off the EAST side of the room. "+
	   "Harambe blocks off an exit to the WEST. "+
	   "A small wooden BOX with an attached post-it NOTE sits on a stone slab off to one side of the room.",
	//Room 6
	"You stand before three large marble statue of different champions. "+
	   "The WIZARD holds a staff and wears a pointed starfield hat. "+
	   "The FIGHTER lifts a sword up to the ceiling and carries a helmet under his arm. "+
	   "The CLERIC has a pool of burning oil in the palm of her hand and is giving a pleasent smile. "+
	   "Marble pillars jut out of the walls at each corner of the room, "+
	   "holding up the domed ceiling that is painted with the constellations. "+
	   "A dark iron door leads to the NORTH. "+
	   "An passageway leads to the EAST.",
	//Room 7
	"Beyond the tall grass is a secret Gorilla Patch. "+
	   "A giant banana tree extends from the center of the patch into the sky. "+
	   "Leaning on the tree is a strange OBJECT. "+
	   "A break in the tall grass leads to the EAST."];
//Create other Rooms for map
var room_0 = new Rooms("Jungle Clearing",roomDescs[0],room_0Inv,0,new Array(7,"E"));
var room_1 = new Rooms("Tunnel Entrance",roomDescs[1],roomInv,1,new Array(0,"S",2,"N"));
var room_2 = new Rooms("Ape Den",roomDescs[2],roomInv,2,new Array(1,"S",3,"E"));
var room_3 = new Rooms("Dojo",roomDescs[3],roomInv,3,new Array(2,"W",4,"N"));
var room_4 = new Rooms("Forcefield Room",roomDescs[4],roomInv,4,new Array(3,"S",5,"W"));
var room_5 = new Rooms("Treasure Depository",roomDescs[5],roomInv,5,new Array(4,"E",6,"E"));
var room_6 = new Rooms("Hall of Champions",roomDescs[6],roomInv,6,new Array(5,"E"));
var room_7 = new Rooms("Secret Gorilla Patch",roomDescs[7],roomInv,7,new Array(0,"E"));
room_7.setSecret();

//Current Room; default Room 0
var curRoom = room_0;
room_0.setRoom();

//Starting Player Class
var startStats = [1,1,1,1,1,1];
var startPlayer = new players("Citizen",100,25,1,1,startStats,playerInv);
var player = startPlayer;


var gameSetup = function(className){
	$("<p>Class Created: " + className + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            
    document.getElementById("form-input").style.display = null;
    document.getElementById("help_command").style.display = null;
    
    document.getElementById("message_startgame").style.display = "none";
    document.getElementById("warButton").style.display = "none";
    document.getElementById("wizButton").style.display = "none";
    document.getElementById("rogButton").style.display = "none";
    
	$("<p>" + curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
};

//Class Buttons; Sets Class and reveals Textbox
document.getElementById("warButton").onclick = function(){	
    var stats = [3,1,1,1,1,1];
    player = new players("Warrior",400,50,10,10,stats,playerInv);

    gameSetup(player.className);
    
    displayStats(player);
    displayInv(player);
};
document.getElementById("rogButton").onclick = function(){
	var stats = [1,3,1,1,1,1];  
    player = new players("Rogue",300,75,8,6,stats,playerInv);

    gameSetup(player.className);
    
    displayStats(player);
    displayInv(player);
};
document.getElementById("wizButton").onclick = function(){
	var stats = [1,1,1,3,1,1];	
    player = new players("Wizard",250,150,5,5,stats,playerInv);

    gameSetup(player.className);
    
    displayStats(player);
    displayInv(player);
};

//Display Functions
//Player Display
var displayStats = function(player){
    $("div.class-info").replaceWith('<div class="class-info">'+
    '<p><strong>Class:</strong> '+player.className+'</p>'+
    '<p><strong>Hp:</strong> '+player.health+'<strong> Mp:</strong> '+player.magic+'</p>'+
    '<p><strong>Attack:</strong> '+player.attack+'<strong> Defense:</strong> '+player.defense+'</p>'+
    '<p><strong>Str:</strong> '+player.stats[0]+'</p>'+
    '<p><strong>Dex:</strong> '+player.stats[1]+'</p>'+
    '<p><strong>Con:</strong> '+player.stats[2]+'</p>'+
    '<p><strong>Int:</strong> '+player.stats[3]+'</p>'+
    '<p><strong>Wis:</strong> '+player.stats[4]+'</p>'+
    '<p><strong>Cha:</strong> '+player.stats[5]+'</p>'+
    '</div>'
    );
};
var displayInv = function(player){	
	//Refresh Player Inv
	$("div.user-inv").replaceWith('<div class="user-inv">'+
		'<h4><strong>User Inventory:</strong></h4>'+
		'<div id="item-placeholder"></p>'+
	'</div>'
    );
	//Load in new Inv
	for(var i=0; i<player.inv.length; i++){
		$("<p>"+player.inv[i].name.charAt(0).toUpperCase()+
		player.inv[i].name.slice(1)+"</p>").hide().insertBefore("#item-placeholder").fadeIn(1000);
	}
};
function showMap(){
	$("div.map-ui").replaceWith('<div class="map-ui">'+
		'<p> '+room_6.inRoom+' '+room_5.inRoom+' '+room_4.inRoom+' </p>'+
		'<p> [ w ] '+room_2.inRoom+' '+room_3.inRoom+' </p>'+
		'<p> [ w ] '+room_1.inRoom+' [ w ] </p>'+
		'<p> '+room_7.inRoom+' '+room_0.inRoom+' [ w ] </p>'+
	'</div>');
}

//Battle Variables
var monsterdead = 0;
var playerdead = 0;

//Attack Function
function AttackPhase(attacktype)
{
    $("<p>Combat Initiated!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    $("<p> " + monstername + "'s Health is " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    $("<p>" + player.className + "'s Health is " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
  
    //Player Turn
    if(attacktype == "normal")
    {
        $("<p>Player attacks for " + Math.ceil(Math.random(player.attack)*10+player.stats[0]) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        selectedmonster.health = selectedmonster.health - Math.ceil(Math.random(player.attack)*10+player.stats[0]-selectedmonster.defense);
        $("<p> " + monstername + "'s Health is now " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }
    else if(attacktype == "spell")
    {
        $("<p>Player attacks for " + Math.ceil(Math.random(8)*10+player.INT) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        selectedmonster.health = selectedmonster.health - Math.ceil(Math.random(8)*10+player.stats[3]);
        $("<p> " + monstername + "'s Health is now " + selectedmonster.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }
    else if(attacktype == "buff")
    {
        $("<p>Player heals for " + Math.ceil(Math.random(player.WIS)*10+8) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
        player.health = player.health + Math.ceil(Math.random(player.stats[4])*10+8);
        $("<p> " + player.className + "'s Health is now " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }

    //Monster is Dead
    if (selectedmonster.health < 0)
    {
        monsterdead = 1;
        battle = 0;
        $("<p>" + player.className + " has won!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    }
    else 
    {
        //Monster's Turn
        $("<p>Monster Attacks!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        
        player.health = player.health - Math.ceil(Math.random(selectedmonster.str)+10-player.defense);
        $("<p>" + player.className + "'s Health is now " + player.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
    }       
    //Player is dead
    if(player.health < 0)
    {
        playerdead = 1;
        battle = 0;
        $("<p> "+ monstername + " has won!</p>").hide().insertBefore("#placeholder").fadeIn(1000);   
    }                     
}

//Map Movement
function moveMap(direction)
{       
    if(direction == "north")
    {
        if(curRoom.checkExit("N",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 0)
        	{
        		curRoom = room_1;
        		room_1.switchRooms(room_0);
        	}
        	else if(curRoom.roomNum == 1)
        	{
        		curRoom = room_2;
        		room_2.switchRooms(room_1);
        	}
        	else if(curRoom.roomNum == 3)
        	{
        		curRoom = room_4;
        		room_4.switchRooms(room_3);
        	}
        	$("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "south")
    {
        if(curRoom.checkExit("S",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 4)
        	{
        		curRoom = room_3;
        		room_3.switchRooms(room_4);
        	}
        	else if(curRoom.roomNum == 2)
        	{
        		curRoom = room_1;
        		room_1.switchRooms(room_2);
        	}
        	else if(curRoom.roomNum == 1)
        	{
        		curRoom = room_0;
        		room_0.switchRooms(room_1);
        	}
        	$("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "west")
    {
        if(curRoom.checkExit("W",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 0)
        	{
        		curRoom = room_7;
        		room_7.switchRooms(room_0);
        	}
        	else if(curRoom.roomNum == 3)
        	{
        		curRoom = room_2;
        		room_2.switchRooms(room_3);
        	}
        	else if(curRoom.roomNum == 4)
        	{
        		curRoom = room_5;
        		room_5.switchRooms(room_4);
        	}
        	else if(curRoom.roomNum == 5)
        	{
        		curRoom = room_6;
        		room_6.switchRooms(room_5);
        	}
        	$("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }
    else if(direction == "east")
    {
        if(curRoom.checkExit("E",curRoom.exit) == true)
        {
        	if(curRoom.roomNum == 7)
        	{
        		curRoom = room_0;
        		room_0.switchRooms(room_7);
        	}
        	else if(curRoom.roomNum == 2)
        	{
        		curRoom = room_3;
        		room_3.switchRooms(room_2);
        	}
        	else if(curRoom.roomNum == 5)
        	{
        		curRoom = room_4;
        		room_4.switchRooms(room_5);
        	}
        	else if(curRoom.roomNum == 6)
        	{
        		curRoom = room_5;
        		room_5.switchRooms(room_6);
        	}
        	$("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        	return true;
        }
        else
        {
        	return false;
        }
    }   
}
