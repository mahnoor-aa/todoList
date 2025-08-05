const About = () => {
	return (
		<div className="flex items-center justify-center h-[calc(100vh-64px)] px-4 sm:px-6 md:px-8">
			<div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg text-center w-full max-w-sm sm:max-w-md md:max-w-lg">
				<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4 sm:mb-6">
					ABOUT
				</h1>
				<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
					This is a simple ToDo List page where you can add, edit and manage
					your daily tasks. It helps you stay organized and productive!
				</p>
			</div>
		</div>
	);
};

export default About;
