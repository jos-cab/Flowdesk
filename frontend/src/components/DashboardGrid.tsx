import GridLayout, { type Layout } from 'react-grid-layout';
import { useDashboardStore } from '../store/dashboardStore';
import WidgetRenderer from './WidgetRenderer';

export default function DashboardGrid() {
	const widgets = useDashboardStore((s) => s.widgets);

	const layout = useDashboardStore((s) => s.layout);

	const updateLayout = useDashboardStore((s) => s.updateLayout);

	const updateWidgetConfig = useDashboardStore((s) => s.updateWidgetConfig);

	const handleLayoutChange = (layout: Layout) => {
		updateLayout([...layout]);
	};

	return (
		<GridLayout
			className='layout'
			layout={layout as Layout}
			width={1200}
			onLayoutChange={handleLayoutChange}>
			{widgets.map((widget) => (
				<div key={widget.id} className='widget-shell'>
					<div className='widget-header'>{widget.type}</div>

					<WidgetRenderer
						widget={widget}
						onConfigChange={updateWidgetConfig}
					/>
				</div>
			))}
		</GridLayout>
	);
}
