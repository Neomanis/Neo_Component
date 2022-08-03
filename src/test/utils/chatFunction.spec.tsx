import { formatMessage, stripHtml } from "../../components/utils";

describe("Chat functions", () => {
    before(() => {
        expect(formatMessage, "formatMessage").to.be.a("function");
        expect(stripHtml, "stripHtml").to.be.a("function");
    });

    it("should format a message to IChatMessage", () => {
        const formatedMessage = formatMessage("This is my message", 1, 0);
        expect(formatedMessage.content).to.eql("This is my message");
        expect(formatedMessage.sender).to.eql(1);
        expect(formatedMessage.is_private).to.eql(0);
        expect(formatedMessage.date_creation).to.contain(new Date().toISOString().slice(0, -5));
    });

    it("should remove html tags", () => {
        expect(stripHtml("<p>COUCOU</p>")).to.eql("COUCOU");
        expect(stripHtml("&lt;p&gt;Vous en êtes où ?&lt;/p&gt;")).to.equal("Vous en êtes où ?");
    });
});
