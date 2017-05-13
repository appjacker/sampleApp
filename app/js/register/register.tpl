<section>
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-md-offset-5">
				<form class="form-horizontal" name="registerForm" ng-submit="submitForm(registerForm)" novalidate>
					<fieldset>
						<div id="legend">
							<legend class="">Register</legend>
						</div>
						<div class="control-group">
							<!-- Username -->
							<label class="control-label"  for="username">First Name</label>
							<div class="controls">
								<input type="text" id="username" name="fName" placeholder="" class="input-xlarge" ng-model="user.fName" required>
								<div ng-show="registerForm.fName.$invalid || registerForm.$submitted" ng-if="registerForm.fName.$dirty || botCtrl.isSubmitted" ng-messages="registerForm.fName.$error" class="error">
									<div ng-message="required">Please enter your first name</div>
								</div>
							</div>
						</div>

						<div class="control-group">
							<!-- Username -->
							<label class="control-label"  for="username">Last Name</label>
							<div class="controls">
								<input type="text" id="username" name="lName" placeholder="" class="input-xlarge" ng-model="user.lName" required>
								<div ng-show="registerForm.lName.$invalid || registerForm.$submitted" ng-if="registerForm.lName.$dirty || botCtrl.isSubmitted" ng-messages="registerForm.lName.$error" class="error">
									<div ng-message="required">Please enter your last name</div>
								</div>
							</div>
						</div>

						<div class="control-group">
							<!-- E-mail -->
							<label class="control-label" for="email">E-mail</label>
							<div class="controls">
								<input type="text" id="email" name="email" placeholder="" class="input-xlarge" ng-model="user.email" required>
								<div ng-show="registerForm.email.$invalid || registerForm.$submitted" ng-if="registerForm.email.$dirty || botCtrl.isSubmitted" ng-messages="registerForm.email.$error" class="error">
									<div ng-message="required">Please enter your email</div>
								</div>
							</div>
						</div>

						<div class="control-group">
							<!-- Username -->
							<label class="control-label"  for="username">Phone Number</label>
							<div class="controls">
								<input type="text" id="username" name="cNumber" placeholder="" class="input-xlarge" ng-model="user.cNumber" required>
								<div ng-show="registerForm.cNumber.$invalid || registerForm.$submitted" ng-if="registerForm.cNumber.$dirty || botCtrl.isSubmitted" ng-messages="registerForm.cNumber.$error" class="error">
									<div ng-message="required">Please enter your phone number</div>
								</div>
							</div>
						</div>

						<div class="control-group">
							<!-- Button -->
							<label class="control-label"></label>
							<div class="controls">
								<button class="btn btn-success">Register</button>
							</div>
						</div>
					</fieldset>
				</form>

			</div>
		</div>
	</div>
</section>