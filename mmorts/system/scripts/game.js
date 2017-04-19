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
    
    room_0.addItem(sword);
    
    var takeItem = "take "+curRoom.item[0].name;
    var dropItem = "drop "+curRoom.item[0].name;
    
    $("form").submit(function(){
        var input = $("#command_line").val();
        var check = false;
        
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
        
        //Take Commands
        if(input == takeItem && curRoom.roomNum == 0)
        {
            if(curRoom.item[0].name == sword.name && sword.pickUp == true)
            {
            	//doesnt show up
                sword.pickUp = false;
                $("<p>You picked up a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item-placeholder").replaceWith('<div class="item-placeholder">'+curRoom.item[0].name+'</div>');
                check();            
            }
            else
            {
                $("<p>You already have a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }                   
        }
        else if(input == takeItem && curRoom.roomNum != 0)
        {
            $("<p>There is no sword here</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            check();
        }
        else if(input == "drop sword" && curRoom.roomNum == 0)
        {
        	if(curRoom.item[0].name == sword.name)
        	{
                sword.pickUp = true;
                $("<p>You dropped the sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item-placeholder").replaceWith('<div class="item-placeholder"></div>');
                check();            
            }
            else
            {
                $("<p>You don't have a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }                   
        }
        else if(input == "drop sword" && curRoom.roomNum != 0)
        {
            if(sword == true)
            {
                $("<p>Best not to leave the sword here</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }
            else
            {
                $("<p>You don't have a sword</p>").hide().insertBefore("#placeholder").fadeIn(1000);
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