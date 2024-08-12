import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
    constructor(
        private readonly printerService: PrinterService
    ) {}

    getHtmlReport() {
        const docDefinition = getHelloWorldReport({
                title: 'Hello World',
                description: 'This is a simple hello world report',
                name: 'John Doe'
            });

        const doc = this.printerService.createPdf(docDefinition)

        return doc;
    }
}
