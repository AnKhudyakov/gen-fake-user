import { faker } from "@faker-js/faker";

let chrs = "abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789";
let fields = ["username", "state", "city", "street", "phone"];

export class Mistakes {
  constructor(p, user) {
    this.p = p;
    this.user = user;
    this.field = this.getField();
    this.value = user[this.field];
    this.fieldWithMistakes = this.genFields(user);
  }
  get userWithMistakes() {
    return { ...this.user, [this.field]: this.fieldWithMistakes };
  }
  getField = () => {
    const fieldIndex = faker.number.int(fields.length - 1);
    return fields[fieldIndex];
  };
  genFields = (user) => {
    const typeMistake = faker.number.int(2);
    switch (typeMistake) {
      case 0:
        return this.removeChar(this.field, this.value);
      case 1:
        return this.addChar(this.field, this.value);
      case 2:
        return this.swapChars(this.field, this.value);
    }
  };

  removeChar = (field, value) => {
    const index = this.getRandomIndex(value);
    //console.log("REMOVE");
    return value.slice(0, index - 1) + value.slice(index);
  };
  addChar = (field, value) => {
    const index = this.getRandomIndex(value);
    const char = this.genChar(chrs);
    //  console.log("ADD");
    return value.slice(0, index) + char + value.slice(index);
  };
  swapChars = (field, value) => {
    const index = this.getRandomIndex(value);
    //console.log("SWAP");
    if (index === value.length - 1) {
      let first = value[index - 1];
      let second = value[index];
      return value.slice(0, index - 1) + second + first;
    } else if (index === 0) {
      let first = value[0];
      let second = value[1];
      return second + first + value.slice(index + 2, value.length);
    } else {
      let first = value[index];
      let second = value[index + 1];
      return value.slice(0, index) + second + first + value.slice(index + 2);
    }
  };
  genChar = (str) => {
    const index = this.getRandomIndex(str);
    return str.slice(index, index + 1);
  };
  getRandomIndex(str) {
    return faker.number.int(str.length - 1);
  }
}
