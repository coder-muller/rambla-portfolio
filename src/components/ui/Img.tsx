import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

type ImgProps = ImgHTMLAttributes<HTMLImageElement> & { alt: string };

/** Imagem que, se falhar ao carregar, vira um bloco com o gradiente da marca. */
export default function Img({ alt, className, onError, ...props }: ImgProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return <span role="img" aria-label={alt} className={`img-fallback block ${className ?? ''}`} />;
    }

    return (
        <img
            alt={alt}
            className={className}
            decoding="async"
            onError={(event) => {
                setFailed(true);
                onError?.(event);
            }}
            {...props}
        />
    );
}
