import type { WidgetDefinition } from '../types/widgets';

const registry: Record<string, WidgetDefinition> = {};

export function registerWidget(widget: WidgetDefinition) {
	if (registry[widget.type]) {
		throw new Error(`Widget already registered: ${widget.type}`);
	}

	registry[widget.type] = widget;
}

export function getWidget(type: string): WidgetDefinition {
	const widget = registry[type];

	if (!widget) {
		throw new Error(`Unknown widget: ${type}`);
	}

	return widget;
}

export function getAllWidgets() {
	return Object.values(registry);
}
