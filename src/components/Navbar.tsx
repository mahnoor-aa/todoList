import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	return (
		<nav className="bg-blue-800 px-4 py-4 w-screen h-auto">
			<div className="flex items-center justify-between w-full">
				<h1 className="text-white text-lg font-bold">TO-DO LIST</h1>

				<div className="sm:hidden">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="text-white text-2xl"
					>
						{isDropdownOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>

				<ul className="hidden sm:flex space-x-6 text-white text-sm font-semibold">
					<li className="pl-6">
						<Link
							className="hover:bg-blue-900 rounded-full max-w-32 px-4 py-2 text-center"
							to="/"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							className="hover:bg-blue-900 rounded-full max-w-32 px-4 py-2 text-center"
							to="/about"
						>
							About
						</Link>
					</li>
				</ul>
			</div>
			{isDropdownOpen && (
				<div className="sm:hidden mt-4 flex flex-col gap-y-2 font-semibold text-white">
					<Link
						className="border-b border-gray-500 px-2.5 py-3"
						to="/"
						onClick={() => setIsDropdownOpen(false)}
					>
						Home
					</Link>
					<Link
						className=" px-2.5 py-3"
						to="/about"
						onClick={() => setIsDropdownOpen(false)}
					>
						About
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
