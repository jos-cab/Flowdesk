import { create } from 'zustand';
import type { Layout } from 'react-grid-layout';
import type { WidgetInstance } from '../types/widget';
import { getWidget } from '../registry/widgetRegistry';

// XXX: does not sync with gridConfig.maxRows in DashboardGrid
const GRID_COLS = 12;
const GRID_MAX_ROWS = 5;

// HACK: findFreePosition instead of hardcoding initial position of widgets
function findFreePosition(
	layout: Layout,
	w: number,
	h: number,
	maxRows: number,
): { x: number; y: number } {
	const occupied = new Set<string>();

	for (const item of layout) {
		for (let x = item.x; x < item.x + item.w; x++) {
			for (let y = item.y; y < item.y + item.h; y++) {
				occupied.add(`${x},${y}`);
			}
		}
	}

	for (let y = 0; y <= maxRows - h; y++) {
		for (let x = 0; x <= GRID_COLS - w; x++) {
			let free = true;

			for (let dx = 0; dx < w && free; dx++) {
				for (let dy = 0; dy < h; dy++) {
					if (occupied.has(`${x + dx},${y + dy}`)) {
						free = false;
						break;
					}
				}
			}

			if (free) {
				return { x, y };
			}
		}
	}

	return { x: 0, y: 0 };
}

interface DashboardState {
	widgets: WidgetInstance[];
	layout: Layout;

	editMode: boolean;

	addWidget: (widget: WidgetInstance) => void;

	removeWidget: (id: string) => void;

	updateLayout: (nextLayout: Layout) => void;

	updateWidgetConfig: (id: string, config: Record<string, unknown>) => void;

	toggleEditMode: () => void;
}

export const useDashboardStore = create<DashboardState>()((set) => ({
	widgets: [],
	layout: [],

	editMode: false,

	addWidget: (widget) =>
		set((state) => {
			const definition = getWidget(widget.type);
			const position = findFreePosition(
				state.layout,
				definition.defaultSize.w,
				definition.defaultSize.h,
				GRID_MAX_ROWS,
			);

			return {
				widgets: [...state.widgets, widget],

				layout: [
					...state.layout,
					{
						i: widget.id,
						x: position.x,
						y: position.y,
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

	updateLayout: (nextLayout) =>
		set(() => ({
			layout: [...nextLayout],
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

	toggleEditMode: () =>
		set((state) => ({
			editMode: !state.editMode,
		})),
}));
