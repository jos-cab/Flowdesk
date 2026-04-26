import DashboardGrid from './components/DashboardGrid';
import { useDashboardStore } from './store/dashboardStore';

export default function App() {
	const editMode = useDashboardStore((s) => s.editMode);

	const toggleEditMode = useDashboardStore((s) => s.toggleEditMode);
	const addWidget = useDashboardStore((s) => s.addWidget);

	return (
		<div className='app'>
			<button onClick={toggleEditMode}>
				{editMode ? 'Done' : 'Customize'}
			</button>

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
		</div>
	);
}
