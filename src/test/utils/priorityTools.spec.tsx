import { Scale } from "@neomanis/neo-types";
import { getPriorityColor } from "../../components/utils/priorityTools";

describe("getPriorityColor", () => {
    it("should return a tailwind or hex color based on priority", () => {
        expect(getPriorityColor(Scale.VeryLow, false, "bg")).to.eql("bg-neo-ticketUrgency-very-low");
        expect(getPriorityColor(Scale.VeryLow, true)).to.eql("#89D2FF");
    });
    it("should return a tailwind or hex neutral color if priority doesn't exist", () => {
        expect(getPriorityColor(7, false, "bg")).to.eql("bg-neo-light-grey");
        expect(getPriorityColor(7, true)).to.eql("#DAE5E5");
    });
});
