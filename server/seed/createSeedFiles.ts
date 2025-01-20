import { faker } from '@faker-js/faker';
import * as path from 'path';
import { writeFileSync } from 'fs';

const RANDOMUSERS: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}[] = [];

function createRandomUser() {
  return {
    email: faker.internet.email(),
    username: faker.internet.username(),
    password: faker.internet.password(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  RANDOMUSERS.push(createRandomUser());
});

console.log(RANDOMUSERS);

const PETS: {
  type: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  location: string;
  image: string;
}[] = [];

function createRandomPet() {
  const type = Math.random() > 0.5 ? 'dog' : 'cat';
  const sizes = ['S', 'M', 'L', 'XL'];
  return {
    type,
    name: faker.animal.petName(),
    breed: type === 'dog' ? faker.animal.dog() : faker.animal.cat(),
    age: faker.number.int({ min: 1, max: 14 }),
    gender: Math.random() > 0.5 ? 'M' : 'F',
    size:
      type === 'cat' ? 'S' : sizes[Math.floor(Math.random() * sizes.length)],
    location: faker.location.city(),
    image:
      type === 'cat'
        ? faker.image.urlLoremFlickr({ category: 'cats' })
        : faker.image.urlLoremFlickr({ category: 'dogs' }),
  };
}

Array.from({ length: 50 }).forEach(() => {
  PETS.push(createRandomPet());
});

console.log(PETS);

writeFileSync(
  path.join(process.cwd(), 'seed', 'user_data.json'),
  JSON.stringify(RANDOMUSERS, null, 2),
);
// writeFileSync(path.join(process.cwd(), "seed", "pet_data.json"), JSON.stringify(PETS, null, 2))
