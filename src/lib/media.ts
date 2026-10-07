const UNSPLASH_WIDTHS = [640, 960, 1400, 2000];

export const unsplash = (id: string, width = 1400) =>
    `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;

export const unsplashSrcSet = (id: string, widths = UNSPLASH_WIDTHS) =>
    widths.map((width) => `${unsplash(id, width)} ${width}w`).join(', ');
