import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.person.fullName(),
    state: faker.location.state(),
    city: faker.location.city(),
    street: faker.location.streetAddress(true),
    phone:faker.phone.number("+1##########")
  };
}
