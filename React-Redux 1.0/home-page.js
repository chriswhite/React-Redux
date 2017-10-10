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
