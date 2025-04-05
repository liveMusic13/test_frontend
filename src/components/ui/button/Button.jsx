const Button = ({ children, onClick, className }) => {
	return (
		<button
			onClick={onClick}
			className={`border-gray-200 border-1 px-[15px] py-1 rounded-xl hover:border-blue-300 hover:text-blue-300 duration-150 hover:cursor-pointer flex gap-1 items-center ${
				className ? className : ''
			}`}
		>
			{children}
		</button>
	);
};

export default Button;
