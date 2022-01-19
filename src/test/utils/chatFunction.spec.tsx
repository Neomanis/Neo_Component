import { format } from "date-fns";
import { formatMessage, getRecipientsNameByIds, stripHtml } from "../../components/utils";

describe("Chat functions", () => {
    before(() => {
        expect(formatMessage, "formatMessage").to.be.a("function");
        expect(getRecipientsNameByIds, "getRecipientsNameByIds").to.be.a("function");
        expect(stripHtml, "stripHtml").to.be.a("function");
    });

    it("should format a message to IChatMessage", () => {
        expect(formatMessage("This is my message", 12, 0)).to.eql({
            content: "This is my message",
            users_id: 12,
            is_private: 0,
            date_creation: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });
    });

    it("should return a array of recipient's name", () => {
        expect(
            getRecipientsNameByIds(
                [
                    { id: 1, name: "hubert" },
                    { id: 2, name: "heats" },
                    { id: 3, name: "deliv" },
                ],
                [1, 2, 4]
            )
        ).to.eql(["hubert", "heats"]);
    });

    it("should remove html tags", () => {
        expect(stripHtml("<p>COUCOU</p>")).to.eql("COUCOU");
        expect(stripHtml("&lt;p&gt;Vous en êtes où ?&lt;/p&gt;")).to.equal("Vous en êtes où ?");
    });
});
