import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from '../helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/foote.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
    constructor(
        private readonly printerService: PrinterService
    ) {}

    getHtmlReport() {

        const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');
        const content = getHtmlContent(html,{
            client: 'Juan Valero',
            title: 'Reporte de prueba curso de NodeJS',
        });
        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 110, 40, 60],
            header: headerSection({
                title: 'HTML to PDFMake',
                subtitle: 'Convert HTML a PDFMake',
            }),
            footer: footerSection,
            content: content,
        };

        const doc = this.printerService.createPdf(docDefinition)

        return doc;
    }

    getCommunity () {
    
        const docDefinition = getCommunityReport();

        const doc = this.printerService.createPdf(docDefinition)

        return doc;
    }
}
