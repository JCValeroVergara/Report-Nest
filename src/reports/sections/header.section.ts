import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
}

const currentDate: Content = {
    text: DateFormatter.getFormattedDate(new Date()),
    alignment: 'right',
    margin: [20, 35],
    fontSize: 8,
    width: 100,
}

interface HeaderSectionOptions {
    title?: string;
    subtitle?: string;
    showlogo?: boolean;
    showdate?: boolean;
}

export const headerSection = (options: HeaderSectionOptions): Content => {
    const { title, subtitle, showlogo = true, showdate = true } = options;

    const headerLogo:Content = showlogo ? logo : null;
    const headerDate:Content = showdate ? currentDate : null;
    const headerSubTitle:Content = subtitle 
    ? { 
        text: subtitle, 
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
        fontSize: 16,
        // bold: true, 
        }
    }: null;
    const headerTitle:Content = title 
    ? { 
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0, 15, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22,
                },
            },
            headerSubTitle,
        ],
    }: null;

    return {
        columns: [headerLogo, headerTitle, headerDate]
    };
}