import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import { fetchAllImages } from "../../apiRequests";
import styles from "./category.module.css";
import { useState, useEffect } from "react";

export async function loader({ params }) {
  const category = params.category;
  const allImageBlobs = await fetchAllImages(category, 1);
  if (allImageBlobs.length < 1) {
    throw new Error();
  } else {
    const allImages = allImageBlobs.map((blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob.value);
      return img;
    });
    return allImages;
  }
}

export default function Category() {
  const navigation = useNavigation();
  const allImages = useLoaderData();
  let { category } = useParams();
  const [allValidImages, setAllValidImages] = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [allNewImages, setAllNewImages] = useState([]);

  async function moreBlobs() {
    const allImageBlobs = await fetchAllImages(category, pageNumber + 1);
    setPageNumber((prevNum) => prevNum + 1);
    const images = allImageBlobs.map((blob) => {
      const img = new Image();
      img.src = URL.createObjectURL(blob.value);
      return img;
    });
    setAllNewImages(() => [...images]);
  }

  const checkImageSize = (img) => {
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const width = img.naturalWidth;
        if (width >= 240) {
          resolve(img);
        } else {
          reject();
        }
      };
      img.onerror = reject;
    });
  };

  useEffect(() => {
    const loadImagesSizes = async () => {
      const validImages = [];
      await Promise.allSettled(
        allImages.map(async (img) => {
          await checkImageSize(img).then(function (result) {
            validImages.push(result);
          });
        })
      );
      const max = Math.min(Math.max(validImages.length, 0), 9);
      const displayImagesSelection = validImages.slice(0, max);
      const updatedValidImages = validImages.slice(max);
      setAllValidImages(() => [...updatedValidImages]);
      setDisplayImages(() => [...displayImagesSelection]);
    };
    loadImagesSizes();
  }, [allImages, allValidImages]);

  const removeImage = async (index) => {
    const updatedDisplayImages = [...displayImages];
    updatedDisplayImages.splice(index, 1);
    if (allValidImages.length < 1) {
      document
        .getElementById(`imageDisplay${index}`)
        .classList.add(styles.imageDisplayLoading);
      document
        .getElementById(`spinner${index}`)
        .classList.add(styles.spinnerLoading);
      await moreBlobs();
      setDisplayImages(() => [...updatedDisplayImages]);
      document
        .getElementById(`imageDisplay${index}`)
        .classList.remove(styles.imageDisplayLoading);
      document
        .getElementById(`spinner${index}`)
        .classList.remove(styles.spinnerLoading);
      return;
    }
    const newImage = allValidImages.pop();
    updatedDisplayImages.push(newImage);
    setDisplayImages(() => [...updatedDisplayImages]);
  };

  useEffect(() => {
    const loadImagesSizes = async () => {
      const validImages = [];
      await Promise.allSettled(
        allNewImages.map(async (img) => {
          await checkImageSize(img).then(function (result) {
            validImages.push(result);
          });
        })
      );
      const maxImagesPossible = Math.min(
        validImages.length,
        9 - displayImages.length
      );
      const displayImagesSelection = validImages.slice(0, maxImagesPossible);
      const updatedValidImages = validImages.slice(maxImagesPossible);
      setAllValidImages(() => [...updatedValidImages]);
      setDisplayImages((prevImages) => [
        ...prevImages,
        ...displayImagesSelection,
      ]);
    };
    loadImagesSizes();
  }, [allNewImages]);

  const header = () => {
    return category.replace(/\+/g, " ");
  };

  return (
    <>
      <h2 className={styles.header}>{header()}</h2>
      <div className={styles.gallery}>
        {displayImages.map((img, index) => (
          <div id={index} className={styles.imageContainer} key={index}>
            <svg
              id={`spinner${index}`}
              aria-hidden
              className={
                navigation.state === "loading"
                  ? `${styles.spinner} ${styles.spinnerLoading}`
                  : styles.spinner
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="3" r="0">
                <animate
                  id="spinner_318l"
                  begin="0;spinner_cvkU.end-0.5s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="16.50" cy="4.21" r="0">
                <animate
                  id="spinner_g5Gj"
                  begin="spinner_318l.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="7.50" cy="4.21" r="0">
                <animate
                  id="spinner_cvkU"
                  begin="spinner_Uuk0.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="19.79" cy="7.50" r="0">
                <animate
                  id="spinner_e8rM"
                  begin="spinner_g5Gj.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="4.21" cy="7.50" r="0">
                <animate
                  id="spinner_Uuk0"
                  begin="spinner_z7ol.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="21.00" cy="12.00" r="0">
                <animate
                  id="spinner_MooL"
                  begin="spinner_e8rM.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="3.00" cy="12.00" r="0">
                <animate
                  id="spinner_z7ol"
                  begin="spinner_KEoo.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="19.79" cy="16.50" r="0">
                <animate
                  id="spinner_btyV"
                  begin="spinner_MooL.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="4.21" cy="16.50" r="0">
                <animate
                  id="spinner_KEoo"
                  begin="spinner_1IYD.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="16.50" cy="19.79" r="0">
                <animate
                  id="spinner_1sIS"
                  begin="spinner_btyV.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="7.50" cy="19.79" r="0">
                <animate
                  id="spinner_1IYD"
                  begin="spinner_NWhh.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
              <circle cx="12" cy="21" r="0">
                <animate
                  id="spinner_NWhh"
                  begin="spinner_1sIS.begin+0.1s"
                  attributeName="r"
                  calcMode="spline"
                  dur="0.6s"
                  values="0;2;0"
                  keyTimes="0;.2;1"
                  keySplines="0,1,0,1;.53,0,.61,.73"
                  fill="freeze"
                />
              </circle>
            </svg>

            <div
              id={`imageDisplay${index}`}
              className={
                navigation.state === "loading" ? styles.imageDisplayLoading : ""
              }
            >
              <button
                className={styles.deleteButton}
                type="button"
                onClick={() => removeImage(index)}
                aria-label="remove image"
                title="remove image"
              >
                x
              </button>
              <img className={styles.image} src={img.src} alt="" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
