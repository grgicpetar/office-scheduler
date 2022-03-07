import { TableType } from "../../../types/types";

type TableProps = {
    table: TableType;
    zoomScaleFactor: number;
};

function Table({ table, zoomScaleFactor }: TableProps) {
    const { x, y } = getTopLeftCornerPoint();

    function getTopLeftCornerPoint() {
        let drawingPath = table.d.replace(/[^A-Za-z]/g, "");
        let dPath = table.d;

        //Prva točka
        let firstPoint = {
            x: parseFloat(dPath.substring(dPath.indexOf(drawingPath[0]) + 1, dPath.indexOf(" "))),
            y: parseFloat(dPath.substring(dPath.indexOf(" ") + 1, dPath.indexOf(drawingPath[1]))),
        };
        dPath = dPath.substring(dPath.indexOf(drawingPath[1]));

        //Pokreti od prve točke
        let firstMove = parseFloat(dPath.substring(dPath.indexOf(drawingPath[1]) + 1, dPath.indexOf(drawingPath[2])));
        dPath = dPath.substring(dPath.indexOf(drawingPath[2]));
        let secondMove = parseFloat(dPath.substring(dPath.indexOf(drawingPath[2]) + 1, dPath.indexOf(drawingPath[3])));

        let secondPoint = { x: 0.0, y: 0.0 };
        let thirdPoint = { x: 0.0, y: 0.0 };
        let fourthPoint = { x: 0.0, y: 0.0 };

        if (drawingPath[1] === "v") {
            secondPoint = { x: firstPoint.x, y: firstPoint.y + firstMove };
        }
        if (drawingPath[1] === "h") {
            secondPoint = { x: firstPoint.x + firstMove, y: firstPoint.y };
        }

        if (drawingPath[2] === "v") {
            thirdPoint = { x: secondPoint.x, y: secondPoint.y + secondMove };
        }
        if (drawingPath[2] === "h") {
            thirdPoint = { x: secondPoint.x + secondMove, y: secondPoint.y };
        }
        if (drawingPath[2] === "H") {
            thirdPoint = { x: secondMove, y: secondPoint.y };
        }

        if (drawingPath[1] === "v") {
            fourthPoint = { x: thirdPoint.x, y: thirdPoint.y - firstMove };
        }
        if (drawingPath[1] === "h") {
            fourthPoint = { x: thirdPoint.x - firstMove, y: thirdPoint.y };
        }

        let points = [firstPoint, secondPoint, thirdPoint, fourthPoint];

        let lowestX = Math.min.apply(
            Math,
            points.map((point) => point.x)
        );
        let lowestY = Math.min.apply(
            Math,
            points.map((point) => point.y)
        );

        return { x: lowestX, y: lowestY };
    }

    return (
        <>
            <path d={table.d} fill="#fff" stroke="#636363" strokeLinecap="round" strokeWidth={0.106}>
                <title>{table.id}</title>
            </path>
            {zoomScaleFactor <= 8 ? (
                <svg x={x} y={y}>
                    <g transform={table.orientation === "vertical" ? "translate(1, 2.65)" : "translate(2.8, 1.05)"}>
                        <circle cx="0" cy="0" r="0.45" fill="black" />
                        <circle cx="2" cy="0" r="0.45" fill="black" />
                        <circle cx="1" cy="1" r="0.45" fill="black" />
                        <circle cx="0" cy="2" r="0.45" fill="black" />
                        <circle cx="2" cy="2" r="0.45" fill="black" />
                    </g>
                </svg>
            ) : null}
            {zoomScaleFactor > 8 ? (
                <svg x={x} y={y}>
                    <g transform={table.orientation === "vertical" ? "translate(1, 2.65)" : "translate(2.8, 1.05)"}>
                        <circle cx="0" cy="0" r="0.45" fill="red" />
                        <circle cx="2" cy="0" r="0.45" fill="red" />
                        <circle cx="1" cy="1" r="0.45" fill="red" />
                        <circle cx="0" cy="2" r="0.45" fill="red" />
                        <circle cx="2" cy="2" r="0.45" fill="red" />
                    </g>
                </svg>
            ) : null}
        </>
    );
}

export { Table };
