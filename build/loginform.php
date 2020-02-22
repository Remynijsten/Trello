<main class="w3-animate-opacity loginContainer">
	<form action="" method="post" class="userForm w3-hide">

		<p class='selected'>LOGIN</p>
		<p>REGISTER</p>

		<input type="text" name="name" placeholder="name" class="w3-animate-zoom">
		<input name="mail" type="text" placeholder="e-mail">
		<input name="password" type="password" placeholder="password">
		<input type="hidden" name="function" value="login" class="loginFormFunction">

		<button type="submit">LOGIN</button>

		<h6>forgot your password?  <span class="clickhere">Click here</span></h6>

		<div class="w3-panel w3-hide error animated">
			<span class="errorMSG"></span>
			<span id="spinner" class="spinner w3-hide"><i class="fa fa-spinner w3-spin"></i></span>
		</div>
	</form>
</main>