<?php
	session_start();
	require_once("system/functions.php");
	require_once("system/config.php");
	
	if($maintenance == 0)
	{
		echo "This site is under maintenance";
		echo $maintenance;
	}
	elseif($maintenance == 1)
	{
		getPage();
	}
?>