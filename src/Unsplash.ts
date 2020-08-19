export interface Photo {
    id: string;
    links: { html: string };
    description: string;
    urls: {
        regular: string;
    };
}

export const fetchPhotos = async <T>(count: number): Promise<T> => {
    const accessKey = 'IeKNM-LtK4rPl33O7KIsUWznAWDWx8PQHUMope2oEhg';
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
    const response = await fetch(apiUrl);
    const body = await response.json();
    return body;
};
