import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class StoreReportService {
    constructor(
        private readonly printerService: PrinterService
    ) {}

    async getOrderByIdReport(orderId: string) {
        const docDefinition = getHelloWorldReport(
            {
                title: `Hello World!!!!!!`,
                description: 'This is a simple hello world report',
                name: `Juan Carlos Valero  ${orderId}`,
            }
        );

        const doc = this.printerService.createPdf(docDefinition)
        return doc;
    }
}
