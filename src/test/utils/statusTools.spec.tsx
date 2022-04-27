import { Status } from "@neomanis/neo-types";
import { getStatusColor, getStatusText } from "../../components/utils/statusTools";

describe("getPriorityColor", () => {
    it("should return a tailwind or hex color based on priority", () => {
        expect(getStatusColor(Status.New, false, "bg")).to.eql("bg-neo-light-grey");
        expect(getStatusColor(Status.New, true)).to.eql("#dae5e5");
    });
});

describe("getStatusText", () => {
    it("should return status from enumeration to lower case", () => {
        expect(getStatusText(Status.New)).to.eql("new");
        expect(getStatusText(Status.Pending)).to.eql("pending");
    });
});
