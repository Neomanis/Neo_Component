import { Status, Scale } from "@neomanis/neo-types";
import {
    mapEnumToInputSelectSearchableData,
    capitalizeFirstLetter,
    lowerCaseFirstLetter,
    getContrastBasedOnHexColor,
    getHexColorFromTailwindColor,
    getStatusOrPriorityColor,
    sleep,
} from "../../components/utils/tools";
import { i18n } from "../../i18n";

describe("mapEnumToInputSelectSearchableData", () => {
    it("should return a proper input select searchable data from a enum", () => {
        const inputSelectData = mapEnumToInputSelectSearchableData(Status);
        expect(inputSelectData).to.eql([
            { label: "New", value: 1 },
            { label: "Assigned", value: 2 },
            { label: "Planned", value: 3 },
            { label: "Pending", value: 4 },
            { label: "Solved", value: 5 },
            { label: "Closed", value: 6 },
        ]);
    });
    it("should return a translated input select searchable data from a enum", () => {
        const t = i18n.getFixedT("en-GB");
        const inputSelectData = mapEnumToInputSelectSearchableData(Status, t, "status");
        expect(inputSelectData).to.eql([
            { label: "New", value: 1 },
            { label: "In progress (assigned)", value: 2 },
            { label: "In progress (planned)", value: 3 },
            { label: "Pending", value: 4 },
            { label: "Solved", value: 5 },
            { label: "Closed", value: 6 },
        ]);
    });
});

describe("capitalizeFirstLetter", () => {
    it("should return a lower case string with capitalized first letter", () => {
        expect(capitalizeFirstLetter("yolo")).to.eql("Yolo");
    });
});

describe("lowerCaseFirstLetter", () => {
    it("should return a upper case string with lower case first letter", () => {
        expect(lowerCaseFirstLetter("YOLO")).to.eql("yOLO");
    });
});

describe("getContrastBasedOnHexColor", () => {
    it("should return white or black based on the contrast of the color", () => {
        expect(getContrastBasedOnHexColor("#152535")).to.eql("white");
        expect(getContrastBasedOnHexColor("#89D2FF")).to.eql("black");
    });
});

describe("getHexColorFromTailwindColor", () => {
    it("should return a hexadecimal color from a tailwind class color", () => {
        expect(getHexColorFromTailwindColor("neo-red")).to.eql("#F7284F");
    });
    it("should return undefined if color doesn't exist", () => {
        expect(getHexColorFromTailwindColor("neo-red-blue")).to.eql(undefined);
    });
});

describe("getStatusOrPriorityColor", () => {
    it("should return a priority color or status color based on status", () => {
        expect(getStatusOrPriorityColor(Status.New, Scale.Medium, false, "bg")).to.eql("bg-neo-ticketUrgency-medium");
        expect(getStatusOrPriorityColor(Status.Solved, Scale.VeryLow, true, "bg")).to.eql("#7FEF7F");
    });
});

describe("sleep", () => {
    it("should wait for defined amount of time", async () => {
        const dateNow = Date.now();
        await sleep(500);
        const dateAfter = Date.now();
        expect(dateAfter - dateNow).to.above(499);
    });
});
