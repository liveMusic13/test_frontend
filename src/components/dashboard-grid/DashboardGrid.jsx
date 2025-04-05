import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetContent from './widget-content/WidgetContent';

const ResponsiveGridLayout = WidthProvider(Responsive);

const rowHeight = 30;

const DashboardGrid = ({
	onHeightChange,
	onLayoutChange,
	removeWidget,
	layout,
	isEdit,
}) => {
	return (
		<ResponsiveGridLayout
			layouts={{ lg: layout, md: layout, sm: layout, xs: layout }}
			breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
			cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
			rowHeight={rowHeight}
			isDraggable={isEdit}
			isResizable={isEdit}
			onLayoutChange={layout => onLayoutChange(layout)}
		>
			{layout.map(item => (
				<div
					key={item.i}
					data-grid={item}
					className='border-1 border-[#e9edf5] relative rounded-2xl p-3.5 bg-white group hover:cursor-pointer'
				>
					<WidgetContent
						item={item}
						isEdit={isEdit}
						removeWidget={removeWidget}
						onHeightChange={onHeightChange}
						rowHeight={rowHeight}
					/>
				</div>
			))}
		</ResponsiveGridLayout>
	);
};

export default DashboardGrid;
