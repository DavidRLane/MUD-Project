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
            $("<p>Normal Strike!</p>").hide().insertBefore("#placeholder").fadeIn(1000); 
            AttackPhase("normal");
            checkFunc();
        }
        
        //Spells
        else if(input == "frost ray")
        {
            $("<p>Frost Ray!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            AttackPhase("spell");
            checkFunc();
        }
        
        //Buffs
        else if(input == "cure light wounds")
        {
            $("<p>Cure Light Wounds</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            AttackPhase("buff");
            checkFunc();
        }
        
        //Equip Command
        else if(input == "equip "+equipItem)
        {
            if(player.equipItem(equipItem) == true)
            {
                $("<p>You equipped the "+equipName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                checkFunc();    
            }        	
        }
       
        //Look Around Command
        else if(input == "look around")
        {
            $("<p> "+ curRoom.roomDesc() + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            checkFunc();
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
        else if(input = "use "+usePlayerItem)
        {
        	if(player.useItem(usePlayerItem) == "stone key" && curRoom.roomNum == 0)
        	{
        		$("<p>You used the "+usePlayerItem+
        		". The door to the North is now open!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                curRoom.openRoom(curRoom.roomNum,"N");
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
            var item = input.slice(0,4);
            var useItem = input.slice(0,3);
            
            if(item == "take")
            {
                $("<p>You can't take "+itemName+" here.</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(useItem == "use")
            {
                $("<p>You can't use "+usePlayerItem+" here.</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else if(equipItem == "equip")
            {
                $("<p>You can't equip"+usePlayerItem+" here.</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
            else
            {            
                $("<p>I do not understand " + input + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);    
            }
             
        }
    });
});