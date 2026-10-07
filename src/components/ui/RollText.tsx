type RollTextProps = {
    children: string;
    className?: string;
};

/**
 * Texto que "rola" letra a letra no hover. O elemento pai precisa da classe `group/roll`.
 */
export default function RollText({ children, className = '' }: RollTextProps) {
    const chars = Array.from(children);

    const renderChars = (offset: string) =>
        chars.map((char, index) => (
            <span
                key={index}
                className={`inline-block transition-transform duration-700 ease-out-expo ${offset}`}
                style={{ transitionDelay: `${index * 14}ms` }}
            >
                {char === ' ' ? ' ' : char}
            </span>
        ));

    return (
        <span className={`relative inline-flex overflow-hidden whitespace-nowrap ${className}`}>
            <span className="sr-only">{children}</span>
            <span aria-hidden="true" className="block">
                {renderChars('group-hover/roll:-translate-y-full')}
            </span>
            <span aria-hidden="true" className="absolute inset-0 block">
                {renderChars('translate-y-full group-hover/roll:translate-y-0')}
            </span>
        </span>
    );
}
