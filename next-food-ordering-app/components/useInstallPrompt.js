import { useState, useEffect } from 'react';

export default function useInstallPrompt() {
	const [prompt, setPrompt] = useState(null);

	const handleBeforeInstallPrompt = (e) => {
		console.log('beforeinstallprompt event fired');
		e.preventDefault();
		setPrompt(e);
	};

	useEffect(() => {
		console.log('Adding event listener');
		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			console.log('Removing event listener');
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			);
		};
	}, []);

	return { prompt };
}
