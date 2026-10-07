type ArrowProps = { className?: string };

export default function Arrow({ className = 'h-3 w-3' }: ArrowProps) {
    return (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden="true">
            <path d="M3 13L13 3M13 3H5.5M13 3V10.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
