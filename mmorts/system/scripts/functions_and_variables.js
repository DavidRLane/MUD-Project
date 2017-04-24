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
    this.equippedWep = true;
    this.equippedArm = true;
    
    //Find an Inv Item
    this.findItem = function(item){
    	for(var i=0; i<this.inv.length; i++){
    		if(this.inv[i].name == item){
	    		if(this.inv[i].equipped == true)
	    			return true;
    		}
    	}
    	return false;
    };
    
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
    //Equip an Item if the Object can be Equipped
    this.equipItem = function(item){
    	//Check if the Item is actually in the Player's Inventory
    	for(var i=0; i<this.inv.length; i++){
    		if(this.inv[i].name == item){
    			if(this.inv[i].weapon == true && this.inv[i].equipped == false){
		    		if(this.equippedWep == false){
		    			player.attack += this.inv[i].stats;
			    		
			    		//Change Item Settings
			    		this.inv[i].equipped = true;
			    		this.equippedWep = true;
			    		return true;	
		    		}
		    	}
		    	else if(this.inv[i].armor == true && this.inv[i].equipped == false){
		    		if(this.equippedArm == false){
		    			player.stats += this.inv[i].stats;
			    		
			    		//Change Item Settings
			    		this.inv[i].equipped = true;
			    		this.equippedArm = true;
			    		return true;	
		    		}
		    	}
		    	else if(this.inv[i].ring == true && this.inv[i].equipped == false){
		    		//Change Item Settings
		    		this.inv[i].equipped = true;
		    		
		    		return true;
		    	}
		    	else{
		    		return false;
		    	}
    		}
    	}
    	return false;
    };
    //Unequip an Item if it is Equipped
    this.unequipItem = function(item){
    	//Check if the Item is actually in the Player's Inventory
    	for(var i=0; i<this.inv.length; i++){
    		if(this.inv[i].name == item){
    			if(this.inv[i].weapon == true && this.inv[i].equipped == true){
		    		if(this.equippedWep == true){
		    			player.attack -= this.inv[i].stats;
			    		
			    		//Change Item Settings
			    		this.inv[i].equipped = false;
			    		this.equippedWep = false;
			    		return true;	
		    		}		    		
		    	}
		    	else if(this.inv[i].armor == true && this.inv[i].equipped == true){
		    		if(this.equippedArm == true){
		    			player.stats -= this.inv[i].stats;
			    		
			    		//Change Item Settings
			    		this.inv[i].equipped = false;
			    		this.equippedArm = false;
			    		return true;	
		    		}
		    	}
		    	else if(this.inv[i].ring == true && this.inv[i].equipped == true){
		    		//Change Item Settings
		    		this.inv[i].equipped = false;
		    		
		    		return true;
		    	}
		    	else{
		    		return false;
		    	}
    		}
    	}
    	return false;
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
    			
    			if(this.inv[i].weapon == true && this.inv[i].equipped == true){
    				player.attack -= this.inv[i].stats;
    				this.inv[i].equipped = false;
    				this.equippedWep = false;
    			}
    			if(this.inv[i].armor == true && this.inv[i].equipped == true){
    				player.defense -= this.inv[i].stats;
    				this.inv[i].equipped = false;
    				this.equippedArm = false;
    			}
    			if(this.inv[i].ring == true && this.inv[i].equipped == true){
    				this.inv[i].equipped = false;
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
var monsters = function(name,health,defense,attack,dead) {
    this.name = name;
    this.health = health;
    this.defense = defense;
    this.attack = attack;
    this.dead = dead;
};
//Harambe Help for each Room
var harambeOptions = [
	"You should try looking at the '-help' command before moving forward, Ook Ook!",
	"That sign looks important, perhaps you should give it a look, Ook, Ook!",
	"Looks like the door to the EAST is locked, maybe you should look around for a way to unlock it, Ook, Ook!",
	"Precious object lies within the dummy that you will need later, Ook, Ook! Sometimes violence is the only answer, Ook, Ook!",
	"Looks like you may need to wear something to get through here, Ook, Ook!",
	"I'm not letting you through unless you drop that RING, Ook, Ook! It's my special ring, OOK, OOK!",
	"This is our final battle...Ook, Ook!",
	"I don't like this place, Ook..."
];

//Monster Types
var dummy = new monsters("Dummy",50,2,5,false);
var Harambe = new monsters("Harambe",500,999,0,false);

/*
 * First time attacking Harambe he says: So it's treason then...
 * 
 * Combat for Harambe: Harambe thrashes you around like a small child for DAMAGE.
 */

//Item Class
var Items = function(name,equipped,use,pick,weap,arm,ring,desc,stats,equip){
	//Constructor
	this.name = name;
	this.equipped = equipped;
	this.useable = use;
	this.pickUp = pick;
	this.weapon = weap;
	this.armor = arm;
	this.ring = ring;
	this.desc = desc;
	this.stats = stats;
};
//List of Items
//Weapons
var dagger = new Items("dagger",true,false,true,true,false,false,"Steel DAGGER",10,false);
var club = new Items("club",true,false,true,true,false,false,"Basic CLUB",6,false);
var staff = new Items("staff",true,false,true,true,false,false,"Wooden STAFF",4,false);
var rifle = new Items("rifle",false,false,true,true,false,false,"+1 Ape Blaster of Gorilla Bane, reliable RIFLE by trusted Hunters",9999,false);
//Armor
var leatherArmor = new Items("leather armor",true,false,false,false,true,false,"Basic LEATHER ARMOR",2,true);
var steelArmor = new Items("steel armor",true,false,false,false,true,false,"Shiny STEEL ARMOR",4,true);
var clothRobe = new Items("cloth robe",true,false,false,false,true,false,"Fine CLOTH ROBE",1,true);
//Misc Items
var key = new Items("key",false,true,true,false,false,false,"KEY from the portrait of Doctor Zaius",0,false);
var ring = new Items("ring",false,true,true,false,false,true,"Special RING radiating with some sort of enery",0,true);

//Player Inventory
//Default Inv
var playerInv = [];
//Class Inv
var rogInv = [dagger,leatherArmor];
var warInv = [club,steelArmor];
var wizInv = [staff,clothRobe];
//Room Inventory
//Default Inv
var roomInv = [];
var room7Inv = [rifle];

//Room Class
var Rooms = function(name,desc,item,roomNum,exit){
	//Constructor
	this.name = name;
	this.desc = name + ": " + desc;
	this.enemy = dummy;
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
			if(this.item[i].name[0] == 'a' || this.item[i].name[0] == 'A'){
				temp = temp + " An " +
					this.item[i].desc + 
					" lies on the ground.";	
			}
			else{
				temp = temp + " A " +
					this.item[i].desc + 
					" lies on the ground.";
			}
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
	this.checkInRoom = function(item){
		for(var i=0; i<this.item.length; i++){
			if(this.item[i].name == item){
				return true;
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
	"An ornate DOOR is built into the NORTH wall of the cave entrance. "+
	   "A small crudely written SIGN is nailed to the front of the door. "+
	   "A small potted sunflower sits in the corner of the entrance.",
	//Room 2
	"This room is a mess of furniture and old banana peels. "+
	   "A large wooden dining table takes up most of the middle of the room, "+
	   "with chairs, rugs, and bookshelves taking up the rest. "+
	   "An empty fruit bowl rests at the center of the dining table. "+
	   "A grand PORTRAIT of Doctor Zaius hangs on the north wall. "+
	   "The cave entrance door leads to the SOUTH. "+
	   "Another door leads to the EAST.",
	//Room 3
	"You stand in an immaculately clean room. "+
	   "Paper walls surround a bamboo mat floor. "+
	   "A smoldering lantern hangs from a wooden beam crossing the ceiling. "+
	   "A cheesed off looking target DUMMY is propped up in the center of the room. "+
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
	   "Harambe blocks off an exit to the WEST. ",
	//Room 6
	"Tall cement walls surround you. "+
		"You stand before an audience of humans watching you from the railings above. "+
		"The grass on the floor is bloody. "+
		"Harambe looks at you menacingly, as if you were a banana.",
	//Room 7
	"Beyond the tall grass is a secret Gorilla Patch. "+
	   "A giant banana tree extends from the center of the patch into the sky. "+
	   "Leaning on the tree is a strange OBJECT. "+
	   "A break in the tall grass leads to the EAST."];
//Create other Rooms for map
var room_0 = new Rooms("Jungle Clearing",roomDescs[0],roomInv,0,new Array(7,"W",1,"N"));
var room_1 = new Rooms("Tunnel Entrance",roomDescs[1],roomInv,1,new Array(0,"S"));
var room_2 = new Rooms("Ape Den",roomDescs[2],roomInv,2,new Array(1,"S"));
var room_3 = new Rooms("Dojo",roomDescs[3],roomInv,3,new Array(2,"W",4,"N"));
var room_4 = new Rooms("Forcefield Room",roomDescs[4],roomInv,4,new Array(3,"S"));
var room_5 = new Rooms("Treasure Depository",roomDescs[5],roomInv,5,new Array());
var room_6 = new Rooms("Harambe's Lament",roomDescs[6],roomInv,6,new Array());
var room_7 = new Rooms("Secret Gorilla Patch",roomDescs[7],room7Inv,7,new Array(0,"E"));
room_7.setSecret();
room_6.enemy = Harambe;

//Current Room; default Room 0
var curRoom = room_0;
room_0.setRoom();

//Starting Player Class
var startStats = [1,1,1,1,1,1];
var startPlayer = new players("Unknown",100,25,1,1,startStats,playerInv);
var player = startPlayer;

var HarambeHelp = function(roomNum){
	$("<p>" + harambeOptions[roomNum] + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
};

var gameSetup = function(className){
	$("<p>That's right, you packed your trusty "+player.inv[0].name+" for this trip. "+
	"How could you call yourself a "+className+" without your "+player.inv[0].name+"?</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            
    document.getElementById("form-input").style.display = null;
    
    document.getElementById("message-startgame").style.display = "none";
    document.getElementById("message-startgame-button").style.display = "none";
    document.getElementById("warButton").style.display = "none";
    document.getElementById("wizButton").style.display = "none";
    document.getElementById("rogButton").style.display = "none";
    
	$("<p>" + curRoom.roomDesc() + 
	" A mysterious gorilla approaches from the west with an armband reading a name: Harambe. "+
	"He looks at you with an inquisitive expression, awaiting your response...</p>").hide().insertBefore("#placeholder").fadeIn(1000);
	$("<p>For a list of commands, you can type <strong>'-help'.</strong></p>").hide().insertBefore("#placeholder").fadeIn(1000);    
};

//Class Buttons; Sets Class and reveals Textbox
document.getElementById("rogButton").onclick = function(){
	var stats = [12,18,12,8,12,14];  
    player = new players("Rogue",300,75,6,12,stats,rogInv);

    gameSetup(player.className);
    
    displayStats(player);
    displayInv(player);
};
document.getElementById("warButton").onclick = function(){	
    var stats = [18,14,12,8,8,10];
    player = new players("Warrior",400,50,8,10,stats,warInv);

    gameSetup(player.className);
    
    displayStats(player);
    displayInv(player);
};
document.getElementById("wizButton").onclick = function(){
	var stats = [8,12,8,18,14,12];	
    player = new players("Wizard",250,150,5,8,stats,wizInv);

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
		if(player.inv[i].equipped == true){
			$("<p>[E] "+player.inv[i].name.charAt(0).toUpperCase()+
			player.inv[i].name.slice(1)+"</p>").hide().insertBefore("#item-placeholder").fadeIn(1000);	
		}
		else{
			$("<p>"+player.inv[i].name.charAt(0).toUpperCase()+
			player.inv[i].name.slice(1)+"</p>").hide().insertBefore("#item-placeholder").fadeIn(1000);
		}
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

//Attack Function
function AttackPhase(attacktype)
{
    if(curRoom.enemy.dead == true)
    {
		$("<p>The enemy is already dead.</p>").hide().insertBefore("#placeholder").fadeIn(1000);		
    }
    else
    {
    	$("<p>" + curRoom.enemy.name + "'s Health is currently at " + curRoom.enemy.health + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
    
	    //Player Turn
	    if(attacktype == "normal")
	    {
	    	var normDam = Math.ceil(Math.random(player.stats[0])*10+player.attack);
	        $("<p>"+player.className+" attacks for " + normDam + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);       
	        
	        curRoom.enemy.health = curRoom.enemy.health - normDam + curRoom.enemy.defense;
	        $("<p> " + curRoom.enemy.name + " is hit and suffers " + (normDam-curRoom.enemy.defense) + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
	    }
	    else if(attacktype == "spell")
	    {
	    	var spellDam = Math.ceil(Math.random(8)*10+player.stats[3]);
	        $("<p>Player attacks for " + spellDam + "</p>").hide().insertBefore("#placeholder").fadeIn(1000); 
	              
	        curRoom.enemy.health = curRoom.enemy.health - spellDam;
	        $("<p> " + monstername + " is hit and suffers " + spellDam + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
	    }
	
	    //Monster is Dead
	    if (curRoom.enemy.health < 0)
	    {
	    	curRoom.enemy.dead = true;
			$("<p>" + player.className + " has defeated "+curRoom.enemy.name+"!</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
		        
	    	if(curRoom.enemy.name == "Dummy")
	    	{
	    		$("<p>A strange RING has dropped to the floor from the straw guts of the DUMMY!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
		        curRoom.addItem(ring);	
	    	}
	    	else
	    	{
	    		$("<p>You violent actions have pleased the crowd, but you feel remorse in the fall of your newly acquired friend. "+
	    		"The doors open to the north, revealing an inner chamber glowing red and readiating intense heat. "+
	    		"Your mind tells you to turn back, run away from this hellish place, but your body is drawn to the chamber. "+
	    		"Your legs move you forward and the red glow of the chamber soon engulfs your body...</p>").hide().insertBefore("#placeholder").fadeIn(1000);
			
				$("<p>Take you for playing! The tale will continue in Part 2, but only through your support! "+
				"Give me your money right now and I will make more content, otherwise I will rest on my laurels. >:] </p>").hide().insertBefore("#placeholder").fadeIn(1000);
		        
		        document.getElementById("form-input").style.display = "none";
			}
	        
	    }
	    else 
	    {
	    	if(curRoom.enemy.name == "Dummy")
	    	{
	    		//Monster's Turn
		        var monDam = Math.ceil(Math.random(curRoom.enemy.attack)+10);
		        $("<p>"+curRoom.enemy.name+" smacks you upside the head for " + monDam + "!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
		        
		        player.health = player.health - monDam + player.defense;
		        $("<p>" + player.className + " is smacked for " + (monDam-player.defense)+ "</p>").hide().insertBefore("#placeholder").fadeIn(1000);	
	    	}
	    	else
	    	{
				//Monster's Turn
		        var monDam = Math.ceil(Math.random(curRoom.enemy.attack)+10);
		        $("<p>"+curRoom.enemy.name+" thrashes you around like a small child for " + monDam + "!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
		        
		        player.health = player.health - monDam + player.defense;
		        $("<p>" + player.className + " has been thoroughly tossed around for " + (monDam-player.defense)+ "</p>").hide().insertBefore("#placeholder").fadeIn(1000);		    		
	    	}
	            
	    }       
	    //Player is dead
	    if(player.health < 0)
	    {
    		$("<p> "+ curRoom.enemy.name + " has defeated "+player.className+"!</p>").hide().insertBefore("#placeholder").fadeIn(1000);	
    		$("<p>Your tale ends here in "+curRoom.name+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);	
    		$("<p>Please refresh the page to start anew...</p>").hide().insertBefore("#placeholder").fadeIn(1000);	
    		
    		document.getElementById("form-input").style.display = "none";    	
	    }              	
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
        if(curRoom.checkExit("W",curRoom.exit) == true || curRoom.roomNum == 4 || curRoom.roomNum == 5)
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
        		if(player.findItem("ring") == true)
        		{
        			curRoom = room_5;
    	    		room_5.switchRooms(room_4);
	        	}
        		else
        		{
        			return false;	
        		}
        	}
        	else if(curRoom.roomNum == 5)
        	{
        		if(player.findItem("ring") == false)
        		{
        			curRoom = room_6;
    	    		room_6.switchRooms(room_5);
    	    		curRoom.item = new Array();
    	    		room_6.item = new Array();
	        		$("<p>The door closes behind you with no indication of escaping. Harambe moves to the center of the room facing you.</p>").hide().insertBefore("#placeholder").fadeIn(1000);	
        		}
        		else
        		{
        			return false;	
        		}			
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
        if(curRoom.checkExit("E",curRoom.exit) == true || curRoom.roomNum == 5)
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
        		if(player.findItem("ring") == true)
        		{
        			curRoom = room_4;
    	    		room_4.switchRooms(room_5);
	        	}
        		else
        		{
        			return false;	
        		}
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
