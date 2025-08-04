import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ToDo } from '../../interfaces.ts';

interface State {
	items: ToDo[];
}
const initialState: State = {
	items: [],
};

export const todoSlice = createSlice({
	name: 'todoList',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ToDo>) => {
			state.items.push(action.payload);
		},
		deleteItem: (state, action: PayloadAction<number>) => {
			state.items.splice(action.payload, 1);
		},
		editItem: (state, action: PayloadAction<{ index: number; item: ToDo }>) => {
			state.items[action.payload.index] = action.payload.item;
		},
		completeItem: (state, action: PayloadAction<number>) => {
			state.items[action.payload].completed = true;
		},
	},
});

export const { addItem, editItem, deleteItem, completeItem } =
	todoSlice.actions;
export default todoSlice.reducer;
