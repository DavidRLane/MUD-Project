///Map
showMap();
//Make Random Monster
MakeMonster();

$(document).ready(function()
{
    $("#adventure-log").fadeIn(1000);
    
    var nCorridor = new Rooms("nCorridor");
    
    var exampleText = document.getElementById("example");
    
    var sword = new Items("Sword",false,true,true,false);
    
    nCorridor.addItem(sword);
    
    exampleText.innerHTML = nCorridor.item[0].name;
    
    
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
        if(input == "take sword" && currentroom == "middle")
        {
            if(sword == false)
            {
                sword = true;
                $("<p>You picked up a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item_placeholder").replaceWith('<div class="item_placeholder">Sword</div>');
                check();            
            }
            else
            {
                $("<p>You already have a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }                   
        }
        else if(input == "take sword" && currentroom != "middle")
        {
            $("<p>There is no sword here</p>").hide().insertBefore("#placeholder").fadeIn(1000);
            check();
        }
        else if(input == "drop sword" && currentroom == "middle")
        {
            if(sword == true)
            {
                sword = false;
                $("<p>You dropped the sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                $("div.item_placeholder").replaceWith('<div class="item_placeholder"></div>');
                check();            
            }
            else
            {
                $("<p>You don't have a sword.</p>").hide().insertBefore("#placeholder").fadeIn(1000);
                check();
            }                   
        }
        else if(input == "drop sword" && currentroom != "middle")
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