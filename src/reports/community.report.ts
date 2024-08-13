import type { TDocumentDefinitions } from "pdfmake/interfaces";



export const  getCommunityReport = ():TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        content: [
            {
                columns: [
                    {
                        image:'src/assets/tucan-code-logo.png',
                        width: 50,
                    },
                    {
                        alignment: 'center',
                        text: 'Forestal Admin Community SAP\n RUT: 123456789\n Dirección: Av. Siempre Viva 1234 \n Teléfono: 123456789',
                    },
                    {
                        layout: 'borderblue',
                        alignment: 'right',
                        width: 140,
                        table: {
                            body: [
                                [
                                    {
                                        layout:'noBorders',
                                        table: {
                                            body: [
                                                ['No Factura','123-123'],
                                                ['Fecha','12-12-2024'],
                                                ['Versión','2024-001'],
                                            ],
                                        },
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },

            //? Horizantal Line
            {
                margin: [0, 10],
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 520,
                        y2: 5,
                        lineWidth: 1,
                        lineColor: '#3A4546',
                    },
                ],
            },

            //? Detalles de Cliente
            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body:[
                        [
                            {
                                text: 'Datos del Cliente',
                                fillColor: '#5775e1',
                                color: '#ffffff',
                                colSpan: 4,
                                border: [false, false, false, false],
                            },
                            {},
                            {},
                            {},
                        ],

                        //? Razón Social
                        [
                            {
                                text: 'Razón social',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [true, true, false, false]
                            },
                            {
                                text: 'Nombre de la razón social',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, true, false, false]
                            },
                            {
                                text: 'Dirección',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [true, true, false, false]
                            },
                            {
                                text: 'Calle 1234 - Ciudad',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, true, true, false]
                            },
                        ],

                        //? RUT
                        [
                            {
                                text: 'RUT',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [true, false, false, false]
                            },
                            {
                                text: '12.345.678-9',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, false, false, false]
                            },
                            {
                                text: 'Teléfono',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [true, false, false, false]
                            },
                            {
                                text: '123456789',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, false, true, false]
                            },
                        ],

                        //? Condición de Pago
                        [
                            {
                                text: 'Condición de Pago',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [true, false, false, true]
                            },
                            {
                                text: '30 días',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, false, true, true]
                            },
                            {
                                text: 'Email',
                                fillColor: '#343a40',
                                color: '#ffffff',
                                border: [false, false, false, true]
                            },
                            {
                                text: 'asdfadsf@fadsjfja.com',
                                fillColor: '#ffffff',
                                color: '#000000',
                                border: [false, false, true, true]
                            },
                        ],
                    ],
                },
            },
        ],
    };

    return docDefinition;
};

