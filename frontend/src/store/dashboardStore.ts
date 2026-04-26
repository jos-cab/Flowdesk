import { create } from 'zustand';
import type { WidgetInstance } from '../types/widgets';
import { getWidget } from '../registry/widgetRegistry';

type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type LayoutItem = {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	resizeHandles?: ResizeHandle[];
};

interface DashboardState {
	widgets: WidgetInstance[];
	layout: LayoutItem[];

	editMode: boolean;

	addWidget: (widget: WidgetInstance) => void;

	removeWidget: (id: string) => void;

	updateWidgetConfig: (id: string, config: Record<string, unknown>) => void;

	updateLayout: (layout: LayoutItem[]) => void;

	toggleEditMode: () => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
	widgets: [],
	layout: [],

	editMode: false,

	addWidget: (widget) =>
		set((state) => {
			const definition = getWidget(widget.type);

			return {
				widgets: [...state.widgets, widget],

				layout: [
					...state.layout,
					{
						i: widget.id,
						x: 0,
						y: 0,
						w: definition.defaultSize.w,
						h: definition.defaultSize.h,
					},
				],
			};
		}),

	removeWidget: (id) =>
		set((state) => ({
			widgets: state.widgets.filter((widget) => widget.id !== id),

			layout: state.layout.filter((item) => item.i !== id),
		})),

	updateWidgetConfig: (id, config) =>
		set((state) => ({
			widgets: state.widgets.map((widget) =>
				widget.id === id
					? {
							...widget,
							config,
						}
					: widget,
			),
		})),

	updateLayout: (layout) =>
		set({
			layout,
		}),

	toggleEditMode: () =>
		set((state) => ({
			editMode: !state.editMode,
		})),
}));
