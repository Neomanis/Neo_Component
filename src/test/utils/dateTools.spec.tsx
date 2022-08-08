import { addDays, format } from "date-fns";
import { enUS, enGB, fr } from "date-fns/locale";

import { getFormatedTimeToNowExtended, formatDateToNow, formatDate } from "../../components/utils";
import { getOutageDateInformation } from "../../components/utils/dateTools";

describe("Date to now format functions", () => {
    before(() => {
        expect(getFormatedTimeToNowExtended, "getFormatedTimeToNowExtended").to.be.a("function");
        expect(formatDateToNow, "formatDateToNow").to.be.a("function");
        expect(formatDate, "formatDate").to.be.a("function");
    });

    it("Should format date time to now extended in any language with default = enGB", () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 1);
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "fr-FR")).to.equal("il y a 1 minute");
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "en-GB")).to.equal("1 minute ago");
        expect(getFormatedTimeToNowExtended(date.toISOString(), "en-GB")).to.equal("1 minute ago");
        expect(getFormatedTimeToNowExtended(format(date, "yyyy-MM-dd HH:mm:ss"), "yolo")).to.equal("1 minute ago");
        expect(getFormatedTimeToNowExtended(format(addDays(date, 1), "yyyy-MM-dd HH:mm:ss"), "en-GB")).to.equal("now");
    });

    it("Should format date in english", () => {
        const date = new Date("2021/10/12 12:02");
        expect(formatDate(format(date, "yyyy-MM-dd HH:mm:ss"))).to.equal("12/10/2021 12:02");
    });

    it("Should use the first form of the function", () => {
        const date = new Date();
        date.setHours(15);
        date.setMinutes(10);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-US")).to.equal("3:10 PM");
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-GB")).to.equal("15:10");
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr-FR")).to.equal("15:10");
    });

    it("Should use the second form of the function", () => {
        const date = new Date();
        date.setHours(date.getHours() - 24);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-US")).to.equal(
            format(date, "eeee',' p", { locale: enUS })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-GB")).to.equal(
            format(date, "eeee',' p", { locale: enGB })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr-FR")).to.equal(
            format(date, "eeee 'à' p", { locale: fr })
        );
    });

    it("Should use the third form of the function", () => {
        const date = new Date();
        date.setHours(date.getHours() - 240);
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-US")).to.equal(
            format(date, "P',' p", { locale: enUS })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "en-GB")).to.equal(
            format(date, "P',' p", { locale: enGB })
        );
        expect(formatDateToNow(format(date, "yyyy-MM-dd HH:mm:ss"), "fr-FR")).to.equal(
            format(date, "'le' P 'à' p", { locale: fr })
        );
    });
});

describe("getOutageDateInformation method", () => {
    before(() => {
        expect(getOutageDateInformation, "formatDate").to.be.a("function");
    });

    it("Should format start date and time to display date and hours like a sentence", () => {
        expect(getOutageDateInformation({ startAt: "2021-07-12T17:52:44.000Z" }, "fr-FR")).to.equal(
            "Depuis le 12 juillet à 19:52"
        );
    });

    it("Should format date in english", () => {
        expect(getOutageDateInformation({ startAt: "2021-07-12T17:52:44.000Z" }, "en-GB")).to.equal(
            "Since July 12th at 19:52"
        );
    });

    it("Should format date with endAt value if defined", () => {
        expect(
            getOutageDateInformation(
                { startAt: "2021-07-12T17:52:44.000Z", endAt: "2021-07-13T12:52:44.000Z" },
                "fr-FR"
            )
        ).to.equal("Du 12 juillet à 19:52 au 13 juillet à 14:52");
    });

    it("Should format date in english with endAt value if defined", () => {
        expect(
            getOutageDateInformation(
                { startAt: "2021-07-12T17:52:44.000Z", endAt: "2021-07-13T12:52:44.000Z" },
                "en-GB"
            )
        ).to.equal("From July 12th at 19:52 to July 13th at 14:52");
    });
});
