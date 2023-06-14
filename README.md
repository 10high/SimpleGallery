# Simple Gallery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Simple Gallery Live Site](https://flyingtens.com/SimpleGallery)

![](/SimpleGalleryScreenshot.png)

### What is it?

Simple Gallery is, as the name suggests, a simple gallery that displays pictures hosted on Flickr, based on the user search query. It is built with React and React Router in Vite.

I built it to practice these three technologies. Also, fetch requests to the Flickr API are sent via a PHP file on the server (cURL) that returns the response to the client, thereby keeping the API key secret.

### How to use

- Clone the repository on your local machine.
- Install the dependencies with `npm install`
- Enter your Flickr API key in `/public/api/proxy.php`

### Notes

The project is deployed under the nested public path `/SimpleGallery/`. This is configured in `vite.config.js`, see [Public Base Path](https://vitejs.dev/guide/build.html#public-base-path) in the Vite Docs.

The images returned from Flickr are checked to ensure their width is minimum 240px to avoid stretching. This requires images to be loaded first and is accomplished by combining `onLoad()` with the fetch request and `useEffect()`.
Because the Flickr request used here returns images with a longest length of 240px, a much simpler way would have been to check the original dimensions and remove images that are taller than they are wider - but I wanted to see how to do it using only the returned image data. 🤷
