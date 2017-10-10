import React from 'react';

export class FeatureView extends React.Component {

	constructor(props) {

		super(props);

		this.featureFormSubmitted = this.featureFormSubmitted.bind(this);
		this.featureFormChanged = this.featureFormChanged.bind(this);

	}

	featureFormSubmitted(event) {

		event.preventDefault();

		this.props.featureService.executeOperation(this.props.featureServiceResponded);

	}

	featureFormChanged(event) {

		this.props.featureFormChanged(event.target);

	}

	render() { return (

<article>
	<form>
		<div>{this.props.feature.response.error}</div>
		<div>
			<label htmlFor="feature-name">Name</label>
			<input onChange={this.featureFormChanged} value={this.props.feature.name} type="text" id="feature-name" name="name"></input>
		</div>
		<div>
			<label htmlFor="feature-email">Email</label>
			<input onChange={this.featureFormChanged} value={this.props.feature.email} type="text" id="feature-email" name="email"></input>
		</div>
		<div>
			<button onClick={this.featureFormSubmitted} type="submit">Submit</button>
		</div>
	</form>
</article>

	);}

}
