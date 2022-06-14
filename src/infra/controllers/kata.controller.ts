export class KataController {
  public get = (req: any, res: any) => {
    res.status(200).send({ result: 0 });
  };

  public post = (req: any, res: any) => {
    const result = req.body.number;
    res.status(200).send({ result: result });
  };
}
