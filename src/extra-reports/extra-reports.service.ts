import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from '../helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';

@Injectable()
export class ExtraReportsService {
    constructor(
        private readonly printerService: PrinterService
    ) {}

    getHtmlReport() {

        const html = fs.readFileSync('src/reports/html/basic-01.html', 'utf8');
        const content = getHtmlContent(html);
        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 110, 40, 60],
            header: headerSection({
                title: 'HTML to PDFMake',
                subtitle: 'Convert HTML a PDFMake',
            }),
            content: content,
        };

        const doc = this.printerService.createPdf(docDefinition)

        return doc;
    }
}
