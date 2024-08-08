import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 20, 0, 50]
}

interface HeaderSectionOptions {
    title?: string;
    subtitle?: string;
    showlogo?: boolean;
    showdate?: boolean;
}

export const headerSection = (options: HeaderSectionOptions): Content => {
    const { title, subtitle, showlogo = true, showdate = true } = options;

    const headerLogo = showlogo ? logo : null;
    const date = DateFormatter.getFormattedDate(new Date());

    return {
        columns: [
            headerLogo,
            {
                text: date,
                alignment: 'right',
                margin: [ 20, 20]
            }      
        ] ,
    };
}