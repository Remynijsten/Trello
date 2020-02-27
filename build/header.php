<?php
	session_start();
	isset($_SESSION['name']) ? $name = $_SESSION['name'] : $name = "Guest";
?>

<header class="navBar">
	<p class="sortText">Sort lists <i class="fas fa-angle-down"></i></p>
		<div id="sortMenu" class="sortMenu animated bounceInDown w3-hide">
			<ul>
				<li>
					<span id="sort">Sort</span>
					<span id="filter">Filter</span>
				</li>
				<li class="colors">
					<span class="w3-badge w3-green" data-id="0"></span>
					<span class="w3-badge w3-yellow" data-id="1"></span>
					<span class="w3-badge w3-orange" data-id="2"></span>
					<span class="w3-badge w3-red" data-id="3"></span>
					<span class="w3-badge w3-purple" data-id="4"></span>
				</li>
			</ul>
		</div>

	<img src="../img/logo.png" alt="header logo">
	<p>Welcome <? echo $name ?></p>

	<button class="logout">Log out</button>
</header>

