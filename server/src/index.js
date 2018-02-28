import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public')); // threat public directory as a static
app.get('*', (req, res) => {
	const store = createStore();

	// look at the list of routes
	// looks whatever route user is trying to visit
	// returns an Array of components that's are about to be rendered
	const promises = matchRoutes(Routes, req.path).map(({route}) => {
		// fetch data based on components that are about to be shown
		return  route.loadData ? route.loadData(store) : null;
	})

	Promise.all(promises).then(() => {
		res.send(renderer(req, store));
	});

});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
