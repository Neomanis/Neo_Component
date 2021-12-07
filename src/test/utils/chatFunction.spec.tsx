import { format } from "date-fns";
import { formatMessage, getRecipientsNameByIds } from "../../components/utils";

describe("Chat functions", () => {
    before(() => {
        expect(formatMessage, "formatMessage").to.be.a("function");
        expect(getRecipientsNameByIds, "getRecipientsNameByIds").to.be.a("function");
    });

    it("should format a message to IChatMessage", () => {
        expect(formatMessage("This is my message", 12)).to.eql({
            content: "This is my message",
            users_id: 12,
            date_creation: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
        });
    });

    it("should return a array of uid", () => {
        expect(
            getRecipientsNameByIds(
                [
                    { id: 1, name: "hubert" },
                    { id: 2, name: "heats" },
                    { id: 3, name: "deliv" },
                ],
                [1, 2]
            )
        ).to.eql(["hubert", "heats"]);
    });

    it("should return a empty array if no id are common", () => {
        expect(
            getRecipientsNameByIds(
                [
                    { id: 1, name: "hubert" },
                    { id: 2, name: "heats" },
                    { id: 3, name: "deliv" },
                ],
                [4, 5]
            )
        ).to.eql([]);
    });
});
