import DashboardGrid from './components/DashboardGrid';
import { useDashboardStore } from './store/dashboardStore';

function App() {
	const addWidget = useDashboardStore((s) => s.addWidget);

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

			<DashboardGrid />
		</>
	);
}

export default App;
