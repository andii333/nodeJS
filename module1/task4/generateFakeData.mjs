import { faker } from "@faker-js/faker";
export function generateFakeData(rowNumber) {
  return [
    rowNumber,
    faker.person.firstName(),
    faker.person.lastName(),
    faker.company.name(),
    faker.location.streetAddress(),
    faker.location.city(),
    faker.location.country(),
    faker.location.zipCode(),
    faker.phone.number(),
    faker.internet.email(),
    faker.internet.url(),
  ].join(":");
}
