import { getWidget } from '../registry/widgetRegistry';
import type { WidgetInstance } from '../types/widget';

type WidgetRendererProps = {
	widget: WidgetInstance;
	onConfigChange: (id: string, config: Record<string, unknown>) => void;
};

export default function WidgetRenderer({
	widget,
	onConfigChange,
}: WidgetRendererProps) {
	const definition = getWidget(widget.type);

	const Component = definition.component;

	return (
		<Component
			id={widget.id}
			config={widget.config}
			onConfigChange={(config) => onConfigChange(widget.id, config)}
		/>
	);
}
