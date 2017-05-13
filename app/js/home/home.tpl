
<section>
	<div class="container">
		<div class="row">
			<div class="col-md-8">
				<span>What is 12 + 18</span>
				<form ng-submit="Validate(botForm)" name="botForm" novalidate>
				<input class="form-control" type="text" ng-model="answer" name="answer" required>
				<div ng-show="botForm.answer.$invalid || botForm.$submitted" ng-if="botForm.answer.$dirty || botCtrl.isSubmitted" ng-messages="botForm.answer.$error" class="error">
					<div ng-message="required">Please enter the answer</div>
				</div>
				<button class="btn btn-primary" type="submit">Submit</button>
				</form>
			</div>
		</div>
	</div>
</section>