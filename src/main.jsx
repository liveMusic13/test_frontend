import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
