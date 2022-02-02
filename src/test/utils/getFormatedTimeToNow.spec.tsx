import { format } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";

import {
    getFormatedTimeToNow,
    getFormatedTimeToNowExtended,
    formatDateToNow,
    formatDate,
} from "../../components/utils";

describe("Date to now format functions", () => {
    before(() => {
        expect(getFormatedTimeToNowExtended, "getFormatedTimeToNowExtended").to.be.a("function");
        expect(getFormatedTimeToNow, "getFormatedTimeToNow").to.be.a("function");
        expect(formatDateToNow, "formatDateToNow").to.be.a("function");
        expect(formatDate, "formatDate").to.be.a("function");
    });

    it("should format date to now", () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 1);
        expect(getFormatedTimeToNow(format(date, "yyyy-MM-dd HH:mm:ss"))).to.equal("1M");
    });

    it("Should format date time to now extended in any language with default = enGB", () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 1);
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "fr_FR")).to.equal("il y a 1 minute");
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "en_GB")).to.equal("1 minute ago");
        expect(getFormatedTimeToNowExtended(date.toISOString(), "en_GB")).to.equal("1 minute ago");
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "yolo")).to.equal("1 minute ago");
    });

    it("Should format date in english", () => {
        const date = new Date("2021/10/12 12:02");
        expect(formatDate(format(date, "yyyy-MM-dd HH:mm:ss"))).to.equal("12/10/2021 12:02");
    });

    it("Should use the first form of the function", () => {
        const date = new Date();
        date.setHours(15);
        date.setMinutes(10);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_US")).to.equal("3:10 PM");
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_GB")).to.equal("15:10");
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr_FR")).to.equal("15:10");
    });

    it("Should use the second form of the function", () => {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_US")).to.equal(
            format(date, "eeee',' p", { locale: enUS })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_GB")).to.equal(
            format(date, "eeee',' p", { locale: enGB })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr_FR")).to.equal(
            format(date, "eeee 'à' p", { locale: fr })
        );
    });

    it("Should use the third form of the function", () => {
        const date = new Date();
        date.setHours(date.getHours() - 240);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_US")).to.equal(
            format(date, "P',' p", { locale: enUS })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en_GB")).to.equal(
            format(date, "P',' p", { locale: enGB })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr_FR")).to.equal(
            format(date, "'le' P 'à' p", { locale: fr })
        );
    });
});
