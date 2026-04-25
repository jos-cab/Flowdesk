// TODO: validations

export type WidgetSize = {
	w: number;
	h: number;
};

export interface WidgetProps {
	id: string;
	config: Record<string, unknown>;
	onConfigChange: (config: Record<string, unknown>) => void;
}

export interface WidgetDefinition {
	type: string;
	name: string;
	defaultSize: WidgetSize;
	component: React.FC<WidgetProps>;
	defaultConfig: Record<string, unknown>;
}
