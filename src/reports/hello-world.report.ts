import type { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
    title: string;
    description: string;
    name: string;
}

export const  getHelloWorldReport = (options: ReportOptions):TDocumentDefinitions => {
    const { name } = options;

    const docDefinition: TDocumentDefinitions = {
        content: [`Hello ${name}`],
    };

    return docDefinition;
}