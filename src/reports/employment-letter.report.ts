import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

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
const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 20, 0, 50]
}

export const getEmploymentLetterReport = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        styles: styles,
        pageMargins: [40, 60, 40, 60],
        header: {
            columns: [
                logo,
                {
                    text: DateFormatter.getFormattedDate(new Date()),
                    alignment: 'right',
                    margin: [ 20, 20]
                }      
            ] ,
        },
        content: [
            {
                text: 'CONSTANCIA DE EMPLEO',
                style: 'header'
            },
            {
                text:   `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
                        por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra 
                        empresa desde el [Fecha de Inicio del Empleado]. \n\n
                        Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
                        Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus 
                        labores.\n\n
                        La jornada laboral del Sr./Sra. [Nombre del Empleado] es de [Número de Horas] horas 
                        semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y 
                        procedimientos establecidos por la empresa.\n\n
                        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.`,
                style: 'bodyContent'
            },
            {
                text: `Atentamente,\n [Nombre del Empleador]\n [Cargo del Empleador]\n [Nombre de la Empresa]\n [Fecha de Emisión]\n`,
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