import jwt from "jsonwebtoken";

import {
  authenticate,
} from "../../middleware/auth.middleware";

process.env.JWT_SECRET =
  "test-secret";
  
describe(
  "authenticate",
  () => {
    it(
      "should return 401 when token is missing",
      () => {
        const req: any = {
          headers: {},
        };

        const res: any = {
          status:
            jest.fn()
              .mockReturnThis(),

          json:
            jest.fn(),
        };

        const next =
          jest.fn();

        authenticate(
          req,
          res,
          next
        );

        expect(
          res.status
        ).toHaveBeenCalledWith(
          401
        );

        expect(
          next
        ).not.toHaveBeenCalled();
      }
    );

    it(
      "should call next when token is valid",
      () => {
        const token =
          jwt.sign(
            {
              userId: 1,
              role:
                "ADMIN",
            },
            process.env.JWT_SECRET as string
          );

        const req: any = {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        };

        const res: any = {};

        const next =
          jest.fn();

        authenticate(
          req,
          res,
          next
        );

        expect(
          next
        ).toHaveBeenCalled();
      }
    );
  }
);