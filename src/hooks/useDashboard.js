import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

export const useDashboard = () => {
	const LOCAL_STORAGE_KEY = 'dashboard-layout';

	const defaultLayout = [
		{ i: 'LIQN', x: 3, y: 0, w: 3, h: 2 },
		{ i: 'New Task', x: 0, y: 0, w: 4, h: 2 },
		{ i: 'Open Task', x: 4, y: 0, w: 4, h: 3 },
		{ i: 'TaskDeadlines', x: 0, y: 2, w: 6, h: 2 },
	];

	const [layout, setLayout] = useState(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (saved) {
				try {
					return JSON.parse(saved);
				} catch {
					localStorage.removeItem(LOCAL_STORAGE_KEY);
				}
			}
		}
		return defaultLayout;
	});

	//HELP: Сохраняем лэйаут в localStorage при изменении
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layout));
		}
	}, [layout]);

	const onLayoutChange = newLayout => {
		setLayout(prev => {
			//HELP: сравниваем старый и новый layout глубоко
			if (!isEqual(prev, newLayout)) {
				return newLayout;
			}
			return prev;
		});
	};
	const addWidget = i => {
		console.log(i);
		const newItem = { i: i, x: 0, y: Infinity, w: 4, h: 2 };
		setLayout(prev => [...prev, newItem]);
	};
	const removeWidget = id => {
		console.log(id);
		setLayout(prev => prev.filter(item => item.i !== id));
	};
	const onHeightChange = (id, newH) => {
		setLayout(prev => {
			let didChange = false;
			const next = prev.map(item => {
				if (item.i === id && item.h !== newH) {
					didChange = true;
					return { ...item, h: newH };
				}
				return item;
			});
			return didChange ? next : prev;
		});
	};

	return {
		onLayoutChange,
		addWidget,
		removeWidget,
		onHeightChange,
		layout,
	};
};
