import { create } from 'zustand';
import type { WidgetInstance } from '../types/widgets';
import { getWidget } from '../registry/widgetRegistry';

type LayoutItem = {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
};

interface DashboardState {
	widgets: WidgetInstance[];
	layout: LayoutItem[];

	addWidget: (widget: WidgetInstance) => void;
	removeWidget: (id: string) => void;
	updateLayout: (layout: LayoutItem[]) => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
	widgets: [],
	layout: [],

	addWidget: (widget) =>
		set((state) => {
			const definition = getWidget(widget.type);

			return {
				widgets: [...state.widgets, widget],

				layout: [
					...state.layout,
					{
						i: widget.id,
						x: 0, // FIXME: Get dashboard free position
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

	updateLayout: (layout) => set({ layout }),
}));
