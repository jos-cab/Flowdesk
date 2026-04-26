import {
	GridLayout,
	noCompactor,
	useContainerWidth,
	type Layout,
} from 'react-grid-layout';

import { useDashboardStore } from '../store/dashboardStore';
import WidgetRenderer from './WidgetRenderer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ALL_RESIZE_HANDLES = [
	's',
	'w',
	'e',
	'n',
	'sw',
	'nw',
	'se',
	'ne',
] as const;

export default function DashboardGrid() {
	const widgets = useDashboardStore((s) => s.widgets);
	const layout = useDashboardStore((s) => s.layout);

	const updateLayout = useDashboardStore((s) => s.updateLayout);
	const updateWidgetConfig = useDashboardStore((s) => s.updateWidgetConfig);
	const removeWidget = useDashboardStore((s) => s.removeWidget);

	const editMode = useDashboardStore((s) => s.editMode);

	const { width, containerRef, mounted } = useContainerWidth();

	const handleLayoutChange = (nextLayout: Layout) => {
		updateLayout([...nextLayout]);
	};

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: '100vh',
			}}>
			{mounted && (
				<GridLayout
					className='layout'
					width={width}
					layout={layout}
					gridConfig={{
						cols: 12,
						rowHeight: 100,
					}}
					compactor={noCompactor}
					onLayoutChange={handleLayoutChange}
					dragConfig={{
						enabled: editMode,
					}}
					resizeConfig={{
						enabled: editMode,
						handles: [...ALL_RESIZE_HANDLES],
					}}>
					{widgets.map((widget) => (
						<div
							key={widget.id}
							className='widget-shell'
							style={{
								position: 'relative',
								height: '100%',
							}}>
							{editMode && (
								<button
									onClick={(e) => {
										e.stopPropagation();
										removeWidget(widget.id);
									}}
									onMouseDown={(e) => e.stopPropagation()}
									style={{
										position: 'absolute',
										top: '50%',
										right: '50%',
										transform: 'translate(50%, -50%)',
										zIndex: 10,
									}}>
									✕
								</button>
							)}

							<WidgetRenderer
								widget={widget}
								onConfigChange={updateWidgetConfig}
							/>
						</div>
					))}
				</GridLayout>
			)}
		</div>
	);
}
