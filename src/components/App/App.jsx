import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { getUsers } from "@/helpers/faker";
import { Mistakes } from "@/helpers/genMistakes";
import Toolbar from "../Toolbar/Toolbar";
import { useInView } from "react-intersection-observer";
import { fakerEN } from "@faker-js/faker";
import { en } from "@/helpers/translation";
import { ExportToCsv } from "export-to-csv";

function App() {
  const [mistakes, setMistakes] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersWithMistakes, setUsersWithMistakes] = useState(users);
  const [faker, setFaker] = useState(fakerEN);
  const [seed, setSeed] = useState(faker.number.int(99999));
  const [locale, setLocale] = useState(en);
  const [page, setPage] = useState(1);
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });
  faker.seed(seed);
  const handleInputSlider = (e) => {
    setMistakes(+e.target.value);
  };
  const handleInput = (e) => {
    +e.target.value < 1000 ? setMistakes(+e.target.value) : setMistakes(1000);
  };
  const handleSeed = (e) => {
    +e.target.value < 99999 ? setSeed(+e.target.value) : setSeed(99999);
    faker.seed(seed);
  };
  const handleRandom = () => {
    setMistakes(0);
    setSeed(faker.number.int(99999));
  };
  const handleCSV = () => {
    const data = mistakes ? usersWithMistakes : users;
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Gen Random Users CSV",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  };
  useEffect(() => {
    setUsers(getUsers(faker, 20));
  }, [seed, faker]);
  useEffect(() => {
    if (entry) {
      if (inView) {
        setPage(page + 1);
        console.log(page);
        faker.seed(seed + page);
        setUsers([...users, ...getUsers(faker, 10)]);
      }
    }
  }, [inView]);
  useEffect(() => {
    if (mistakes > 0) {
      const newUsers = users.map((user) => {
        let n = 0;
        let newUser = user;
        let count = mistakes;
        if (Math.random() < mistakes % 1) {
          count = Math.floor(mistakes) + 1;
        }
        while (n < count) {
          n++;
          newUser = new Mistakes(mistakes, newUser).userWithMistakes;
        }
        return newUser;
      });
      setUsersWithMistakes(newUsers);
    } else {
      setUsersWithMistakes(users);
    }
  }, [mistakes, users]);
  return (
    <div className="container mx-auto py-4 px-2 text-center">
      <Toolbar
        faker={faker}
        setFaker={setFaker}
        locale={locale}
        setLocale={setLocale}
      />
      <div className="bg-light mb-5">
        <label htmlFor="probability" className="form-label">
          {locale.label_prob}
        </label>
        <div
          className="container d-flex align-items-center justify-content-center
          mb-3"
          style={{ maxWidth: "500px" }}
        >
          <output>0</output>
          <input
            id="probability"
            type="range"
            name="amountRange"
            min="0"
            max="10"
            step={0.25}
            value={mistakes}
            onChange={handleInputSlider}
          />
          <output>{mistakes > 10 ? 10 : mistakes}</output>
        </div>
        <input
          className="form-control mx-auto mb-3"
          style={{ maxWidth: "100px" }}
          type="number"
          name="amountInput"
          min="0"
          max="1000"
          value={mistakes}
          onChange={handleInput}
        />
        <label htmlFor="seed" className="form-label">
          {locale.seed}
        </label>
        <input
          className="form-control mx-auto mb-3"
          style={{ maxWidth: "100px" }}
          type="number"
          name="amountInput"
          min="0"
          max="99999"
          value={seed}
          onChange={handleSeed}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRandom}
        >
          {locale.button}
        </button>
        <div className="py-3">
          <button className="btn btn-success" onClick={handleCSV}>
            {locale.csv}
          </button>
        </div>
      </div>
      <Table users={usersWithMistakes} locale={locale} />
      <div className="container" ref={ref} style={{ height: "20px" }}></div>
    </div>
  );
}

export default App;
