export function Button({ children, className = '', ...props }) {
    return (
        <button
            className={`bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-full w-full ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
