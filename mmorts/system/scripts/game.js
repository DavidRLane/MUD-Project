///Map
showMap();

$(document).ready(function()
{
    $("#adventure-log").fadeIn(1000);
    displayStats(player);
    displayInv(player);
    
    $("form").submit(function(){
        var input = $("#command_line").val();
        var check = false;
    
    	var itemName = input.slice(5);
        var usePlayerItem = input.slice(4);
        var equipItem = input.slice(6);
        var unequipItem = input.slice(8);
        var lookItem = input.slice(8);

        //Check Command
        function checkFunc() 
        {
            check = true;
        }
        
        //Reset Text Box
        $("#command_line").val("");
       
        //Help Command
        if(input == "-help")
        {
            $("#message_help").clone().hide().insertBefore("#placeholder").fadeIn(1000);       
            checkFunc();
        }
        
        //Harambe Help Command
        else if(input == "talk to harambe")
        {
        	HarambeHelp(curRoom.roomNum);
        	checkFunc();
        }
        
        //Goto Commands
        else if(input == "go west")
        {
            if(moveMap("west") == true)
            {             
            	showMap();   
                checkFunc();                
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                checkFunc();
            }
        }
        else if(input == "go east")
        {
            if(moveMap("east") == true)
            {
                showMap();
                checkFunc();                  
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                checkFunc();
            }
        }   
        else if(input == "go north")
        {
            if(moveMap("north") == true)
            {
                showMap();
				checkFunc();                
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                checkFunc();
            }
        }    
        else if(input == "go south")
        {
            if(moveMap("south") == true)
            {
            	showMap();                
                checkFunc();                
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                checkFunc();
            }
        }
        
        //Attack Command
        else if(input == "attack")
        {   
        	if(curRoom.roomNum == 3 || curRoom.roomNum == 6)
        	{
        		$("<p>You strike at the target with your weapon!</p>").hide().insertBefore("#placeholder").fadeIn(1000); 
	            AttackPhase("normal");
	            displayStats(player);
	            checkFunc();	
        	}
        }
        
        //Spells
        else if(input == "frost ray")
        {
            if(curRoom.roomNum == 3)
        	{
        		$("<p>You strike at the target with your magic!</p>").hide().insertBefore("#placeholder").fadeIn(1000); 
	            AttackPhase("spell");
	            displayStats(player);
	            checkFunc();	
        	}
        }
        
        //Equip Command
        else if(input == "equip "+equipItem)
        {
            if(player.equipItem(equipItem) == true)
            {
                $("<p>You equipped the "+equipItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                displayStats(player);
                displayInv(player);
                checkFunc();    
            }        	
        }
        //Unequip Command
       	else if(input == "unequip "+unequipItem)
        {
            if(player.unequipItem(unequipItem) == true)
            {
                $("<p>You unequipped the "+unequipItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                displayStats(player);
                displayInv(player);
                checkFunc();    
            }        	
        }
       
        //Look Around Command
        else if(input == "look around")
        {
            $("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            checkFunc();
        }
        
        //Look Command; Closer Look at Specific Objects
        else if(input == "look at "+lookItem)
        {
        	//Sign Description in Room 1
        	if(lookItem == "sign" && curRoom.roomNum == 1)
        	{
        		$("<p> The sign says: 'You can USE things that aren't in your inventory, try opening this door with the USE command'.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	checkFunc();
        	}
        	//Sign Description in Room 1
        	else if(lookItem == "portrait" && curRoom.roomNum == 2)
        	{
        		$("<p> Upon closer examination, it appears that Doctor Zaius is holding a KEY in the portrait.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	checkFunc();
        	}
        	//Harambe in Room 6
        	else if(lookItem == "harambe" && curRoom.roomNum == 6)
        	{
        		$("<p>There is no mercy in the eyes of Harambe...</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	checkFunc();
        	}
        	else if(lookItem == "harambe" && curRoom.roomNum != 6)
        	{
        		$("<p>Harambe stands beside you, glowing with heroism and pride.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	checkFunc();
        	}
        	//Object in Secret Room 7
        	else if(lookItem == "object" && curRoom.roomNum == 7)
        	{
        		$("<p>It appears that the object is a RIFLE! As you take a closer look at the inner workings of the rifle, Harambe stands behind you, with a look of dread...</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	checkFunc();
        	}
        }
       
        //Take Command; Take Item from Current Room
        else if(input == "take "+itemName)
        {
            if(curRoom.findItem(itemName) == true)
            {
            	if(itemName[0] == 'a' || itemName[0] == 'A')
            	{
            		//Update with More Items
                	$("<p>You picked up an "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                	displayInv(player);
                	checkFunc();	
            	}
            	else
            	{
            		//Update with More Items
                	$("<p>You picked up a "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                	displayInv(player);
                	checkFunc();
            	}        
            }              
        }
        
        //Use Command; Use an item in the Current Room
        else if(input == "use "+usePlayerItem)
        {
        	//Room 1
        	if(usePlayerItem == "door" && curRoom.roomNum == 1)
        	{
        		$("<p>You pushed a button inlaid in the "+usePlayerItem+". "+
        		"The door to the North creaks open, revealing the next room!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                curRoom.openRoom(curRoom.roomNum,"N");
                checkFunc();
        	}
        	
        	//Room 2
        	if(usePlayerItem == "portrait" && curRoom.roomNum == 2)
        	{
        		$("<p>You jostle the portrait to free the KEY from Doctor Zaius' hands. A KEY falls to the ground.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                curRoom.addItem(key);
                checkFunc();
        	}
        	if(player.useItem(usePlayerItem) == "key" && curRoom.roomNum == 2)
        	{
        		$("<p>You used the "+usePlayerItem+
        		". The door to the East is now open!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                curRoom.openRoom(curRoom.roomNum,"E");
                displayInv(player);
                checkFunc();
        	}	
        	
        }
        
        //Drop Command; Drops Player Item into Current Room
        else if(input == "drop "+itemName)
        {
        	if(player.dropItem(itemName) == true)
        	{
        		//Update with Less Items
                $("<p>You dropped "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                displayInv(player);
                displayStats(player);
                checkFunc();            
            }
            else
            {
            	if(itemName[0] == 'a' || itemName[0] == 'A')
            	{
                	$("<p>You don't have an "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                	checkFunc();	
            	}
            	else
            	{
            		$("<p>You don't have a "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                	checkFunc();
            	}
            }                   
        }
           
        //Unknown Command
        if(check == false)
        {   
        	var attackCheck = input.slice(0,6);
            var itemCheck = input.slice(0,4);
            var useItemCheck = input.slice(0,3);
            var equipItemCheck = input.slice(0,5);
            var unequipItemCheck = input.slice(0,7);
            var lookItemCheck = input.slice(0,7);
            
            if(attackCheck == "attack")
            {
            	$("<p>There is nothing to attack here!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            }
            else if(itemCheck == "take")
            {
                $("<p>There is no "+itemName+" to take.</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(useItemCheck == "use")
            {
                $("<p>You can't use the "+usePlayerItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(equipItemCheck == "equip")
            {
                $("<p>You can't equip the "+equipItem+", or it is not in your inventory.</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(unequipItemCheck == "unequip")
            {
                if(unequipItem[0] == 'a' || unequipItem[0] == 'A')
                	$("<p>You don't have an "+unequipItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
                else
                	$("<p>You don't have a "+unequipItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(lookItemCheck == "look at")
            {
            	if(lookItem[0] == 'a' || lookItem[0] == 'A')
                	$("<p>You don't see an "+lookItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
                else
                	$("<p>You don't see a "+lookItem+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            }
            else
            {            
                $("<p>I do not understand " + input + ".</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
             
        }
    });
});