import { useEffect, useRef } from 'react';

const WidgetContent = ({
	item,
	removeWidget,
	onHeightChange,
	rowHeight,
	isEdit,
}) => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		const ro = new ResizeObserver(entries => {
			for (let entry of entries) {
				const px = entry.contentRect.height;
				const rows = Math.ceil(px / rowHeight);
				onHeightChange(item.i, rows);
			}
		});
		ro.observe(ref.current);
		return () => ro.disconnect();
	}, [item.i, onHeightChange, rowHeight]);

	return (
		<div ref={ref}>
			<div className='cursor-move p-1  flex justify-between items-center '>
				<span>{item.i}</span>
				<button
					onClick={e => {
						e.stopPropagation();
						removeWidget(item.i);
					}}
					className={`bg-transparent border-0 cursor-pointer text-[16px] opacity-0 group-hover:opacity-100 duration-200 ${
						isEdit ? '' : 'hidden'
					}`}
				>
					×
				</button>
			</div>
			<div className='p-2 text-2xl'>Content for widget {item.i}</div>
		</div>
	);
};

export default WidgetContent;
