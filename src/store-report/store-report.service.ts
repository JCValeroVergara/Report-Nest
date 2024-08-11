import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { reportByIdOrder } from 'src/reports';

@Injectable()
export class StoreReportService {
    constructor(
        private readonly printerService: PrinterService
    ) {}

    async getOrderByIdReport(orderId: string) {
        const docDefinition = reportByIdOrder();

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }
}
