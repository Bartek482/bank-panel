export function Badge({ children, className = '' }) {
    return (
        <span className={`inline-block px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded ${className}`}>
      {children}
    </span>
    );
}
