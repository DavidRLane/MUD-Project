///Map
showMap();

$(document).ready(function()
{
    $("#adventure-log").fadeIn(1000);
    $("div.class-info").replaceWith('<div class="class-info">'+
    '<p><strong>Class:</strong> Warrior</p>'+
    '<p><strong>Hp:</strong>0<strong>Mp:</strong> 0</p>'+
    '<p><strong>Str:</strong> 0</p>'+
    '<p><strong>Dex:</strong> 0</p>'+
    '<p><strong>Con:</strong> 0</p>'+
    '<p><strong>Int:</strong> 0</p>'+
    '<p><strong>Wis:</strong> 0</p>'+
    '<p><strong>Cha:</strong> 0</p>'+
    '</div>'
    );
    
    
    
    var exampleText = document.getElementById("item-placeholder");
    
    $("form").submit(function(){
        var input = $("#command_line").val();
        var check = false;
        
        var itemName = input.slice(5);
        
        //Check Command
        function check() 
        {
            check = true;
        }
        
        //Reset Text Box
        $("#command_line").val("");
       
        //Help Command
        if(input == "-help")
        {
            $("#message_help").clone().hide().insertBefore("#placeholder").fadeIn(1000);       
            check();
        }
        //Attack Command
        if(input == "attack")
        {   
            $("<p>Normal Strike!</p>").hide().insertBefore("#placeholder").fadeIn(1000); 
            AttackPhase("normal");
            check();            
        }
        
        //Spells
        else if(input == "frost ray")
        {
            $("<p>Frost Ray!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            AttackPhase("spell");
            check();
        }
        
        //Buffs
        else if(input == "cure light wounds")
        {
            $("<p>Cure Light Wounds</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            AttackPhase("buff");
            check();
        }
        
        //Take Command; Take from Current Room
        //Room 1 Items
        if(input == "take "+itemName && curRoom.roomNum == 0)
        {
            if(curRoom.takeItem(itemName) == true)
            {
                $("<p>You picked up a "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item-placeholder").replaceWith('<div class="item-placeholder">'+itemName+'</div>');
                check();            
            }
            else
            {
            	$("<p>There is no "+itemName+" here</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            	check();
            }                   
        }
        //Other Rooms Follow Example
        else if(input == "take "+itemName && curRoom.roomNum == 1)
        {
            $("<p>There is no "+itemName+" here</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            check();
        }
        
        //Drop Command; Drops Player Item into Current Room
        //Items not being saved after being taken
        else if(input == "drop "+itemName)
        {
        	if(player.dropItem(itemName) == true)
        	{
                $("<p>You dropped the "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item-placeholder").replaceWith('<div class="item-placeholder"></div>');
                check();            
            }
            else
            {
                $("<p>You don't have "+itemName+".</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }                   
        }
        
        //Goto Commands
        if(input == "go west")
        {
            if(moveMap("west") == true)
            {             
            	showMap();   
                check();                    
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();    
            }
        }
        if(input == "go east")
        {
            if(moveMap("east") == true)
            {
                showMap();
                check();                    
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();    
            }
        }   
        if(input == "go north")
        {
            if(moveMap("north") == true)
            {
                showMap();
				check();                    
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();    
            }
        }    
        if(input == "go south")
        {
            if(moveMap("south") == true)
            {
            	showMap();                
                check();                    
            }
            else
            {
                $("<p>You cannot go that way!</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();    
            }
        }   
        //Unknown Command
        else if(check == false)
        {    
            $("<p>I do not understand " + input + "</p>").hide().insertBefore("#placeholder").fadeIn(1000);
        }
    });
});