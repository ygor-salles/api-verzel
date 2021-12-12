import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, resp: Response) =>
  resp.status(200).json({ message: 'Hellow, api-verzel' }),
);

export { router };