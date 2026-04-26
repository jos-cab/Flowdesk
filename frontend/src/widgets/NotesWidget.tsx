import type { WidgetProps } from '../types/widgets';

type NotesConfig = {
	text: string;
};

// TODO: List of notes
export default function NotesWidget({ config, onConfigChange }: WidgetProps) {
	const notesConfig = config as NotesConfig;

	const handleChange = (value: string) => {
		onConfigChange({
			...notesConfig,
			text: value,
		});
	};

	return (
		<div style={{ height: '100%' }}>
			<textarea
				value={notesConfig?.text ?? ''}
				onChange={(e) => handleChange(e.target.value)}
				placeholder='Write your notes...'
				style={{
					width: '100%',
					height: '100%',
					resize: 'none',
					outline: 'none',
				}}
			/>
		</div>
	);
}
