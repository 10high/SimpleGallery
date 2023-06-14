
async function fetchAllImageDetailsfromCategory(category, page) {
    const query = category.replace(/\+/g, " ");
    try {
        const response = await fetch(`${import.meta.env.BASE_URL}/api/proxy.php`, {
            headers: {
                "tags": query,
                "page": page
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching JSON: ", error)
    }
}

async function fetchImage(imageDetails) {
    const SERVER_ID = imageDetails.server;
    const ID = imageDetails.id;
    const SECRET = imageDetails.secret;
    const URL = `https://live.staticflickr.com/${SERVER_ID}/${ID}_${SECRET}_m.jpg`;

    try {
        const response = await fetch(URL);
        const imageBlob = await response.blob();
        return imageBlob;
    } catch (error) {
        console.log(("Error fetching Image", error));
        return null;
    }
}

export async function fetchAllImages(category, page) {
    const imageDetails = await fetchAllImageDetailsfromCategory(category, page);
    const imageBlobs = await Promise.allSettled(
        imageDetails.photos.photo.map(async item => await fetchImage(item))
    )
    return imageBlobs;

}