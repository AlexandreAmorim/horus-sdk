interface ICoord {
    lat: number;
    lng: number;
}

const getCurrentPosition = async (): Promise<ICoord> => {
    if (!('geolocation' in navigator)) {
        throw new Error('seu navegado não suporta Geolocalização.');
    }

    return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
            reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }, (err) => {
            reject(err);
        });
    });
};

export default getCurrentPosition;