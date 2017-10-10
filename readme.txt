In this tutorial we will create a basic Website with React and Redux, using Webpack with Babel to transpile the ES6 JavaScript and build the Website.

Install Node.js and npm on your computer from https://www.npmjs.com/get-npm

Create a working directory for the project somewhere on your computer:

mkdir "React-Redux 1.0"

Descend into that directory so that all subsequent commands are executed within that working directory.

Create a file named package.json with the contents:

{
	"name": "react-redux",
	"version": "1.0.0",
	"dependencies": {
		"babel-polyfill": "6.26.0",
		"fetch": "1.1.0",
		"react": "16.0.0",
		"react-dom": "16.0.0",
		"react-redux": "5.0.6",
		"redux": "3.7.2"
	},
	"devDependencies": {
		"babel-core": "6.26.0",
		"babel-loader": "7.1.2",
		"babel-preset-env": "1.6.0",
		"babel-preset-es2015": "6.24.1",
		"babel-preset-react": "6.24.1",
		"webpack": "3.6.0"
	}
}

Execute the following command, that may take a few minutes, to download all of the dependencies listed in the package.json:

npm install

You will now see a directory named node_modules in your working directory that contains all of the dependencies listed in the package.json

Create a file named webpack.config.js with the following contents:

var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './main.js',
	output: { path: __dirname, filename: './bundle.js' },
	module: {
		loaders: [{
			test: /.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
};

Create an empty file named main.js and execute the following command to build the Website:

webpack

You will see the following output from Webpack and a new file named bundle.js that Webpack has created in your working directory:

Version: webpack 3.6.0
Time: 596ms
      Asset     Size  Chunks             Chunk Names
./bundle.js  2.51 kB       0  [emitted]  main
   [0] ./main.js 13 bytes {0} [built]

Create a file named index.html with the following contents:

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>React-Redux 1.0</title>
	</head>
	<body>
		<div id="home-page"></div>
		<script src="bundle.js"></script>
	</body>
</html>

Open the index.html file in your Web browser and you will see a blank page with the title 'React-Redux 1.0'.

Add the following contents to the file named main.js in your working directory:

import 'babel-polyfill';
import 'whatwg-fetch';
import HomePage from './home-page.js';

The first line imports the required cross-browser polyfills for ES6 that adds new capabilities to built-in JavaScript objects for older browsers which may lack native support for the extra features of ES6.
The second line imports the required cross-browser polyfills for the Fetch API that is used to make AJAX requests.
The third line imports the JavaScript that implements the home page of the Website.

This main.js should not contain any code but simply instructs Webpack to transpile and bundle all of the referenced components, and all of the subcomponents referenced by those components, into the build of the Website.

Create a file named home-page.js with the following contents:

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './home-store.js';
import { FeatureContainer } from './feature-container.js';

class HomePage extends React.Component {

	render() { return (

<main>
	<section>
		<FeatureContainer/>
	</section>
</main>

	);}

}

var page = document.getElementById('home-page');
if(page) { ReactDOM.render(<Provider store={store}><HomePage/></Provider>, page); }

The first three lines import the React and Redux components.
The fourth line imports the bespoke Redux store for the home page that will be defined shortly.
The fifth line imports a bespoke component named FeatureContainer that will glue together React, Redux and this particular feature of the Website.

The HomePage class renders some basic HTML that includes a FeatureContainer element where that component will be rendered.

The JavaScript code at the end first tests that the current page is the home page comprising some element that has an id equal to 'home-page'.
This check prevents the rendering of the home page when some other page is loaded instead of the home page.

The code then renders the home page within a Redux Provider element that accepts the Redux store as an attribute.
This ensures that the Redux store is available to all subcomponents of the home page.

Create a file name home-store.js with the following contents:

import { createStore, combineReducers } from 'redux';
import { featureReducer } from './feature-reducer.js';

const reducers = {
	feature: featureReducer
};

export const store = createStore(combineReducers(reducers));

The first line imports the required components from Redux, and the second line imports the bespoke Redux reducer that will be defined shortly.

The code then creates a map of reducers, where the key for example 'feature' will be the namespace that the feature uses to store the feature's slice of the Redux store.
The map of reducers is passed to the combineReducers and createStore operations provided by Redux to create the store.

Create a file name feature-reducer.js with the following contents:

export const featureReducer = function(state = { name: '', email: '', response: '' }, action) {

	switch(action.type) {

		case 'FEATURE_FORM_CHANGED':

			const target = action.target;
			const name = target.name;
			const value = target.type == 'checkbox' ? target.checked : target.value;

			return Object.assign({}, state, { [name]: value });

		case 'FEATURE_SERVICE_RESPONDED':

			return Object.assign({}, state, { response: action.response });

	}

	return state;

}

This code creates a Redux reducer for the feature that will handle all of the events which may occur within the feature's view component that will be defined shortly.
The code uses Object.assign to ensure that the state is properly mutated so that Redux detects changes to the state and causes React to re-render any view components which reference that state.

Create a file named feature-container.js with the following contents:

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { store } from './home-store.js';
import { FeatureService } from './feature-service.js';
import { FeatureView } from './feature-view.js';

const state = (store) => ({ featureService: new FeatureService(store.feature), feature: store.feature });

const featureFormChanged = (target) => ({ type: 'FEATURE_FORM_CHANGED', target });
const featureServiceResponded = (response) => ({ type: 'FEATURE_SERVICE_RESPONDED', response });

const actions = { featureFormChanged, featureServiceResponded };

export const FeatureContainer = connect(state, actions)(FeatureView);

The first three lines import the React and Redux components, including the react-redux connect function that glues React and Redux together.
The fourth line imports the bespoke Redux store for the home page.
The fifth and sixth lines import the feature service and feature view which will be defined shortly.

The code first creates a map of state variables which will be passed as properties to the feature view using the react-redux connect function.
The Redux store for the home page is passed into a function that creates the map of state variables.

The first state variable is a new instance of the feature service with the feature's slice of the Redux store passed to the constructor of the service.
The second state variable is the feature's slice of the Redux store that will be used by the feature view component that will be defined shortly.

The code then creates a map of dispatch handlers which handle the events which may occur within the feature view.
These events will ultimately be handled within the featureReducer defined earlier.

The code finally creates a FeatureContainer using the Redux connect function, passing in the map of state and dispatch handlers along with the FeatureView that will be defined shortly.

The FeatureContainer is not a React component but masquerades as a FeatureView that is a React component.

Create a file named feature-view.js with the following contents:

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

This code implements the FeatureView that is a React component which handles some events and renders the feature view.
The constructor binds a couple of event handlers to the this context so that those handlers can be called from the HTML defined in the render function.

The code then implements a featureFormSubmitted function that will be called when the form is submitted.
That function calls an operation defined by the feature service, that will be defined shortly, to perform some service operation using the specified featureServiceResponded callback handler.

The code then implements a featureFormChanged function that will be called when either the name or email form fields are changed by the user.
That function calls the featureFormChanged function that was placed into the properties of the FeatureView by the FeatureContainer defined earlier.

The render function defines the HTML that will be rendered when the page is loaded, or after any events have occurred which modify any data comprised by the feature's slice of the Redux store.

Create a file named feature-service.js with the following contents:

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

The code implements the FeatureService that may perform various service operations for the feature, including AJAX requests to remote APIs using the Fetch API for example.
The constructor assigns the specified feature argument, that is the feature's slice of the Redux store passed in by the feature container defined earlier.

The only service operation named executeOperation simply acquires the values provided by the user for the name and email form fields, and then constructs a dummy response object comprising an error message featuring the name and email form field values.
The service operation then invokes the specified callback handler with the response object, which ultimately invokes the Redux dispatch handler named featureServiceResponded that was created by the feature container and passed in by the feature view.

That dispatch handler will modify the feature's slice of the Redux store, by adding a response to that slice in the featureReducer component defind earlier, and the FeatureView will re-render its HTML with the error message comprised by the response.

Finally execute the following command to build the Website:

webpack

You will see the following output from Webpack and the file named bundle.js that Webpack has created in your working directory.
The bundle.js file contains all of the code defined in this tutorial, transpiled to ES5 by Babel with full support for Internet Explorer and other Web browsers.

Version: webpack 3.6.0
Time: 2789ms
      Asset     Size  Chunks                    Chunk Names
./bundle.js  1.21 MB       0  [emitted]  [big]  main
  [54] (webpack)/buildin/global.js 509 bytes {0} [built]
 [153] ./home-store.js 348 bytes {0} [built]
 [154] ./main.js 261 bytes {0} [built]
 [358] ./home-page.js 2.74 kB {0} [built]
 [390] (webpack)/buildin/module.js 517 bytes {0} [built]
 [399] ./feature-reducer.js 895 bytes {0} [built]
 [400] ./feature-container.js 1.22 kB {0} [built]
 [401] ./feature-service.js 1.33 kB {0} [built]
 [402] ./feature-view.js 3.84 kB {0} [built]
    + 394 hidden modules

Open the index.html file in your Web browser and you will see the name and email form fields comprised by the feature.

Type some text into the form fields and see that the text appears in the form fields because we have successfully bound the value of the form fields to the Redux store.

Click the submit button and you will see the error message produced by the feature service that comprises the name and email form field values.