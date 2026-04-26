import { useDashboardStore } from './store/dashboardStore';
import WidgetRenderer from './components/WidgetRenderer';

function App() {
	const widgets = useDashboardStore((s) => s.widgets);

	const addWidget = useDashboardStore((s) => s.addWidget);

	const updateWidgetConfig = useDashboardStore((s) => s.updateWidgetConfig);

	return (
		<>
			<button
				onClick={() =>
					addWidget({
						id: crypto.randomUUID(),
						type: 'notes',
						config: {
							text: '',
						},
					})
				}>
				Add Notes Widget
			</button>

			{widgets.map((widget) => (
				<WidgetRenderer
					key={widget.id}
					widget={widget}
					onConfigChange={updateWidgetConfig}
				/>
			))}
		</>
	);
}

export default App;
