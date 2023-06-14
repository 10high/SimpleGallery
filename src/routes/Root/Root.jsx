import {
  Form,
  NavLink,
  Outlet,
  redirect,
  useParams,
  useNavigation,
} from "react-router-dom";
import styles from "./root.module.css";
import flickrLogo from "../../assets/images/Flickr_wordmark.svg";
import { useEffect } from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const query = formData.get("query");
  const category = encodeURIComponent(query).replace(/%20/g, "+");

  return redirect(`${import.meta.env.BASE_URL}/category/${category}`);
}

export default function Root() {
  const { category } = useParams();
  const navigation = useNavigation();

  const searchQueryValueFromParams = () => {
    return category ? category.replace(/\+/g, " ") : "puppies";
  };

  useEffect(() => {
    if (navigation.state === "idle") {
      document.getElementById("q").value = searchQueryValueFromParams();
    }
  });

  return (
    <>
      <header>
        <h1 className={styles.headerText}>
          Simple{" "}
          <img
            className={styles.headerLogo}
            src={flickrLogo}
            alt="Flickr wordmark"
          />{" "}
          Gallery
        </h1>
        <Form method="post" role="search">
          <input
            id="q"
            name="query"
            placeholder="Search"
            type="search"
            defaultValue={searchQueryValueFromParams()}
            aria-label="Search for pictures"
            required
          />
          <input type="submit" value="Submit" />
        </Form>
        <nav>
          <ul>
            <li>
              <NavLink
                to={import.meta.env.BASE_URL + "/category/puppies"}
                className={({ isActive }) =>
                  isActive ? styles.navlinkActive : styles.navlinkInactive
                }
              >
                Puppies
              </NavLink>
            </li>
            <li>
              <NavLink
                to={import.meta.env.BASE_URL + "/category/kittens"}
                className={({ isActive }) =>
                  isActive ? styles.navlinkActive : styles.navlinkInactive
                }
              >
                Kittens
              </NavLink>
            </li>
            <li>
              <NavLink
                to={import.meta.env.BASE_URL + "/category/red+pandas"}
                className={({ isActive }) =>
                  isActive ? styles.navlinkActive : styles.navlinkInactive
                }
              >
                Red Pandas
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className={styles.footerLinksWrapper}>
          <a
            className={styles.footerLegalLink}
            href="https://flyingtens.com/LegalPages/impressum.html"
          >
            Impressum
          </a>
          <a
            className={styles.footerLegalLink}
            href="https://flyingtens.com/LegalPages/datenschuetzErklaerung.html"
          >
            Datenschutzerkl&auml;rung
          </a>
          <a
            className={styles.footerLegalLink}
            href="https://flyingtens.com/LegalPages/haftungsausschluss.html"
          >
            Haftungsausschluss
          </a>
        </div>
      </footer>
    </>
  );
}
