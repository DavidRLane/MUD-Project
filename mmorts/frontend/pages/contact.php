<?php
	global $title;
	global $seperator;
	global $description;
	global $logo;
?>
<html>
	<div id="left"></div>
	<div id="right"></div>
	<div id="top"></div>
	<div id="bottom"></div>
	
	<head>
		<title><?php echo $title.$seperator.$description; ?></title>
		<link href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <link href="frontend/design/css/bootstrap.min.css" rel="stylesheet">
	    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	    <link href="frontend/design/css/stylesheet.css" rel="stylesheet" type="text/css">
	</head>
	
	<body>
		<div id = "wrapper">
			<?php require_once("frontend/templates/header.php"); ?>
			<div class="layer">
				<div class="content">
					<h1>Contact</h1>
					<p>This is the Contact Page</p>
					<p><strong>Created By:</strong> David Lane, Henry Curtis, Ahmad Elhamed</p>
					<a href="index.php?page=index">Home</a>
					<a href="index.php?page=contact">Contact</a>
				</div>
			</div>
			<?php require_once("frontend/templates/footer.php"); ?>
		</div>
	</body>
</html>
