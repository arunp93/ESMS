import {
  Request,
  Response,
} from "express";

import { AnalyticsService } from "../services/analytics.service";

const analyticsService =
  new AnalyticsService();

export class AnalyticsController {
  async getPayrollSummary(
    _req: Request,
    res: Response
  ) {
    const result =
      await analyticsService.getPayrollSummary();

    return res.json(result);
  }

  async getHighestPaidEmployees(
    _req: Request,
    res: Response
  ) {
    const result =
      await analyticsService.getHighestPaidEmployees();

    return res.json(result);
  }

  async getDepartmentBreakdown(
    _req: Request,
    res: Response
  ) {
    const result =
      await analyticsService.getDepartmentBreakdown();

    return res.json(result);
  }
}