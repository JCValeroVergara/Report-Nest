import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportService } from './store-report.service';
import { Response } from 'express';

@Controller('store-report')
export class StoreReportController {
  constructor(private readonly storeReportService: StoreReportService) { }

  @Get('orders/:orderId')
  async getOrders(
    @Res() response: Response,
    @Param('orderId') orderId: string
  ) {
    const pdfDoc = await this.storeReportService.getOrderByIdReport(+orderId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svgs-charts')
  async getSvgChart(
    @Res() response: Response,
  ) {
    const pdfDoc = await this.storeReportService.getSvgChart();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Svg-Chart-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
