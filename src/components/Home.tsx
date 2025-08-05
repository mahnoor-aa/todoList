import React, { useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdClose, MdDelete } from 'react-icons/md';
import type { RootState, AppDispatch } from '../redux/store';
import {
	addItem,
	editItem,
	deleteItem,
	completeItem,
} from '../redux/slices/todoslice';
import type { ToDo } from '../interfaces';
import { useDispatch, useSelector } from 'react-redux';

const getCurrentDate = (): string => {
	const curr = new Date();
	return curr.toISOString().split('T')[0];
};

const getCurrentTime = (): string => {
	const curr = new Date();
	return curr.toTimeString().slice(0, 5);
};

const Home = () => {
	const dispatch: AppDispatch = useDispatch();
	const items = useSelector((state: RootState) => state.todo.items);
	const [isPopUp, setIsPopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const [item, setItem] = useState<ToDo>({
		title: '',
		date: getCurrentDate(),
		time: getCurrentTime(),
		completed: false,
	});

	const setFields = (): void => {
		setIsPopUp(true);
		setIsEditing(false);
		setItem({
			title: '',
			date: getCurrentDate(),
			time: getCurrentTime(),
			completed: false,
		});
	};

	const submitForm = (event: React.FormEvent) => {
		event.preventDefault();
		if (isEditing && index !== null) {
			dispatch(editItem({ index, item }));
		} else {
			dispatch(addItem(item));
		}
		setIsEditing(false);
		setIsPopUp(false);
		setIndex(null);
		setItem({
			title: '',
			date: getCurrentDate(),
			time: getCurrentTime(),
			completed: false,
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setItem((prev) => ({ ...prev, [name]: value }));
	};

	const handleEdit = (i: number) => {
		setItem(items[i]);
		setIndex(i);
		setIsEditing(true);
		setIsPopUp(true);
	};

	return (
		<div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 justify-center py-4">
			<div className="mb-8 mt-6">
				<button
					onClick={() => setFields()}
					className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 text-center flex font-semibold cursor-pointer"
				>
					<IoIosAdd className="text-2xl" />
					Add Task
				</button>
			</div>

			<div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
				{items.length > 0 ? (
					<ul className="space-y-4.5">
						{items.map((item: ToDo, index: number) => (
							<li
								key={index}
								className={`border border-white rounded p-4 shadow-sm bg-white relative ${item.completed ? 'bg-gray-300 opacity-50 pointer-events-none' : ''}`}
							>
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
									<h2 className="font-semibold text-lg">{item.title}</h2>
									<p className="font-medium text-md text-gray-500">
										{item.date} @ {item.time}
									</p>
								</div>
								<div className="mt-3 flex flex-wrap justify-end gap-2">
									<button
										title="Edit"
										disabled={item.completed}
										onClick={() => handleEdit(index)}
										className="text-gray-600 px-3 py-1 text-lg hover:text-gray-900 cursor-pointer"
									>
										<FaEdit />
									</button>
									<button
										title="Complete"
										disabled={item.completed}
										onClick={() => dispatch(completeItem(index))}
										className="text-green-600 px-3 py-1 text-lg hover:text-green-900 cursor-pointer"
									>
										<FaCheck />
									</button>

									<button
										title="Delete"
										disabled={item.completed}
										onClick={() => dispatch(deleteItem(index))}
										className="text-red-600 px-3 py-1 text-lg hover:text-red-900 cursor-pointer"
									>
										<MdDelete />
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600 text-center mt-6">
						No Items Yet.
						<br />
						Click Add Task to get started.
					</p>
				)}
			</div>
			{isPopUp && (
				<>
					<div className="backdrop-blur-sm fixed inset-0 flex items-center px-4 justify-center">
						<div className="bg-white fixed top-1/2 left-1/2 rounded-xl shadow-xl max-w-md w-[90%] transform -translate-1/2 p-6">
							<button
								className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-red-700"
								onClick={() => setIsPopUp(false)}
							>
								<MdClose className="text-2xl" />
							</button>
							<h2 className="text-2xl text-center text-blue-800 font-semibold mb-6">
								{isEditing ? 'Edit Task' : 'Add Task'}
							</h2>
							<form onSubmit={submitForm}>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="title"
									value={item.title}
									onChange={handleChange}
									required
									placeholder="Enter Title"
								/>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="date"
									min={getCurrentDate()}
									max="2050-12-31"
									value={item.date}
									onChange={handleChange}
									type="date"
									placeholder="Enter Date"
								/>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="time"
									value={item.time}
									onChange={handleChange}
									type="time"
									placeholder="Enter Time"
								/>
								<button
									type="submit"
									className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 text-center flex font-semibold cursor-pointer mx-auto "
								>
									Save Task
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
