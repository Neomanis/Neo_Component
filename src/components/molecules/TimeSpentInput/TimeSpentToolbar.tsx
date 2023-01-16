import { Button } from "@/components/atoms";
import { baseStyles } from "@/utils/inputSelectCss";
import { useTranslation } from "@neomanis/neo-translation";
import { ReactElement, useRef } from "react";
import ReactSelect from "react-select";

export interface TimeSpentTooltipProps {
    onClick: (action: "add" | "remove", value: number) => void;
}

const TimeSpentTooltip = ({ onClick }: TimeSpentTooltipProps): ReactElement => {
    const { t } = useTranslation();
    const values = useRef({ timeSpent: 0, timeSpentType: "minutes" });

    function getTimeSpent() {
        return values.current.timeSpent * (values.current.timeSpentType === "minutes" ? 1 : 60);
    }

    return (
        <div className="flex items-center space-x-2">
            <input
                type="number"
                name="timeSpent"
                id="timeSpent"
                min={0}
                className="h-10 w-20 bg-neo-bg-B text-xs p-2"
                onChange={(e) => (values.current.timeSpent = Number(e.target.value))}
            />
            <ReactSelect
                className="h-10 text-xs w-24"
                styles={baseStyles}
                options={[
                    { label: t("date.hour_other") ?? "", value: "hours" },
                    { label: t("date.minute_other") ?? "", value: "minutes" },
                ]}
                defaultValue={{ label: "Minutes", value: "minutes" }}
                onChange={(data) => (values.current.timeSpentType = (data as { label: string; value: string }).value)}
                isMulti={false}
            />
            <Button onClick={() => onClick("add", getTimeSpent())} variant="tertiary" rounded="md">
                {t("global.add")}
            </Button>
            <Button onClick={() => onClick("remove", getTimeSpent())} variant="tertiary" rounded="md">
                {t("global.remove")}
            </Button>
        </div>
    );
};

export default TimeSpentTooltip;
