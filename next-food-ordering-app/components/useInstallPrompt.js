import { useState, useEffect } from 'react';

export default function useInstallPrompt() {
	const [prompt, setPrompt] = useState(null);

	const handleBeforeInstallPrompt = (e) => {
		e.preventDefault();
		setPrompt(e);
	};

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			);
		};
	}, []);

	return { prompt };
}
