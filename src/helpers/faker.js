import { fakerEN, fakerCS_CZ, fakerEL } from "@faker-js/faker";

export const getUsers = (faker, count) => {
  let code = "1";
  switch (faker) {
    case fakerCS_CZ:
      code = "420";
      break;
    case fakerEL:
      code = "30";
      break;
  }
  const createRandomUser = () => {
    return {
      userId: faker.string.uuid(),
      username: faker.person.fullName(),
      state: faker.location.state(),
      city: faker.location.city(),
      street: faker.location.streetAddress(true),
      phone: faker.phone.number(`+${code}#########`),
    };
  };
  return faker.helpers.multiple(createRandomUser, {
    count,
  });
};
