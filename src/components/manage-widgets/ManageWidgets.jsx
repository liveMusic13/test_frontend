const ManageWidgets = ({ layout, addWidget, removeWidget }) => {
	const allWidgets = [
		{ i: 'New Task', x: 0, y: 0, w: 4, h: 2 },
		{ i: 'Open Task', x: 4, y: 0, w: 4, h: 3 },
		{ i: 'Due Today', x: 8, y: 0, w: 4, h: 4 },
		{ i: 'TaskDeadlines', x: 0, y: 2, w: 6, h: 2 },
		{ i: 'Overdue Tasks', x: 0, y: 0, w: 4, h: 2 },
		{ i: 'Open Tasks by Health', x: 4, y: 0, w: 4, h: 3 },
		{ i: 'Approval Tasks', x: 8, y: 0, w: 4, h: 4 },
		{ i: 'Task Status', x: 0, y: 2, w: 6, h: 2 },
	];

	return (
		<div className='bg-white w-full rounded-2xl max-h-80 py-4 px-6 flex flex-col gap-2'>
			<h3 className='font-medium'>Manage Widgets</h3>
			<div className='flex flex-wrap gap-2.5 overflow-y-auto'>
				{allWidgets.map((el, ind) => {
					const isActive = layout.some(elem => elem.i === el.i);
					const activeStyle = isActive ? 'border-blue-500 bg-blue-100' : '';

					return (
						<div
							key={ind}
							className={`p-4 border-1 border-[#bae7ff] rounded-xl min-w-[260px] min-h-18 flex justify-between hover:cursor-pointer ${activeStyle}`}
						>
							<span>{el.i}</span>
							<button
								onClick={() =>
									isActive ? removeWidget(el.i) : addWidget(el.i)
								}
							>
								{isActive ? 'Remove' : 'Add'}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ManageWidgets;
