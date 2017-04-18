<?php
	global $title;
	global $seperator;
	global $description;
	global $logo;
?>
<!DOCTYPE html>
<html>
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
					<h1>Home</h1>
					<p>This is the Home Page</p>
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
							<h3>Workspace</h3>
							<div class="user-wrapper">
								<div class="user-map">
							 		<h4>Area Explored:</h4>
							 		<div class="map">
							 			<p>Current Position:</p>							 			
							 			<div class="map-ui"></div>								 		
								 	</div>
								 	<h4>Test:</h4>
								 	<div id="example">
								 		
								 	</div>
							 	</div>
							 	
							 	<div class="user-space">
							 		<div id="class-options" style="text-align: center; margin-top:10px;">
							 			<button id="warButton" title="Warrior" onClick="">Warrior</button>
							 			<button id="wizButton" title="Wizard" onClick="">Wizard</button>
							 			<button id="rogButton" title="Rogue" onClick="">Rogue</button>
							 		</div>
							 		<div id="adventure-log">
							 			<h2><strong>Adventure Log</strong></h2>	
							 			<p id="message_startgame">
							 				The Adventure Begins!
							 				Let's start with creating your character. 
							 				The available classes are listed above,
							 				press the button above of the class you want to be.
							 				For more info, hover your cursor over the button"</strong>. 
							 			</p>							 			
							 															 			
							 			<p id="help_command" style="display:none">
							 				For a list of commands, you can type <strong>"-help"</strong> below.
							 			</p>							 			
							 			<p><span id="message_help" style="display:none;">
						 					<strong>List of Commands: </strong>							 				
						 					go [direction] = move in the direction entered.
						 					take [item] = take an item that is obtainable.
						 					talk to [person] = talk to the person, if they can interact with you.		 				
							 			</span></p>
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
							 	
							 	<div class="user-resources">
							 		<h4>User Inventory:</h4>
							 		<div class="item_placeholder"></p>
							 	</div>
							</div>
							<?php
						}
						?>
					<a href="index.php?page=index">Home</a>	
					<a href="index.php?page=contact">Contact</a>
					<a href="index.php?page=servertesting">Server</a>
				</div>
			</div>
			<?php require_once("frontend/templates/footer.php"); ?>
		</div>	
	</body>
</html>