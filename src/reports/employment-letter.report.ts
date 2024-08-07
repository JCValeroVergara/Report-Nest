import type { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";

const styles:StyleDictionary = {
    header: {
        fontSize: 24,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
    },
    bodyContent: {
        fontSize: 16,
        alignment: 'justify',
        margin: [0, 10, 0, 50]
    },
    subheader: {
        fontSize: 16,
        alignment: 'right',
        margin: [0, 50, 0, 0]
    },
    tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
    }
}

export const getEmploymentLetterReport = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        styles: styles,
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
            {
                text: '[Nombre del Empleador]',
                style: 'subheader'
            }

        ],
    }

    return docDefinition;
}