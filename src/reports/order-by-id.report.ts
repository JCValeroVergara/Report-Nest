import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { footerSection } from "./sections/foote.section";
import { CurrencyFormarter, DateFormatter } from "src/helpers";

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

export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}



interface OrderReportValues{
    title? : string;
    subTitle? : string;
    data: CompleteOrder;
}

export const reportByIdOrder = (value: OrderReportValues):TDocumentDefinitions=> {
    
    const { data } = value;
    const { customers, order_details } = data;

    const subTotal = order_details.reduce((acc, item) => acc + (+item.products.price * item.quantity), 0);
    const IVA = subTotal * 0.16;
    const total = subTotal + IVA;

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
                            {text: `Recibo No: ${data.order_id} \n`, bold: true},
                            `Fecha del recibo: ${DateFormatter.getFormattedDate(data.order_date)}  \nPagar antes de: ${DateFormatter.getFormattedDate(new Date())} \n`,
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
                    `Razón Social: ${customers.customer_name}
                    ${customers.contact_name}
                    ${customers.address} - ${customers.city} - ${customers.country}`
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
                        ...order_details.map((item, index) => [
                            index + 1,
                            item.products.product_name,
                            item.quantity,
                            {text:CurrencyFormarter.formatCurrency(+item.products.price), alignment: 'right'},
                            {text:CurrencyFormarter.formatCurrency(+item.products.price * item.quantity), alignment: 'right'},
                        ]),
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
                                ['Subtotal:', {text:`${CurrencyFormarter.formatCurrency(subTotal)}`, alignment: 'right'}],
                                ['IVA:', {text:`${CurrencyFormarter.formatCurrency(IVA)}`, alignment: 'right'}],
                                [{text:'Total:', bold: true}, {text:`${CurrencyFormarter.formatCurrency(total)}`, alignment: 'right', bold: true, fontSize: 14}],
                            ],
                        },
                    },
                ],
            },
        ],
    }
};