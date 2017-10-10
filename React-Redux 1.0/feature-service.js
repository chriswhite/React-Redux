export class FeatureService {

	constructor(feature) {

		this.feature = feature;

	}

	executeOperation(callback) {

		const name = this.feature.name;
		const email = this.feature.email;

		const response = { error: 'The service operation currently does nothing with the name: ' + name + ' and email: ' + email };

		callback(response);

	}

}
