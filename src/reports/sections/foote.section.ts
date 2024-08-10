import { Content, ContextPageSize } from "pdfmake/interfaces";


export const footerSection = ( 
    currentPage: number, 
    pageCont: number,
    pageSize: ContextPageSize
): Content => {
    

    return {
        text: `Pagina ${currentPage} de ${pageCont}`,
        alignment: 'right',
        fontSize: 12,
        bold: true,
        margin: [0, 20, 20, 0]
    };
}