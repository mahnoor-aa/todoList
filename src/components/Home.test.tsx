import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { renderPage } from '../test-utils';

beforeEach(() => {
	localStorage.clear();
});

test('No items in the list', () => {
	renderPage(<Home />);
	expect(screen.getByText(/No Items Yet/i)).toBeInTheDocument();
});

test('popup when Add Task is pressed', () => {
	renderPage(<Home />);
	fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
	expect(screen.getByPlaceholderText('Enter Title')).toBeInTheDocument();
});

test('When task is added', () => {
	renderPage(<Home />);
	fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
	fireEvent.change(screen.getByPlaceholderText('Enter Title'), {
		target: { value: 'Test Task 1' },
	});
	fireEvent.click(screen.getByText('Save Task'));
	expect(screen.getByText('Test Task 1')).toBeInTheDocument();
});

test('When task is edited', () => {
	renderPage(<Home />);
	fireEvent.click(screen.getByRole('button', { name: 'Add Task' }));
	fireEvent.change(screen.getByPlaceholderText('Enter Title'), {
		target: { value: 'Test Title 1' },
	});
	fireEvent.click(screen.getByText('Save Task'));
	expect(screen.getByText('Test Title 1')).toBeInTheDocument();

	fireEvent.click(screen.getByTitle('Edit'));
	fireEvent.change(screen.getByPlaceholderText('Enter Title'), {
		target: { value: 'New Test Title 1' },
	});
	fireEvent.change(screen.getByPlaceholderText('Enter Date'), {
		target: { value: '2025-08-01' },
	});
	fireEvent.change(screen.getByPlaceholderText('Enter Time'), {
		target: { value: '12:35' },
	});
	fireEvent.click(screen.getByText('Save Task'));
	expect(screen.getByText('New Test Title 1')).toBeInTheDocument();
	expect(screen.getByText(/2025-08-01/)).toBeInTheDocument();
	expect(screen.getByText(/12:35/)).toBeInTheDocument();
	expect(screen.queryByText('Test Title 1')).not.toBeInTheDocument();
});

test('When task is deleted', () => {
	renderPage(<Home />);
	fireEvent.click(screen.getByText('Add Task'));
	fireEvent.change(screen.getByPlaceholderText('Enter Title'), {
		target: { value: 'Test Delete Task' },
	});
	fireEvent.click(screen.getByText('Save Task'));
	expect(screen.getByText('Test Delete Task')).toBeInTheDocument();
	fireEvent.click(screen.getByTitle('Delete'));
	expect(screen.queryByText('Test Delete Task')).not.toBeInTheDocument();
});

test('When task is completed', () => {
	renderPage(<Home />);
	fireEvent.click(screen.getByText('Add Task'));
	fireEvent.change(screen.getByPlaceholderText('Enter Title'), {
		target: { value: 'Test Complete Task' },
	});
	fireEvent.click(screen.getByText('Save Task'));
	expect(screen.getByText('Test Complete Task')).toBeInTheDocument();

	fireEvent.click(screen.getByTitle('Complete'));

	expect(screen.getByTitle('Edit')).toBeDisabled();
	expect(screen.getByTitle('Complete')).toBeDisabled();
	expect(screen.getByTitle('Delete')).toBeDisabled();
});
