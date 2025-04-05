import { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import DashboardGrid from '../dashboard-grid/DashboardGrid';
import ManageWidgets from '../manage-widgets/ManageWidgets';
import Button from '../ui/button/Button';

const App = () => {
	const dashboard = useDashboard();
	const [isEdit, setIsEdit] = useState(false);
	const [draftLayout, setDraftLayout] = useState(dashboard.layout);

	// Входим в режим редактирования — создаём рабочую копию
	const handleEdit = () => {
		setDraftLayout([...dashboard.layout]); // делаем копию массива
		setIsEdit(true);
	};

	// Сохраняем изменения — заливаем draft в основной стейт и localStorage
	const handleSaveEdit = () => {
		dashboard.onLayoutChange(draftLayout);
		setIsEdit(false);
	};

	// Отменяем — просто выходим из режима редактирования, draftLayout отбрасывается
	const handleCancelEdit = () => {
		setIsEdit(false);
	};
	return (
		<div className='min-h-full bg-gradient-to-br from-blue-300 from-0% to-gray-200 to-[12%] p-4 flex gap-5 flex-col'>
			<div className='bg-white w-full rounded-2xl min-h-8 py-4 px-6 flex gap-2'>
				{isEdit ? (
					<>
						<Button onClick={handleCancelEdit}>Cancel</Button>
						<Button
							onClick={handleSaveEdit}
							className={
								'bg-blue-400 hover:bg-blue-300 text-white hover:!text-white'
							}
						>
							Save Changes
						</Button>
					</>
				) : (
					<Button onClick={handleEdit}>
						<svg
							width='1rem'
							height='1rem'
							viewBox='0 0 16 17'
							color='currentColor'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M14.2075 5.08572L11.4144 2.29322C11.3215 2.20034 11.2113 2.12666 11.0899 2.07639C10.9686 2.02612 10.8385 2.00024 10.7072 2.00024C10.5759 2.00024 10.4458 2.02612 10.3245 2.07639C10.2031 2.12666 10.0929 2.20034 10 2.29322L2.29313 10.0001C2.19987 10.0926 2.12593 10.2028 2.0756 10.3241C2.02528 10.4455 1.99959 10.5756 2.00001 10.707V13.5001C2.00001 13.7653 2.10536 14.0197 2.2929 14.2072C2.48043 14.3947 2.73479 14.5001 3.00001 14.5001H13.5C13.6326 14.5001 13.7598 14.4474 13.8536 14.3536C13.9473 14.2599 14 14.1327 14 14.0001C14 13.8675 13.9473 13.7403 13.8536 13.6465C13.7598 13.5528 13.6326 13.5001 13.5 13.5001H7.20751L14.2075 6.50009C14.3004 6.40723 14.3741 6.29698 14.4243 6.17564C14.4746 6.0543 14.5005 5.92425 14.5005 5.79291C14.5005 5.66156 14.4746 5.53151 14.4243 5.41017C14.3741 5.28883 14.3004 5.17858 14.2075 5.08572ZM5.79313 13.5001H3.00001V10.707L8.50001 5.20697L11.2931 8.00009L5.79313 13.5001ZM12 7.29322L9.20751 4.50009L10.7075 3.00009L13.5 5.79322L12 7.29322Z'
								fill='currentColor'
							></path>
						</svg>
						Edit Dashboard
					</Button>
				)}
			</div>

			{isEdit && (
				<ManageWidgets
					layout={draftLayout}
					setLayout={setDraftLayout}
					addWidget={id =>
						setDraftLayout(prev => [
							...prev,
							{ i: id, x: 0, y: Infinity, w: 4, h: 2 },
						])
					}
					removeWidget={id =>
						setDraftLayout(prev => prev.filter(w => w.i !== id))
					}
				/>
			)}
			<DashboardGrid
				isEdit={isEdit}
				layout={isEdit ? draftLayout : dashboard.layout}
				onLayoutChange={newLayout => {
					if (isEdit) {
						setDraftLayout(newLayout);
					} else {
						dashboard.onLayoutChange(newLayout);
					}
				}}
				removeWidget={id => {
					if (isEdit) {
						setDraftLayout(prev => prev.filter(w => w.i !== id));
					} else {
						dashboard.removeWidget(id);
					}
				}}
				onHeightChange={(id, h) => {
					if (isEdit) {
						setDraftLayout(prev =>
							prev.map(w => (w.i === id ? { ...w, h } : w))
						);
					} else {
						dashboard.onHeightChange(id, h);
					}
				}}
			/>
		</div>
	);
};

export default App;
