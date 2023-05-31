import { fakerEN, fakerCS_CZ, fakerEL } from "@faker-js/faker";
import { cs, en, el } from "@/helpers/translation";

const Toolbar = ({ faker, setFaker, locale, setLocale }) => {
  const hadleClick = (e) => {
    switch (e.target.innerHTML) {
      case "USA":
        setLocale(en)
        setFaker(fakerEN);
        break;
      case "čeština":
        setLocale(cs)
        setFaker(fakerCS_CZ);
        break;
      case "Ελλάδα":
        setLocale(el)
        setFaker(fakerEL);
        break;
    }
  };
  return (
    <div
      className="d-flex flex-wrap align-items-center 
        justify-content-center justify-content-lg-start gap-3 mb-3"
    >
      <button
        type="button"
        className={faker === fakerEN ? "btn btn-secondary" : "btn btn-primary"}
        onClick={hadleClick}
      >
        USA
      </button>
      <button
        type="button"
        className={faker === fakerEL ? "btn btn-secondary" : "btn btn-primary"}
        onClick={hadleClick}
      >
        Ελλάδα
      </button>
      <button
        type="button"
        className={
          faker === fakerCS_CZ ? "btn btn-secondary" : "btn btn-primary"
        }
        onClick={hadleClick}
      >
        čeština
      </button>
    </div>
  );
};

export default Toolbar;
