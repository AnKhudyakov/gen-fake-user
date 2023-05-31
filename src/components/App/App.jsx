import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { faker } from "@faker-js/faker";
import { createRandomUser } from "../../helpers/faker";
import { Mistakes } from "../../helpers/genMistakes";
function App() {
  const [local, setLocal] = useState("en");
  const [mistakes, setMistakes] = useState(0);
  const [seed, setSeed] = useState(0);
  const [users, setUsers] = useState([]);
  const [usersWithMistakes, setUsersWithMistakes] = useState([]);
  const [random, setRandom] = useState(0);
  const handleInputSlider = (e) => {
    setMistakes(+e.target.value);
  };
  const handleInput = (e) => {
    +e.target.value < 1000 ? setMistakes(+e.target.value) : setMistakes(1000);
  };
  const handleSeed = (e) => {
    setSeed(e.target.value);
  };
  const handleRandom = () => {
    setMistakes(0)
    setRandom(+seed);
    faker.seed(random);
  };
  useEffect(() => {
    setUsers(
      faker.helpers.multiple(createRandomUser, {
        count: 20,
      })
    );
  }, [random]);

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
  }, [mistakes]);
  return (
    <div className="container mx-auto py-4 px-5 text-center">
      <div
        className="d-flex flex-wrap align-items-center 
        justify-content-center justify-content-lg-start gap-3 mb-3"
      >
        <button
          type="button"
          className={local === "en" ? "btn btn-secondary" : "btn btn-primary"}
          onClick={() => setLocal("en")}
        >
          USA
        </button>
        <button
          type="button"
          className={
            local === "ka_GE" ? "btn btn-secondary" : "btn btn-primary"
          }
          onClick={() => setLocal("ka_GE")}
        >
          Georgia
        </button>
        <button
          type="button"
          className={local === "de" ? "btn btn-secondary" : "btn btn-primary"}
          onClick={() => setLocal("de")}
        >
          Germany
        </button>
      </div>
      <div className="bg-light mb-5">
        <label htmlFor="probability" className="form-label">
          Probability of mistakes
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
          Seed
        </label>
        <input
          className="form-control mx-auto mb-3"
          style={{ maxWidth: "100px" }}
          type="number"
          name="amountInput"
          min="0"
          max="1000"
          value={seed}
          onChange={handleSeed}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRandom}
        >
          Random
        </button>
      </div>
      <Table users={mistakes ? usersWithMistakes : users} />
    </div>
  );
}

export default App;
