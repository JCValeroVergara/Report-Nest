import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { DateFormatter } from "src/helpers";

interface ReportData {
    employerName: string;
    employerPosition: string;
    employeeName: string;
    employeePosition: string;
    employeeStartDate: Date;
    employeeHours: number;
    employerWorkSchedule: string;
    employerCompany: string;
}

const styles:StyleDictionary = {
    header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 60, 0, 20]
    },
    bodyContent: {
        fontSize: 14,
        alignment: 'justify',
        margin: [0, 10, 0, 60]
    },
    subheader: {
        fontSize: 14,
        alignment: 'right',
        margin: [0, 20, 0, 0]
    },
    footer: {
        fontSize: 10,
        italics: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
    },
    tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
    }
}

export const getEmploymentLetterByIdReport = ( values: ReportData): TDocumentDefinitions => {

    const { employerName, employerPosition, employeeName, employeePosition, employeeStartDate, employeeHours, employerWorkSchedule, employerCompany } = values;

    const docDefinition: TDocumentDefinitions = {
        styles: styles,
        pageMargins: [40, 60, 40, 60],
        header:  headerSection({ showlogo: true, showdate: true}),
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header'
            },
            {
                text:   `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
                        por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra 
                        empresa desde el ${DateFormatter.getFormattedDate(employeeStartDate)}. \n\n
                        Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
                        labores.\n\n
                        La jornada laboral del Sr./Sra. ${employeeName} es de ${employeeHours} horas 
                        semanales, con un horario de ${employerWorkSchedule}, cumpliendo con las políticas y 
                        procedimientos establecidos por la empresa.\n\n
                        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
                style: 'bodyContent'
            },
            {
                text: `Atentamente,\n  ${employerName}\n ${employerPosition}\n  ${employerCompany}\n ${DateFormatter.getFormattedDate(new Date())}\n`,
                // style: 'subheader'
            },
        ],
        footer: {
            text: ' Este documento es una constancia de empleo y no representa un compromiso laboral',
            style: 'footer'
        }
    }

    return docDefinition;
}