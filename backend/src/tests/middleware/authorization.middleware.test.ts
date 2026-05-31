import {
  authorize,
} from "../../middleware/authorization.middleware";

describe(
  "authorization middleware",
  () => {
    it(
      "should allow access when role matches",
      () => {
        const req: any = {
          user: {
            role: "ADMIN",
          },
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

        authorize(
          "ADMIN"
        )(
          req,
          res,
          next
        );

        expect(
          next
        ).toHaveBeenCalled();
      }
    );

    it(
      "should return 403 when role does not match",
      () => {
        const req: any = {
          user: {
            role:
              "HR_MANAGER",
          },
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

        authorize(
          "ADMIN"
        )(
          req,
          res,
          next
        );

        expect(
          res.status
        ).toHaveBeenCalledWith(
          403
        );

        expect(
          next
        ).not.toHaveBeenCalled();
      }
    );

    it(
      "should return 401 when user is missing",
      () => {
        const req: any = {};

        const res: any = {
          status:
            jest.fn()
              .mockReturnThis(),
          json:
            jest.fn(),
        };

        const next =
          jest.fn();

        authorize(
          "ADMIN"
        )(
          req,
          res,
          next
        );

        expect(
          res.status
        ).toHaveBeenCalledWith(
          401
        );
      }
    );
  }
);