import { statusOk } from "./../helpers/index";
import module from "../domain/index";

const makeSut = async () => {
  const sut = await module.useCaseSearchAll.run();

  return { sut };
};

describe("FUNCIONALIDADES DE USERS", () => {
  test("Shold return 200 if all ok", async () => {
    const result = (await makeSut()).sut;
    console.log("<<<<<<<", result);
    expect(result.statusCode).toBe(200);
  });

  // test("Shold return 500 if throws", async () => {
  //   const result = (await makeSut()).sut;
  //   expect(result.statusCode).toBe(500);
  // });
});
