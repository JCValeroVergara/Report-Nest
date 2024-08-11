import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { footerSection } from "./sections/foote.section";
import { CurrencyFormarter } from "src/helpers";

const logo:Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [40, 20, 30, 10],
};

const style: StyleDictionary = {
    header:{
        fontSize: 20,
        bold: true,
        margin: [0, 30, 0, 15],
    },
    subHeader:{
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 0],
    },
};

export const reportByIdOrder = ():TDocumentDefinitions=> {
    return{
        styles: style,
        header: logo,
        pageMargins: [ 40, 60, 40, 60 ],
        footer: footerSection,
        content: [
            //? Header
            { text: 'Tucan Code', style: 'header' },

            //? Address and Order
            {
                columns: [
                    {
                        text:  '15 Montgomery Str, Suite 100,\nOttawa ON K2Y 9X1, CANADA \nBN: 12783671823 \nPhone: +1 613 555 0155, \nhttps://devtalles.com'
                    },
                    {
                        text:[
                            {text: `Recibo No#: 10255 \n`, bold: true},
                            `Fecha del recibo: 11 de julio de 2021 \nPagar antes de: 18 de mayo de 2024 \n`,
                        ],
                        alignment: 'right'
                    }
                ],
            },
            //? QR Code
            { qr: 'https://devtalles.com', fit: 75, alignment: 'right' },

            //? Datos del cliente
            {
                text: [
                    {text:`Cobrar a: \n`, style: 'subHeader'},
                    `Razón Social: Richter Supermarkt
                    Michael Holz
                    Grenzacherweg 237`
                ],
            },

            //? Tabla detalles de la orden
            {
                layout: "headerLineOnly",
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50,'*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID','Descripción', 'Cantidad', 'Precio', 'Total'],
                        [`1`, `Producto 1`, `1`, `$10`, {text:`${CurrencyFormarter.formatCurrency(10)}`, alignment: 'right'}],
                        [`2`, `Producto 2`, `2`, `$20`, {text:`${CurrencyFormarter.formatCurrency(40)}`, alignment: 'right'}],
                        [`3`, `Producto 3`, `3`, `$30`, {text:`${CurrencyFormarter.formatCurrency(90)}`, alignment: 'right'}],
                        [`4`, `Producto 4`, `4`, `$40`, {text:`${CurrencyFormarter.formatCurrency(160)}`, alignment: 'right'}],
                        [`5`, `Producto 5`, `5`, `$50`, {text:`${CurrencyFormarter.formatCurrency(250)}`, alignment: 'right'}],
                    ],
                },
            },

            //? Totales de la orden
            {
                margin: [0, 20],
                columns: [
                    {
                        width: '*',
                        text: ' ',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            headerRows: 1,
                            widths: ['*', 'auto'],
                            body: [
                                ['Subtotal:', {text:`${CurrencyFormarter.formatCurrency(550)}`, alignment: 'right'}],
                                // ['IVA:', `${CurrencyFormarter.formatCurrency(550)}`],
                                [{text:'Total:', bold: true}, {text:`${CurrencyFormarter.formatCurrency(550)}`, alignment: 'right', bold: true, fontSize: 14}],
                            ],
                        },
                    },
                ],
            },
            // {
            //     layout: "headerLineOnly",
            //     text: [
            //         {text:`Detalles de la orden: \n`, style: 'subHeader'},
            //         `Fecha de la orden: 11 de julio de 2021
            //         Fecha de entrega: 18 de mayo de 2024
            //         Método de pago: Tarjeta de crédito
            //         `,
            //     ],
            // },
        ],
    }
};