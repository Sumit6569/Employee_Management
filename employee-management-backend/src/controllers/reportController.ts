import { Request, Response, NextFunction } from 'express';
import { reportQuerySchema } from '../validators/reportValidator.js';
import { getReports } from '../services/reportService.js';
import { sseService } from '../services/sseService.js';

export const getReportsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filters = reportQuerySchema.parse(req.query);

    const reports = await getReports(filters);

    sseService.broadcast({
      type: 'report-generated',
      message: `Report generated successfully with ${reports.length} records`,
      data: {
        count: reports.length,
        filters,
      },
    });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};
