export function hasCookie(key: string): boolean {
    const cookies = document.cookie;
    return cookies.includes(`${key}=`);
};

export function getCookieValue(key: string): string | undefined {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        if (cookie.includes('=')) {
            const [cookieKey, cookieValue] = cookie.split('=');

            if (cookieKey.trim() === key.trim()) {
                return decodeURIComponent(cookieValue);
            };
        };
    };
    return undefined;
};