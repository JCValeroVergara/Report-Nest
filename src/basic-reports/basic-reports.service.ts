import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

//TODO: Deberá ser optimizado más adelante
import PdfPrinter from 'pdfmake';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        // console.log('Connected to the database');
    }

    hello() {
        const printer = new PdfPrinter(fonts);

        const docDefinition: TDocumentDefinitions = {
            content: ['Hello world!']
        };

        const doc = printer.createPdfKitDocument(docDefinition)
        return doc;
    }

}
