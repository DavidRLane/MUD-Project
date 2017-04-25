<?php
	global $title;
	global $seperator;
	global $description;
	global $logo;
?>
<!DOCTYPE html>
<html>
	<div id="left"></div>
	<div id="right"></div>
	<div id="top"></div>
	<div id="bottom"></div>
	<head>
		<title><?php echo $title.$seperator.$description ?></title>
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE-edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="frontend/design/css/bootstrap.min.css" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link href="frontend/design/css/stylesheet.css" rel="stylesheet" type="text/css">	
		<script type="text/javascript" src="system/scripts/jquery.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
							 			
	</head>
	
	<body>
		<div id="wrapper">
			<?php require_once("frontend/templates/header.php"); ?>
			<div class="layer">
				<div class="content">
					<div id="home-intro">
						<h1>Home</h1>
						<p>This is the Home Page</p>
					</div>
					<?php
						if(isset($_GET['msg']))
						{
							$msg = $_GET['msg'];
							
							if($msg == "loginsuccess")
							{
								$msg = "You have successfully logged in";
							}
							if($msg == "registersuccess")
							{
								$msg = "You have successfully registered";
							}
							if($msg == "logoutsuccess")
							{
								$msg = "You have successfully logged out";
							}
						} 
						if(isset($_SESSION['loggedin']))
						{
							//DATABASE CONNECTION
							$dbserver	= "localhost";
							$dbusername	= "root";
							$dbpassword	= "";
							$db			= "mmorts";
							
							//CREATE CONNECTION
							$conn = new mysqli($dbserver, $dbusername, $dbpassword, $db);
							
							//CHECK CONNECTION
							if($conn->connect_error)
							{
								//KILL CONNECTION/ERROR MESSAGE
								die("Connection Failed: ".$conn->connect_error);
							}
							
							$username = $_SESSION['loggedin'];
							
							$query = "SELECT id FROM users WHERE username = '$username'";
							$result = mysqli_query($conn, $query);
							$row = mysqli_fetch_assoc($result);
							
							//USERDATA
							$userid = $row['id'];
							
							//GET INVENTORY
							$query = "SELECT name FROM inventory WHERE user_id = '$userid'";
							$result = mysqli_query($conn, $query);
							$row = mysqli_fetch_assoc($result);
							
							//USERDATA INVENTORY
							$user_inv = $row['name'];
							
							?>
							<script>
								document.getElementById("home-intro").style.display = "none";	
							</script>
							
							<div class="user-wrapper">
								<div class="user-map">
							 		<h4><strong>Area Explored:</strong></h4>
							 		<div class="map">
							 			<p>Current Position:</p>							 			
							 			<div class="map-ui"></div>								 		
								 	</div>
								 	<h4><strong>Player Stats:</strong></h4>
								 	<div class="class-info"></div>							 	 	
							 	</div>
							 	
							 	<div class="user-space">
							 		<div id="class-options" style="text-align: center; margin-top:10px;">
							 			<button id="rogButton" title="Short and sharp Dagger, fitting for Rogues." onClick="">Dagger</button>
							 			<button id="warButton" title="Large and blunt Club, typical of a Warrior." onClick="">Club</button>
							 			<button id="wizButton" title="Finely crafted Staff, standard for any Wizard." onClick="">Staff</button>
							 		</div>
							 		<div id="adventure-log">
							 			<h2 style="text-align: center"><strong>Adventure Log</strong></h2>	
							 			<p id="message-startgame">
							 				You have traveled for some time along the beaten path, 
							 				and it appears you have arrived at the cave.
							 				Gathering yourself for yet another adventure,
							 				you check your bags one final time before stepping any further.
							 				Speaking of which, what exactly do you have in your bag...?
							 				<p id="message-startgame-button"><strong>(Hover over the buttons for more info)</strong></p> 
							 			</p>							 			
							 			<div id="message_help" style="display:none;">
						 					<p><strong>All Commands must be entered in 'lowercase'. Valid items will be in 'UPPERCASE LETTERS'.</strong>		
						 					<p><strong>talk to harambe = </strong>Harambe will help you by giving you some information about the current room.</p>
						 						<p><strong>Ex: "talk to harambe" = </strong>There is a loose stone tile in this room, Ook Ook!</p>
						 					
						 					<p><strong>look around = </strong>take a second glance around the room, redisplay description.</p>
						 						<p><strong>Ex: "look around" = </strong>The jungle floor is barren...</p>
						 					
						 					<p><strong>look at [item/object] = </strong>look closely at an item or object, revealing more details.</p>					 				
						 						<p><strong>Ex: "look at knife" = </strong>The knife gleams with a sinister glow, it looks like you can pick it up.</p>
						 					
						 					<p><strong>go [direction] = </strong>move in the direction entered.</p>
						 						<p><strong>Ex: "go north" = </strong>You enter the northern room.</p>
						 					
						 					<p><strong>take [item] = </strong>take an item that is obtainable.</p>
						 						<p><strong>Ex: "take knife" = </strong>You pick up the knife and put it in your bag.</p>
						 					
						 					<p><strong>use [item] = </strong>use the item in the room or in your inventory, if possible.</p>
						 						<p><strong>Ex: "use key" = </strong>You used the key on the door.</p>
						 					
						 					<p><strong>equip [weapon or armor] = </strong>equip the item in your inventory, boosting your stats or decreasing them.</p>		 				
							 					<p><strong>Ex: "equip steel helmet" = </strong>You put on the steel helmet.</p>
							 				
							 				<p><strong>unequip [weapon or armor] = </strong>unequip the item, but still keeping it in your inventory.</p>		 				
							 					<p><strong>Ex: "unequip steel helmet" = </strong>You unequipped the steel helmet.</p>
							 				
							 				<p><strong>attack = </strong>attack the enemy in the room, if there is one.</p>		 				
							 					<p><strong>Ex: "attack" = </strong>You strike at the target for 25 damage!</p>
							 			</div>
							 			<p id="room_description"></p>
							 			
							 			<script type="text/javascript" src="system/scripts/functions_and_variables.js"></script>
							 			<script type="text/javascript" src="system/scripts/game.js"></script>
							 			
							 			<div id="placeholder"></div>
							 			
							 			<div id="form-input" style="display:none">
							 				<form onsubmit="return false;" autocomplete="off">
												<input type="text" id="command_line" name="command_line">
											</form>	
							 			</div>
							 		</div>
							 	</div>
							 	
							 	<div class="user-inv">
							 		<h4><strong>User Inventory:</strong></h4>
							 		<div id="item-placeholder"></p>
							 	</div>
							</div>
							<?php
						}
						?>
					<a href="index.php?page=index">Home</a>	
					<a href="index.php?page=contact">Contact</a>
				</div>
			</div>
			<?php require_once("frontend/templates/footer.php"); ?>
		</div>	
	</body>
</html>