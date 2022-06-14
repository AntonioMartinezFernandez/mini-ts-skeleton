import { KataController } from '../src/infra/controllers/kata.controller';

const kataController = new KataController();

describe('Kata Test', () => {
  test('kata get', () => {
    const req = {};
    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    kataController.get(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ result: 0 });
  });

  test('kata post', () => {
    const req = {
      body: {
        number: 5,
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    kataController.post(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ result: 5 });
  });
});
