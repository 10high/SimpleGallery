<?php

$searchtags = $_SERVER["HTTP_TAGS"];
$pagenum = $_SERVER["HTTP_PAGE"];
$tags = urlencode($searchtags);
$page = urlencode($pagenum);
$apiKey = "YOUR_API_KEY";
$method = "flickr.photos.search";
$endpoint = "https://www.flickr.com/services/rest/?method=$method&api_key=$apiKey&text=$tags&content_type=1&page=$page&per_page=32&format=json&nojsoncallback=1";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $endpoint);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);


$output = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $output;
}

?>
