import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UncontrolledReactSVGPanZoom, zoom } from "react-svg-pan-zoom";
import { SizeMe } from "react-sizeme";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

import { Table } from "./table/Table";
import { TABLES_DATA } from "../data/TablesData";
import bonsaiLogo from "../../assets/logo-bonsai-grid.svg";
import expandIcon from "../../assets/expand-icon.svg";
import { TableType } from "../../types/types";

const DEFAULT_ZOOM_SCALE = 6;

function GroundPlan() {
    const [tables, setTables] = useState<TableType[]>(TABLES_DATA);
    const [showAvailability, setShowAvailability] = useState<boolean>(false);
    const [zoomScaleFactor, setZoomScaleFactor] = useState<number>(DEFAULT_ZOOM_SCALE);
    const [isViewerLoading, setIsViewerLoading] = useState<boolean>(true);

    const dimensions = useWindowDimensions();

    const Viewer = useRef<any>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Viewer.current) {
                panZoomToDefault();
                clearInterval(interval);
                setIsViewerLoading(false);
            }
        }, 1500);
    }, []);

    const panZoomToDefault = () => {
        Viewer.current.setPointOnViewerCenter(160, 100, DEFAULT_ZOOM_SCALE);
    };

    const panToRoom = (room: "Jupiter" | "Saturn" | "Europa" | "Titan") => {
        switch (room) {
            case "Jupiter": {
                Viewer.current.setPointOnViewerCenter(70, 91, 10);
                break;
            }
            case "Saturn": {
                Viewer.current.setPointOnViewerCenter(231, 121, 10);
                break;
            }
            case "Europa": {
                Viewer.current.setPointOnViewerCenter(170, 130, 10);
                break;
            }
            case "Titan": {
                Viewer.current.setPointOnViewerCenter(170, 150, 10);
                break;
            }
        }
    };

    return (
        <SizeMe monitorHeight>
            {({ size }) => (
                <div
                    style={{
                        margin: "0 auto",
                        height: "100vh",
                        position: "relative",
                    }}
                >
                    {isViewerLoading ? (
                        <div
                            style={{
                                position: "absolute",
                                margin: "auto",
                                height: 100,
                                inset: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <motion.img
                                animate={{
                                    scale: [0.5, 1, 1, 0.5, 0.5],
                                    rotate: [0, 0, 270, 270, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                alt="bonsai-logo"
                                src={bonsaiLogo}
                            />
                        </div>
                    ) : null}
                    <div style={{ visibility: isViewerLoading ? "hidden" : "visible" }}>
                        <div
                            style={{
                                position: "absolute",
                                zIndex: 2,
                                display: "flex",
                                alignItems: "center",
                                top: 50,
                                right: 50,
                            }}
                        >
                            <button style={{ padding: 10, marginRight: 10 }} onClick={() => panToRoom("Jupiter")}>
                                Jupiter
                            </button>
                            <button style={{ padding: 10, marginRight: 10 }} onClick={() => panToRoom("Saturn")}>
                                Saturn
                            </button>
                            <button style={{ padding: 10, marginRight: 10 }} onClick={() => panToRoom("Europa")}>
                                Europa
                            </button>
                            <button style={{ padding: 10, marginRight: 10 }} onClick={() => panToRoom("Titan")}>
                                Titan
                            </button>
                            <button
                                onClick={() => panZoomToDefault()}
                                id="search-button"
                                style={{ padding: 0, border: "none" }}
                            >
                                <img style={{ height: 40 }} alt="expand" src={expandIcon} />
                            </button>
                        </div>
                        <UncontrolledReactSVGPanZoom
                            ref={(el) => {
                                Viewer.current = el;
                            }}
                            width={size.width ? size.width : 0}
                            height={size.height ? size.height : 0}
                            background="#fff"
                            tool="auto"
                            detectAutoPan={false}
                            onZoom={(e: any) => {
                                setZoomScaleFactor(e.a);
                                if (e.a > 6) {
                                    setShowAvailability(true);
                                } else {
                                    setShowAvailability(false);
                                }
                            }}
                            customToolbar={() => <></>}
                        >
                            <svg
                                viewBox="0 0 297 210"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <defs>
                                    <linearGradient id="d">
                                        <stop stopColor="#fff" offset={0} />
                                        <stop stopColor="#fff" stopOpacity={0} offset={1} />
                                    </linearGradient>
                                    <linearGradient id="Q" gradientTransform="matrix(0 0 0 0 -3707.2 27871)">
                                        <stop stopColor="#cfcfcf" offset={0} />
                                    </linearGradient>
                                    <linearGradient id="e" gradientTransform="matrix(0 0 0 0 22.843 217.81)">
                                        <stop stopColor="#454545" offset={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="c"
                                        gradientTransform="matrix(-.04414 0 0 -.04414 23.848 227.52)"
                                    >
                                        <stop stopColor="#b6b6b6" offset={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="R"
                                        gradientTransform="matrix(.00592 -.00116 .00092 .00414 235.75 107.7)"
                                    >
                                        <stop stopColor="#7c7c7c" offset={0} />
                                    </linearGradient>
                                    <linearGradient id="b" gradientTransform="matrix(.0144 0 0 .0542 -171.01 12.426)">
                                        <stop stopColor="#f2f2f2" offset={0} />
                                    </linearGradient>
                                    <linearGradient id="a" gradientTransform="matrix(0 -.01322 .0291 0 -27.197 216.05)">
                                        <stop stopColor="#585858" offset={0} />
                                    </linearGradient>
                                    <linearGradient
                                        id="S"
                                        x1={7.448}
                                        x2={38.743}
                                        y1={188.76}
                                        y2={188.76}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#a"
                                    />
                                    <linearGradient
                                        id="f"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(3.5159 0 0 1.2869 -34.04 -56.108)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="T"
                                        x1={7.448}
                                        x2={52.856}
                                        y1={223.38}
                                        y2={223.38}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#a"
                                    />
                                    <linearGradient
                                        id="u"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(5.9795 0 0 1.2869 -67.49 -37.735)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="t"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.3226 0 0 1.2869 -221.43 -203.99)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="g"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(3.464 0 0 1.2869 -8.459 -70.051)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="v"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(4.9651 0 0 1 -209.58 0)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="z"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(.34132 0 0 .48067 -238.38 20.124)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="C"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(4.4528 0 0 .48067 -448.74 20.128)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="F"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(.70584 0 0 .48067 30.75 -65.232)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="G"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(.67399 0 0 .48067 46.568 -65.232)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="w"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -247.21 30.42)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="x"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -237.76 39.439)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="y"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -228.72 48.654)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="H"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -208.5 50.737)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="A"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(.19506 0 0 .48067 77.523 -125.81)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="B"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.2754 0 0 .48067 25.464 -125.81)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="q"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(3.464 0 0 1.2869 58.284 -70.004)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="m"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(.86374 0 0 .43807 -177.99 -54.991)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="n"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(.86374 0 0 .43807 -177.93 -66.168)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="o"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(.86374 0 0 .43807 2.703 70.466)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="p"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(.86374 0 0 .43807 19.84 69.859)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="I"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(6.189 0 0 1 -283.15 105.33)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="h"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(6.4887 0 0 .67776 -39.256 37.482)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="J"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -92.906 51.176)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="K"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -75.896 51.201)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="L"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -56.589 51.208)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="M"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.4032 0 0 1 -35.462 51.168)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="N"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(9.4895 0 0 1 -473.24 330.1)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="i"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.154 0 0 .51418 156.87 -220.29)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="j"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.0396 0 0 .51418 82.085 -220.29)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="O"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(1.1863 0 0 1 38.448 330.18)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="D"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(3.2034 0 0 .48067 -7.79 62.16)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="E"
                                        x1={52.856}
                                        x2={59.779}
                                        y1={-242.81}
                                        y2={-242.81}
                                        gradientTransform="matrix(3.3977 0 0 .48067 -154.79 263.73)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#c"
                                    />
                                    <linearGradient
                                        id="k"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.0396 0 0 .51418 -130.29 -194.53)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="l"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(2.7516 0 0 .51418 -141.83 -125.23)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="P"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.0396 0 0 .51418 -158.52 -204.46)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="r"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.4654 0 0 1.2869 80.778 -99.55)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="s"
                                        x1={13.489}
                                        x2={18.693}
                                        y1={195.75}
                                        y2={195.75}
                                        gradientTransform="matrix(1.4654 0 0 1.2869 78.814 -113.84)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#b"
                                    />
                                    <linearGradient
                                        id="aD"
                                        x1={34.315}
                                        x2={41.978}
                                        y1={65.91}
                                        y2={65.91}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aC"
                                        x1={48.807}
                                        x2={52.971}
                                        y1={72.698}
                                        y2={72.698}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aB"
                                        x1={52.865}
                                        x2={57.029}
                                        y1={72.698}
                                        y2={72.698}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aA"
                                        x1={66.159}
                                        x2={70.323}
                                        y1={72.633}
                                        y2={72.633}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="az"
                                        x1={70.217}
                                        x2={74.381}
                                        y1={72.633}
                                        y2={72.633}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ay"
                                        x1={83.473}
                                        x2={87.637}
                                        y1={72.73}
                                        y2={72.73}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ax"
                                        x1={87.531}
                                        x2={91.695}
                                        y1={72.73}
                                        y2={72.73}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aw"
                                        x1={83.512}
                                        x2={87.676}
                                        y1={82.935}
                                        y2={82.935}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="av"
                                        x1={87.57}
                                        x2={91.734}
                                        y1={82.935}
                                        y2={82.935}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="au"
                                        x1={66.159}
                                        x2={70.323}
                                        y1={82.871}
                                        y2={82.871}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="at"
                                        x1={70.217}
                                        x2={74.381}
                                        y1={82.871}
                                        y2={82.871}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="as"
                                        x1={48.842}
                                        x2={53.006}
                                        y1={82.871}
                                        y2={82.871}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ar"
                                        x1={52.9}
                                        x2={57.064}
                                        y1={82.871}
                                        y2={82.871}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aq"
                                        x1={49.052}
                                        x2={53.216}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ap"
                                        x1={53.11}
                                        x2={57.274}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ao"
                                        x1={67.768}
                                        x2={71.933}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="an"
                                        x1={71.827}
                                        x2={75.991}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="am"
                                        x1={86.485}
                                        x2={90.649}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="al"
                                        x1={90.543}
                                        x2={94.707}
                                        y1={108.45}
                                        y2={108.45}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ak"
                                        x1={166.21}
                                        x2={173.87}
                                        y1={151.49}
                                        y2={151.49}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aj"
                                        x1={166.21}
                                        x2={173.87}
                                        y1={147.42}
                                        y2={147.42}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ai"
                                        x1={158.65}
                                        x2={166.31}
                                        y1={151.49}
                                        y2={151.49}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ah"
                                        x1={158.65}
                                        x2={166.31}
                                        y1={147.42}
                                        y2={147.42}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ag"
                                        x1={166.01}
                                        x2={173.67}
                                        y1={129.73}
                                        y2={129.73}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="af"
                                        x1={166.01}
                                        x2={173.67}
                                        y1={125.65}
                                        y2={125.65}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ae"
                                        x1={158.45}
                                        x2={166.11}
                                        y1={129.73}
                                        y2={129.73}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ad"
                                        x1={158.45}
                                        x2={166.11}
                                        y1={125.65}
                                        y2={125.65}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ac"
                                        x1={242.9}
                                        x2={247.1}
                                        y1={121.88}
                                        y2={121.88}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="ab"
                                        x1={238.81}
                                        x2={243.01}
                                        y1={121.88}
                                        y2={121.88}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="aa"
                                        x1={220.09}
                                        x2={224.29}
                                        y1={121.88}
                                        y2={121.88}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="Z"
                                        x1={216.03}
                                        x2={220.2}
                                        y1={121.88}
                                        y2={121.88}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="Y"
                                        x1={220.09}
                                        x2={224.29}
                                        y1={129.44}
                                        y2={129.44}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="X"
                                        x1={216.03}
                                        x2={220.2}
                                        y1={129.44}
                                        y2={129.44}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="W"
                                        x1={242.9}
                                        x2={247.1}
                                        y1={129.44}
                                        y2={129.44}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="U"
                                        x1={238.81}
                                        x2={243.01}
                                        y1={129.44}
                                        y2={129.44}
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#d"
                                    />
                                    <linearGradient
                                        id="V"
                                        gradientTransform="matrix(0 0 0 0 22.843 217.81)"
                                        gradientUnits="userSpaceOnUse"
                                        xlinkHref="#e"
                                    />
                                </defs>
                                <path
                                    d="m197.48 135.83 60.587.006v-33.668l-12.254-6.582-9.657-4.431v16.404l-38.728.033z"
                                    fill="#00f"
                                    fillOpacity={0.052}
                                >
                                    <title>{"room-saturn"}</title>
                                </path>
                                <path d="m152.9 160.43.066-22.093 32.643.1v22.158z" fill="#c1c100" fillOpacity={0.068}>
                                    <title>{"room-titan"}</title>
                                </path>
                                <path
                                    d="m152.9 138.28.066-21.239 32.643.095v21.303z"
                                    fill="#006c9e"
                                    fillOpacity={0.068}
                                >
                                    <title>{"room-europa"}</title>
                                </path>
                                <path
                                    d="m197.3 107.58 38.927.017-.1-16.637-38.694-17.098z"
                                    fill="#0055d4"
                                    fillOpacity={0.073}
                                >
                                    <title>{"room-io"}</title>
                                </path>
                                <path
                                    d="m153.95 84.525 43.498.047-.047-11.085-13.938-6.642-26.66-11.483.07 2.245-.912.187.047 6.01h-2.128z"
                                    fill="#f7ff2d"
                                    fillOpacity={0.113}
                                >
                                    <title>{"room-kitchen"}</title>
                                </path>
                                <path
                                    d="m257.95 116.99.066-14.85 8.17 4.63 15.808 10.021z"
                                    fill="#872dff"
                                    fillOpacity={0.113}
                                >
                                    <title>{"sputnik"}</title>
                                </path>
                                <rect
                                    transform="rotate(-90)"
                                    x={-116.76}
                                    y={31.236}
                                    width={10.054}
                                    height={8.764}
                                    ry={0.006}
                                    fill="#ff9d2d"
                                    fillOpacity={0.113}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                >
                                    <title>{"room-voyager"}</title>
                                </rect>
                                <rect
                                    transform="rotate(-90)"
                                    x={-106.54}
                                    y={31.104}
                                    width={10.418}
                                    height={8.963}
                                    ry={0.006}
                                    fill="#ff4b2d"
                                    fillOpacity={0.113}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                >
                                    <title>{"room-hubble"}</title>
                                </rect>
                                <path
                                    d="m31.083 57.117 38.914.093V20.166L31.083 5.573z"
                                    fill="#ffb62d"
                                    fillOpacity={0.113}
                                >
                                    <title>{"room-pandora"}</title>
                                </path>
                                <path
                                    d="m99.74 52.873-14.729 1.195H71.857l-1.855.002V20.002l17.253 6.478 20.206 8.325z"
                                    fill="#faff4f"
                                    fillOpacity={0.113}
                                >
                                    <title>{"room-kepler"}</title>
                                </path>
                                <path d="m119.29 84.525-.047-27.642 34.565 5.94.14 21.75z" fillOpacity={0.145}>
                                    <title>{"room-black-hole"}</title>
                                </path>
                                <path
                                    d="m40.051 116.88-.082-20.849-9.003.093.304-38.96h38.587l.286.134h14.868l24.376 8.361-.115 18.852v32.378z"
                                    fill="#ab8300"
                                    fillOpacity={0.105}
                                >
                                    <title>{"room-jupiter"}</title>
                                </path>
                                <path
                                    fill="url(#f)"
                                    d="M13.386 195.14h18.299v1.301H13.386z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#g)"
                                    d="M38.266 181.2h18.028v1.301H38.266z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#h)"
                                    d="M48.27 169.81h33.77v.685H48.27z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    transform="translate(15.418 204.122)"
                                    fill="url(#i)"
                                    d="M172.44-119.9h6.006v.52h-6.006z"
                                />
                                <path
                                    transform="translate(15.418 204.122)"
                                    fill="url(#j)"
                                    d="M96.107-119.9h5.41v.52h-5.41z"
                                />
                                <path
                                    transform="rotate(90 -94.352 109.77)"
                                    fill="url(#k)"
                                    d="M-116.27-94.137h5.41v.52h-5.41z"
                                />
                                <path
                                    transform="rotate(90 -94.352 109.77)"
                                    fill="url(#l)"
                                    d="M-104.72-24.839h14.32v.52h-14.32z"
                                />
                                <path
                                    transform="rotate(-180 7.709 102.061)"
                                    fill="url(#m)"
                                    d="M-166.34 30.54h4.495v.443h-4.495z"
                                />
                                <path
                                    transform="rotate(-180 7.709 102.061)"
                                    fill="url(#n)"
                                    d="M-166.28 19.362h4.495v.443h-4.495z"
                                />
                                <path
                                    fill="url(#o)"
                                    d="M14.354 156h4.495v.443h-4.495z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#p)"
                                    d="M31.491 155.39h4.495v.443h-4.495z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#q)"
                                    d="M105.01 181.25h18.028v1.301H105.01z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#r)"
                                    d="M100.54 151.7h7.627v1.301h-7.627z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    fill="url(#s)"
                                    d="M98.58 137.41h7.627v1.301H98.58z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    transform="rotate(-180 7.709 102.061)"
                                    fill="url(#t)"
                                    d="M-203.59 47.262h6.883v1.301h-6.883z"
                                />
                                <path
                                    fill="url(#u)"
                                    d="M13.168 213.52h31.12v1.301h-31.12z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#v)"
                                    d="M52.856-243.08h34.369v.544H52.856z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-30.926 361.236 129.929)"
                                    fill="url(#w)"
                                    d="M-173.05-212.66h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-27.746 405.528 133.274)"
                                    fill="url(#x)"
                                    d="M-163.59-203.64h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-24.344 465.466 137.801)"
                                    fill="url(#y)"
                                    d="M-154.56-194.43h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="matrix(-1 0 0 1 15.418 204.122)"
                                    fill="url(#z)"
                                    d="M-220.34-96.719h2.363v.262h-2.363z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#A)"
                                    d="M87.833-242.65h1.35v.262h-1.35z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#b)"
                                    d="M89.183-242.65h3.692v.262h-3.692z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#B)"
                                    d="M92.875-242.65h8.828v.262h-8.828z"
                                />
                                <path
                                    transform="matrix(-1 0 0 1 15.418 204.122)"
                                    fill="url(#b)"
                                    d="M-217.98-96.719h4.603v.262h-4.603z"
                                />
                                <path
                                    transform="matrix(-1 0 0 1 15.418 204.122)"
                                    fill="url(#C)"
                                    d="M-213.38-96.715h30.823v.262h-30.823z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#D)"
                                    d="M161.53-54.683h22.175v.262H161.53z"
                                />
                                <path
                                    transform="matrix(1 0 0 -1 15.418 204.122)"
                                    fill="url(#E)"
                                    d="M24.8 146.89h23.52v.262H24.8z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#b)"
                                    d="M152.29-54.683h9.248v.262h-9.248z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#c)"
                                    d="M149.87-54.683h2.421v.262h-2.421z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#F)"
                                    d="M68.058-182.07h4.886v.262h-4.886z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#b)"
                                    d="M72.944-182.07h9.249v.262h-9.249z"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#G)"
                                    d="M82.193-182.07h4.665v.262h-4.665z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-23.511 482.725 139.105)"
                                    fill="url(#H)"
                                    d="M-134.34-192.34h9.713v.544h-9.713z"
                                />
                                <path
                                    fill="url(#a)"
                                    d="M38.266 181.2h.753v1.301h-.753zM47.094 181.19h.291v1.31h-.291z"
                                    transform="rotate(-90 109.77 94.352)"
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 15.418 204.122)"
                                    fill="url(#I)"
                                    d="M43.975-137.76h42.842v.544H43.975z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-22.568 503.799 140.697)"
                                    fill="url(#J)"
                                    d="M-18.739-191.91h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-21.243 536.51 143.168)"
                                    fill="url(#K)"
                                    d="M-1.729-191.88h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-20.531 555.832 144.627)"
                                    fill="url(#L)"
                                    d="M17.577-191.87h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="scale(-1 1) rotate(-20.348 561.005 145.018)"
                                    fill="url(#M)"
                                    d="M38.705-191.91h9.713v.544h-9.713z"
                                />
                                <path
                                    transform="matrix(1 0 0 -1 15.418 204.122)"
                                    fill="url(#N)"
                                    d="M28.345 87.022h65.689v.544H28.345z"
                                />
                                <path
                                    transform="matrix(1 0 0 -1 15.418 204.122)"
                                    fill="url(#O)"
                                    d="M101.15 87.094h8.212v.544h-8.212z"
                                />
                                <path
                                    transform="rotate(90 -94.352 109.77)"
                                    fill="url(#P)"
                                    d="M-144.5-104.07h5.41v.52h-5.41z"
                                />
                                <path
                                    transform="matrix(.98429 .17654 -.19282 .98123 15.418 204.122)"
                                    fill="url(#b)"
                                    d="M89.652-164.49h5.702v1.106h-5.702z"
                                />
                                <path
                                    d="M231.95 195.77h-8.186v.258h8.186zM208.93 195.77h8.151v.258h-8.151z"
                                    fill="url(#c)"
                                    stroke="url(#Q)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M197.93 157h2.906m-2.906 8.107h5.777"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m203.73 165.1-.035-.71-.175-.679-.245-.678-.315-.646-.42-.581-.524-.517-.56-.452-.63-.42-.664-.29-.735-.227-.735-.161-.77-.032M197.93 159.68l.49-.032.49-.13.49-.193.384-.259.385-.355.28-.387.21-.42.14-.452.035-.453"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    transform="matrix(0 -1 -1 0 0 0)"
                                    fill="url(#b)"
                                    d="M-131.18-197.5h9.249v.262h-9.249z"
                                />
                                <path
                                    d="m233.44 107.41.011-4.324c-2.348.036-4.755 1.279-4.68 4.324"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.07}
                                />
                                <path
                                    d="m197.95 93.686 5.957.013c-.05-2.752-1.762-5.571-5.957-5.485"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.089}
                                />
                                <path
                                    d="m119.61 60.091 4.754-.01c-.04 2.195-1.406 4.446-4.754 4.376"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.071}
                                />
                                <path
                                    d="m135.49 59.79 5.194.957"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.075}
                                />
                                <path
                                    d="m108.94 88.333-5.295-.011c.044 2.338 1.566 4.734 5.295 4.66"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.077}
                                />
                                <path
                                    d="m111.96 84.159-.012-4.323c2.395.036 4.848 1.278 4.773 4.323"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.071}
                                />
                                <path
                                    d="m181.57 173.17.01-4.398c-2.076.036-4.204 1.3-4.138 4.398M181.57 184.76l.01 4.393c-2.074-.036-4.199-1.299-4.134-4.393"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.066}
                                />
                                <path
                                    d="m185.26 155.91-4.73.01c.038-2.223 1.398-4.502 4.73-4.432M185.23 126.79l-4.702.01c.038-2.21 1.39-4.475 4.702-4.405"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.071}
                                />
                                <path
                                    d="m43.961 116.31 64.98-.012"
                                    fill="none"
                                    stroke="#cfcfcf"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m193.55 84.158.012-4.84c-2.407.04-4.872 1.432-4.796 4.84"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.075}
                                />
                                <path
                                    d="m167.06 96.931-5.795-.013c.048 2.751 1.714 5.57 5.795 5.484M152.78 98.873l-5.827-.013c.048 2.754 1.723 5.576 5.827 5.49"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.088}
                                />
                                <path
                                    d="m40.24 113.49 3.79.01c-.031-1.944-1.12-3.937-3.79-3.875"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m40.255 103.44 3.79.01c-.031-1.928-1.12-3.903-3.79-3.842"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.059}
                                />
                                <path
                                    d="m197.5 131.22 4.994.011c-.041-2.348-1.477-4.754-4.994-4.68"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.075}
                                />
                                <path
                                    d="m197.5 121.88 4.994-.011c-.041 2.348-1.477 4.754-4.994 4.68M70.105 51.868l4.994.011c-.041-2.342-1.477-4.742-4.994-4.668"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.075}
                                />
                                <path
                                    d="m70.105 42.551 4.994-.011c-.041 2.342-1.477 4.742-4.994 4.668"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.075}
                                />
                                <path
                                    d="m213.08 155.57-.013-5.096c2.638.042 5.341 1.507 5.258 5.096"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.081}
                                />
                                <path
                                    d="m257.84 114.97-3.48.009c.03-1.893 1.03-3.833 3.48-3.773"
                                    fill="none"
                                    stroke="url(#R)"
                                    strokeLinejoin="round"
                                    strokeWidth={0.056}
                                />
                                <path
                                    d="m188.53 164.23 2.708-3.994 2.663 3.986-1.455-.01v5.244h-2.502v-5.235z"
                                    fill="#cfcfcf"
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-105.38}
                                    y={233.82}
                                    width={12.414}
                                    height={1.847}
                                    ry={0}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.065}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-107.53}
                                    y={236.46}
                                    width={3.584}
                                    height={3.419}
                                    ry={0}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.048}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="M48.854 76.565h8.118v2.65h-8.118z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.065}
                                />
                                <path
                                    d="m138.55 69.887.123-.006.021-.093-.376-.798-.474-.694-.608-.64-.076.013-.069.085.608.641.474.693z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m136.31 71.142-1.149-1.68c-.09-.162-.103-.309.049-.424l1.877-1.284.608.641.474.693.377.799-1.888 1.33c-.139.053-.257.037-.348-.075z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.062}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-80.729 154.3h13.564v3.69h-13.564z"
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-52.41 31.821h10.736v2.34H-52.41z"
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-41.675 31.821h10.736v2.34h-10.736z"
                                />
                                <path
                                    d="M242.27 174.52h-1.224v4.36h1.224zM232.09 177.78h-.42v2.81h.42zM231.67 178.07h-.245v2.52h.245zM231.18 178.07h-.245v2.52h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 177.78h-.49v3.036h.735v-.226h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.18 176.17h-.245v1.905h.245zM231.67 176.17h-.245v1.905h.245zM231.67 172.68h-.245v1.873h.245zM231.18 172.68h-.245v1.873h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 170.13h.245v-.226h-.735v3.036h.49v-2.81h.245"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 170.13v2.551h.245v-2.551M231.67 170.13h-.245v2.551h.245v-2.551h.42"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.67 170.13v2.81h.42v-2.81"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M240.62 171.06h-8.536v.323h8.186v7.977h-8.186v.323h8.536zM242.27 161.83h-1.224v4.36h1.224zM232.09 165.12h-.42v2.81h.42zM231.67 165.38h-.245v2.551h.245zM231.18 165.38h-.245v2.551h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 165.12h-.49v3.004h.735v-.194h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.18 163.51h-.245v1.873h.245zM231.67 163.51h-.245v1.873h.245zM231.67 159.99h-.245v1.873h.245zM231.18 159.99h-.245v1.873h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 157.44h.245v-.194h-.735v3.036h.49v-2.842h.245"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 157.44v2.551h.245v-2.551M231.67 157.44h-.245v2.551h.245v-2.551h.42"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.67 157.44v2.842h.42v-2.842"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M240.62 158.37h-8.536v.323h8.186v7.977h-8.186v.323h8.536zM242.27 187.18h-1.224v4.36h1.224zM232.09 190.47h-.42v2.81h.42zM231.67 190.73h-.245v2.551h.245zM231.18 190.73h-.245v2.551h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 190.47h-.49v3.004h.735v-.194h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.18 188.86h-.245v1.873h.245zM231.67 188.86h-.245v1.873h.245zM231.67 185.34h-.245v1.873h.245zM231.18 185.34h-.245v1.873h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 182.79h.245v-.194h-.735v3.004h.49v-2.81h.245"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M230.93 182.79v2.551h.245v-2.551M231.67 182.79h-.245v2.551h.245v-2.551h.42"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M231.67 182.79v2.81h.42v-2.81"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M240.62 183.72h-8.536v.323h8.186v7.977h-8.186v.323h8.536zM228.87 146.78h19.276M248.14 145.97h-19.276v.807M209.42 138.99h-1.924v4.554h1.924zM199.03 151.4h-.525v.807h.875v-.387h-.35zM205.81 151.46h-3.219v.258h3.219zM205.81 150.78h-3.219v.258h3.219zM210.01 150.43h-4.198v.258h4.198zM210.01 150.69h-4.198v.452h4.198zM210.01 151.4h-4.198v.42h4.198v-.42h.21"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M210.01 151.4v.42h-4.198v.387h4.408v-.807M206.72 137.7h-7.697v13.435h.35v-13.112h6.997v12.402h.35zM198.54 174.52h1.224v4.36h-1.224zM208.72 177.78h.42v2.81h-.42zM209.14 178.07h.245v2.52h-.245zM209.63 178.07h.245v2.52h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 177.78h.49v3.036h-.735v-.226h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.63 176.17h.245v1.905h-.245zM209.14 176.17h.245v1.905h-.245zM209.14 172.68h.245v1.873h-.245zM209.63 172.68h.245v1.873h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 170.13h-.245v-.226h.735v3.036h-.49v-2.81h-.245"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 170.13v2.551h-.245v-2.551M209.14 170.13h.245v2.551h-.245v-2.551h-.42"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.14 170.13v2.81h-.42v-2.81M200.18 171.06h8.536v.323h-8.186v7.977h8.186v.323h-8.536zM198.54 187.18h1.224v4.36h-1.224zM208.72 190.47h.42v2.81h-.42zM209.14 190.73h.245v2.551h-.245zM209.63 190.73h.245v2.551h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 190.47h.49v3.004h-.735v-.194h.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.63 188.86h.245v1.873h-.245zM209.14 188.86h.245v1.873h-.245zM209.14 185.34h.245v1.873h-.245zM209.63 185.34h.245v1.873h-.245z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 182.79h-.245v-.194h.735v3.004h-.49v-2.81h-.245"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.87 182.79v2.551h-.245v-2.551M209.14 182.79h.245v2.551h-.245v-2.551h-.42"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M209.14 182.79v2.81h-.42v-2.81M200.18 183.72h8.536v.323h-8.186v7.977h8.186v.323h-8.536zM229.18 146.23h18.682v.29H229.18zM228.87 146.78h19.276m-19.276-.807h19.242M211.94 146.1h4.233v-8.752h-.735v8.074h-3.498z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M211.94 137.35h3.498v8.074h-3.498zM206.09 152.43h.805M230.62 137.35v8.623m1.75-8.623v8.623m1.748-8.623v8.623m1.785-8.623v8.623m1.749-8.623v8.623m1.749-8.623v8.623m1.75-8.623v8.623m1.748-8.623v8.623m1.75-8.623v8.623m1.749-8.623v8.623m1.749-8.623v9.43m-1.75 0v8.624m-1.748-8.624v8.624m-1.75-8.624v8.624m-1.749-8.624v8.624m-1.749-8.624v8.624m-1.75-8.624v8.624m-1.748-8.624v8.624m-1.785-8.624v8.624m-1.749-8.624v8.624m-1.749-8.624v8.624m-1.75-8.624v8.624M202.77 133.31h52.582v2.422H202.77zM216.06 133.31v2.422m8.151-2.422v2.422m22.81-2.422v2.422m-8.186-2.422v2.422M220.1 99.561l1.294-2.713-2.938-1.195-1.295 2.713z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m220 99.331 1.142-2.393-2.593-1.055-1.142 2.394z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.059}
                                />
                                <path
                                    d="M220.19 106.92v-.032h.035v-.065h.035v-.937h.035v-.064h.035v-.033h.035l.035-.032h.07l.035-.032h.07l.035.032h.14l.035.032h.07l.035.033h.07l.035.032h.035l.035.032h.035l.035.033h.07l.07.064h.035l.07.033.07.064h.07l.07.065.07.032h.035l.07.032.07.065.07.032.105.065.105.065.105.064.21.13.315.193"
                                    fill="none"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-84.667}
                                    cy={205.58}
                                    rx={3.018}
                                    ry={2.809}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.146}
                                />
                                <path
                                    d="m154.76 193.52-.035-.065-.105.033v.064l.105.033z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M154.69 193.36v.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.44 193.78.315-.065.245-.161.175-.226.07-.29M157.25 193.04l-.07-.29-.175-.227-.245-.161-.315-.065"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.44 192.29h-.98"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.46 192.29-.21.065-.07.193"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.18 192.55v.969"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.18 193.52.07.194.21.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.46 193.81h.98m-2.764.581v-1.098M153.68 192.78v-1.066h.595v1.066M154.27 193.29v1.098h-.595"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.44 194.04.35-.065.28-.129.245-.226.14-.258.07-.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.56 193.04v-.032"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.53 193.04-.07-.323-.14-.258-.245-.226-.28-.13-.35-.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.44 192.03h-2.03v2.035h2.03M154.87 193.52h-.35m1.644-.258h-.28"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.67 193.04.07.13.14.064M155.88 192.84l-.14.065-.07.129"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.88 192.84h.28"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m154.76 192.55-.035-.065-.105.033v.064l.105.033z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M154.87 192.55h-.35m.175-.161v.322"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m154.76 188.29-.035-.065-.105.033v.064l.105.033z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M154.69 188.13v.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.44 188.55.315-.065.245-.161.175-.226.07-.29M157.25 187.8l-.07-.29-.175-.227-.245-.161-.315-.065"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.44 187.03h-.98"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.46 187.06-.21.065-.07.193"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.18 187.32v.969"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.18 188.29.07.194.21.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.46 188.55h.98m-2.764.581v-1.065M153.68 187.54v-1.098h.595v1.098M154.27 188.06v1.066h-.595"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.44 188.8.35-.065.28-.129.245-.226.14-.258.07-.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.56 187.8v-.032"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.53 187.8-.07-.323-.14-.258-.245-.226-.28-.13-.35-.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.44 186.77h-2.03v2.035h2.03M154.87 188.29h-.35m1.644-.29h-.28"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.67 187.8.07.13.14.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m155.88 187.61-.14.065-.07.129"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.88 187.58h.28"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m154.76 187.32-.035-.065-.105.033v.064l.105.033z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M154.87 187.32h-.35m.175-.161v.322"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m163.38 179.95-.07.032.035.097h.07l.035-.097z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M163.2 180.01h.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m163.66 178.4-.07-.29-.175-.227-.245-.161-.315-.065M162.85 177.65l-.315.065-.245.161-.175.226-.07.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.05 178.4v.904"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.05 179.3.07.194.21.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.33 179.56h1.05"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m163.38 179.56.21-.065.07-.193"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M163.66 179.3v-.904m.665 2.551h-1.19M162.57 180.95h-1.19v-.549h1.19M163.13 180.4h1.19v.549"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m163.94 178.4-.07-.323-.14-.258-.245-.226-.28-.13-.35-.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.85 177.36v-.032"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.85 177.39-.35.065-.28.129-.245.226-.14.258-.07.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M161.73 178.4v1.873h2.239V178.4M163.38 179.85v.323m-.28-1.518v.258"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.85 179.11.14-.065.07-.129M162.64 178.91l.07.13.14.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.61 178.91v-.258"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.33 179.95-.07.032.035.097h.07l.035-.097z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.33 179.85v.323m-.175-.162h.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.53 179.95-.07.032.035.097h.07l.035-.097z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.36 180.01h.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.81 178.4-.07-.29-.175-.227-.245-.161-.315-.065M157.01 177.65l-.315.065-.245.161-.175.226-.07.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.2 178.4v.904"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.2 179.3.07.194.21.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.48 179.56h1.05"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.53 179.56.21-.065.07-.193"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.81 179.3v-.904m.665 2.551h-1.19M156.73 180.95h-1.19v-.549h1.19M157.29 180.4h1.19v.549"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m158.09 178.4-.07-.323-.14-.258-.245-.226-.28-.13-.35-.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.01 177.36v-.032"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.01 177.39-.35.065-.28.129-.245.226-.14.258-.07.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M155.89 178.4v1.873h2.239V178.4M157.53 179.85v.323m-.28-1.518v.258"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.01 179.11.14-.065.07-.129M156.8 178.91l.07.13.14.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.76 178.91v-.258"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m156.48 179.95-.07.032.035.097h.07l.035-.097z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.48 179.85v.323m-.175-.162h.35M171.95 196h10.635v-3.23H171.95z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m175.8 193.64-.21-.13-.21-.096-.245-.065-.245-.032-.28.032-.244.065-.21.097-.175.129M174.08 194.83h1.574"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.45 194.29.035.29.14.259.21.258.28.162.315.13.35.064.384-.033.315-.064.315-.162.245-.226.175-.258.105-.259v-.322l-.105-.259-.175-.258-.245-.226-.315-.162-.315-.064-.385-.033-.35.065-.314.13-.28.16-.21.259-.14.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m174.99 194.58-.07-.097h-.105l-.035.097.035.097h.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M174.89 194.93v.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m174.99 195.09-.07-.097h-.105l-.035.097.035.097h.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.73 194.41.105.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.84 194.71.245.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M175.06 195.09h-.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m175.66 194.83.245-.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m175.94 194.71.105-.29M179.26 193.64l.175-.13.21-.096.245-.065.28-.032.244.032.245.065.21.097.21.129M180.94 194.83h-1.574"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m178.73 194.29.035.29.14.259.21.258.28.162.315.13.35.064.384-.033.315-.064.315-.162.245-.226.175-.258.105-.259v-.322l-.105-.259-.175-.258-.245-.226-.315-.162-.315-.064-.385-.033-.35.065-.314.13-.28.16-.21.259-.14.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m180.27 194.58-.07-.097h-.105l-.035.097.035.097h.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M180.17 194.93v.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m180.27 195.09-.07-.097h-.105l-.035.097.035.097h.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m181.32 194.41-.105.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m180.94 194.83.245-.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M179.99 195.09h.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m179.12 194.71.245.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m179.12 194.71-.105-.29M182.44 161.76h-11.125v3.262h11.125z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m178.87 164.06.21.13.21.096.245.065h.524l.245-.065.21-.097.175-.129M180.59 162.86h-1.574"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m181.22 163.38-.035-.29-.14-.259-.21-.258-.28-.162-.315-.13-.35-.064-.384.033-.315.064-.315.162-.245.226-.175.258-.105.259v.322l.105.259.175.258.245.226.315.162.315.064.385.033.35-.065.314-.13.28-.16.21-.259.14-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m179.68 163.12.035.097h.105l.07-.097-.07-.097h-.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M179.78 162.73v-.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m179.68 162.57.035.097h.105l.07-.097-.07-.097h-.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m180.97 163.28-.14-.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m180.83 162.99-.245-.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M179.61 162.57h.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m179.01 162.86-.245.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m178.73 162.99-.105.29M174.85 164.06l-.175.13-.21.096-.245.065h-.524l-.245-.065-.21-.097-.21-.129M173.17 162.86h1.574"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m175.38 163.38-.035-.29-.14-.259-.21-.258-.28-.162-.315-.13-.35-.064-.384.033-.315.064-.315.162-.245.226-.175.258-.105.259v.322l.105.259.175.258.245.226.315.162.315.064.385.033.35-.065.314-.13.28-.16.21-.259.14-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.84 163.12.035.097h.105l.07-.097-.07-.097h-.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M173.94 162.73v-.323"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.84 162.57.035.097h.105l.07-.097-.07-.097h-.105z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m172.79 163.28.105-.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m173.17 162.86-.245.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M174.12 162.57h-.35"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m174.99 162.99-.245-.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m174.99 162.99.14.29"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.5 164.86.21-.065.14-.129.035-.161M162.5 164.7l.14-.065.07-.129"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M161.38 163.25h2.064"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m161.8 163.64.63.065.63-.065M161.94 164.51l-.21-.484M162.08 164.51l-.07-.323-.175-.258M161.38 163.25l.035.29.105.259.245.194M161.77 163.67l-.07.097M161.7 163.77l.14.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M162.43 164.86h.07m-.07-.13h.07m-.07.13h-.105m.105-.13h-.105"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.12 164.51.07.13.14.064M161.94 164.51l.035.161.14.13.21.064M162.99 163.93l-.175.258-.07.323M163.1 164.02l-.21.484M163.06 163.99l.245-.194.105-.258.035-.29M163.13 163.77l-.07-.097M162.99 163.89l.14-.13M157.81 164.86l.21-.065.14-.129.035-.161M157.81 164.7l.14-.065.07-.129"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M156.73 163.25h2.03"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.11 163.64.63.065.63-.065M157.25 164.51l-.21-.484M157.43 164.51l-.07-.323-.175-.258M156.69 163.25l.035.29.105.259.245.194M157.11 163.67l-.07.097M157.04 163.77l.14.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M157.74 164.86h.07m-.07-.13h.07m-.07.13h-.07m.07-.13h-.07"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m157.46 164.51.07.13.14.064M157.29 164.51l.035.161.14.13.21.064M158.3 163.93l-.175.258-.07.323M158.41 164.02l-.21.484M158.37 163.99l.245-.194.105-.258.035-.29M158.44 163.77l-.07-.097M158.3 163.89l.14-.13M167.15 164.86l.21-.065.14-.129.035-.161M167.15 164.7l.14-.065.07-.129"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M166.07 163.25h2.03"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m166.46 163.64.63.065.63-.065M166.63 164.51l-.21-.484M166.77 164.51l-.07-.323-.175-.258M166.07 163.25l.035.29.105.259.245.194M166.46 163.67l-.07.097M166.39 163.77l.14.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M167.08 164.86h.07m-.07-.13h.07m-.07.13h-.07m.07-.13h-.07"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m166.81 164.51.07.13.14.064M166.63 164.51l.035.161.14.13.21.064M167.64 163.93l-.175.258-.07.323M167.78 164.02l-.21.484M167.75 163.99l.245-.194.105-.258.035-.29M167.78 163.77l-.07-.097M167.64 163.89l.14-.13"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m162.85 190.35-8.508.047m8.508-5.7v11.493m-3.079-23.09v7.17m5.703-7.17h-11.09M170.76 162.86v.388h-16.373v-.388z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m170.76 172.36-4.18.01c.035-1.934 1.236-3.917 4.18-3.856"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.062}
                                />
                                <path
                                    d="m160.96 173.08-.008-3.24c1.748.027 3.54.958 3.485 3.24M155.13 173.07l-.008-3.24c1.748.027 3.54.958 3.485 3.24"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.052}
                                />
                                <path
                                    d="m171.43 185.57-4.175-.009c.035 1.932 1.235 3.912 4.175 3.85"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.062}
                                />
                                <path
                                    d="m162.83 186.17 3.506-.008c-.029 1.645-1.037 3.33-3.506 3.279"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.053}
                                />
                                <path
                                    d="m162.85 194.51 3.506.008c-.028-1.612-1.036-3.264-3.506-3.214"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.052}
                                />
                                <path
                                    d="M153.79 160.15v-42.76"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M198.19 106.83c.663.233 1.617.288 1.677.13.098-.376-.08-.662.107-.97.533-.206 2.224 1.193 3.744 1.034.348-.226.107-.783.21-1.13.294-.517 2.566 1.465 3.988 1.13.355-.323 0-.575.167-.913.476-.573 3.339 1.403 3.919.84.194-.267-.059-1.072.217-1.187.77-.151 2.511 1.652 3.918 1.228.27-.253-.038-.816.21-.97.463-.274 2.542 1.404 3.813.905.2-.247-.05-.953.21-1.13.904-.156 1.586.689 2.38 1.033M40.186 56.51c.663.233 1.617.288 1.677.13.098-.376-.08-.662.107-.97.533-.206 2.224 1.193 3.744 1.034.348-.226.107-.783.21-1.13.294-.517 2.566 1.465 3.988 1.13M108.97 84.176c.233-.663.288-1.617.13-1.677-.376-.098-.662.08-.97-.107-.206-.533 1.193-2.224 1.034-3.744-.226-.348-.783-.107-1.13-.21-.517-.294 1.465-2.566 1.13-3.988-.323-.355-.575 0-.913-.167-.573-.476 1.403-3.339.84-3.919-.267-.194-1.072.059-1.187-.217-.151-.77 1.652-2.511 1.228-3.918"
                                    fill="none"
                                    stroke="#cecece"
                                    strokeWidth={0.07}
                                />
                                <path
                                    d="m227.12 87.51 6.633 3.002M124.16 107.41h19.276v-2.035M124.16 107.41v-2.035M177.09 113.87h-3.288v.904h3.288zM167.96 112.22h-.35v2.745h.945v-.613h-.595v-2.132h.595"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M167.96 112.22v2.131h.595v-2.131"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M168.55 110.35h-.595v1.873h.595zM169.29 110.35h-.595v1.873h.595z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M169.29 112.22h-.595v2.131h.595zM177.83 106.99h-8.536v.323h8.186v5.91h-8.186v.323h8.536zM169.29 106.99h-.595v.323h.595zM168.55 106.99h-.595v.323h.595z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M168.55 106.38h-.945v1.001h.35v-.387h.595zM143.44 105.37v-8.623m-1.75 8.623v-8.623m-1.748 8.623v-8.623m-1.785 8.623v-8.623m-1.749 8.623v-8.623m-1.749 8.623v-8.623m-1.75 8.623v-8.623m-1.748 8.623v-8.623m-1.75 8.623v-8.623m-1.749 8.623v-8.623m-1.749 8.623v-8.623m-1.75 10.658v8.623m1.75-8.623v8.623m1.75-8.623v8.623m1.748-8.623v8.623m1.75-8.623v8.623m1.749-8.623v8.623m1.749-8.623v8.623m1.75-8.623v8.623m1.748-8.623v8.623m1.785-8.623v8.623M124.44 105.66h18.682v1.486H124.44zM143.44 105.37h-19.276"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M124.19 107.41h19.242v-2.035M113.91 116.03h.595V96.749h-.595z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m124.39 116.07-7.422.001zM257.56 151.3l-.001-6.844z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.045}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-149.83 182.64h10.736v2.34h-10.736z"
                                />
                                <path
                                    d="m250.66 123.25.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M248.1 123.03v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m250.25 131.32.09.085.081-.05.315-.825.171-.822.04-.882-.061-.046-.11.01-.04.883-.171.822z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m247.8 130.57.415-1.992c.054-.178.151-.289.34-.26l2.226.464-.041.882-.171.823-.315.825-2.267-.44c-.134-.062-.205-.159-.187-.302z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m227.75 123.14.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M225.19 122.92v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m227.85 130.92.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M225.29 130.69v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m234.95 120.69-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M237.51 120.92v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m235.05 128.46-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M237.6 128.69v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m212.4 120.71-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M214.95 120.94v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m212.5 128.49-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M215.05 128.71v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m222.32 89.463.126-.025.008-.101-.511-.78-.596-.655-.727-.579-.076.025-.058.101.726.579.596.654z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.063}
                                />
                                <path
                                    d="m220.2 91.13-1.444-1.586c-.118-.156-.154-.31-.015-.454l1.743-1.641.726.579.596.654.512.78-1.747 1.693c-.135.077-.26.078-.37-.025z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.063}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m163.74 141.95.065-.105-.065-.07-.872-.14h-.84l-.872.14-.032.07.032.105.872-.14h.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M163.52 144.51h-2.035c-.185-.017-.313-.09-.323-.28v-2.274l.872-.14h.84l.872.14.032 2.31c-.034.143-.114.232-.258.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m171.41 141.75.065-.105-.065-.07-.872-.14h-.84l-.872.14-.032.07.032.105.872-.14h.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M171.19 144.31h-2.035c-.185-.017-.313-.09-.323-.28v-2.274l.872-.14h.84l.872.14.032 2.31c-.034.143-.114.232-.258.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m163.21 120.49.065-.105-.065-.07-.872-.14h-.84l-.872.14-.032.07.032.105.872-.14h.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M162.99 123.04h-2.035c-.185-.017-.313-.09-.323-.28v-2.274l.872-.14h.84l.872.14.032 2.31c-.034.143-.114.232-.258.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m170.88 120.29.065-.105-.065-.07-.872-.14h-.84l-.872.14-.032.07.032.105.872-.14h.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M170.66 122.84h-2.035c-.185-.017-.313-.09-.323-.28v-2.274l.872-.14h.84l.872.14.032 2.31c-.034.143-.114.232-.258.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m161.39 156.74-.065.105.065.07.872.14h.84l.872-.14.032-.07-.032-.105-.872.14h-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M161.62 154.19h2.035c.185.017.313.09.323.28v2.274l-.872.14h-.84l-.872-.14-.032-2.31c.034-.143.114-.232.258-.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m169.06 156.54-.065.105.065.07.872.14h.84l.872-.14.032-.07-.032-.105-.872.14h-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M169.29 153.99h2.035c.185.017.313.09.323.28v2.274l-.872.14h-.84l-.872-.14-.032-2.31c.034-.143.114-.232.258-.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m160.86 135.28-.065.105.065.07.872.14h.84l.872-.14.032-.07-.032-.105-.872.14h-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M161.08 132.72h2.035c.185.017.313.09.323.28v2.274l-.872.14h-.84l-.872-.14-.032-2.31c.034-.143.114-.232.258-.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m168.53 135.08-.065.105.065.07.872.14h.84l.872-.14.032-.07-.032-.105-.872.14h-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M168.76 132.52h2.035c.185.017.313.09.323.28v2.274l-.872.14h-.84l-.872-.14-.032-2.31c.034-.143.114-.232.258-.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-137.89 182.6h10.736v2.34h-10.736z"
                                />
                                <path
                                    d="M66.189 79.214v-2.713h8.151v2.713z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M66.749 78.665V77.05h7.032v1.615zM83.503 79.311v-2.713h8.19v2.713z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M84.102 78.762v-1.615h7.032v1.615zM49.312 78.697v-1.615h7.032v1.615zM31.555 57.253h2.344v38.142h-2.344zM63.216 94.297h16.443v3.553H63.216z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m97.644 110.09.105.065.07-.065.142-.871.003-.84-.138-.872-.07-.033-.105.032.138.873-.003.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m95.091 109.86.006-2.035c.017-.185.09-.313.28-.322l2.274.006.138.873-.002.84-.143.87-2.309.027c-.144-.035-.233-.116-.244-.26z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m83.201 107.23-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M85.755 107.46v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m64.51 107.34-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M67.064 107.56v2.035c-.017.185-.09.313-.28.323H64.51l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m45.923 107.14-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M48.477 107.36v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m38.121 108.38.101-.07-.031-.09-.744-.477-.77-.335-.855-.22-.057.05-.013.11.856.22.77.335z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m36.894 110.63-1.865-.813c-.163-.09-.252-.207-.185-.385l.909-2.085.855.22.77.335.743.477-.892 2.13c-.09.118-.199.167-.335.12z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m36.122 115.44.014.122.094.016.772-.429.66-.519.6-.648-.018-.075-.09-.063-.6.649-.66.518z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m34.722 113.29 1.6-1.257c.156-.1.302-.123.427.02l1.405 1.79-.6.648-.66.518-.772.429-1.452-1.796c-.062-.135-.054-.254.052-.352z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m36.364 105.66-.005.123.09.03.83-.307.73-.412.692-.55-.007-.077-.08-.076-.69.55-.732.413z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m35.306 103.32 1.772-1c.17-.075.318-.075.42.086l1.116 1.98-.691.551-.731.412-.829.307-1.162-1.996c-.04-.142-.014-.26.105-.34z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m37.26 97.732.058-.109.093.02.562.681.426.724.32.823-.043.063-.107.026-.321-.823-.426-.724z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m35.172 99.221 1.03 1.754c.11.151.237.225.406.137l1.96-1.152-.32-.823-.426-.724-.563-.68-2.007 1.141c-.107.103-.143.217-.08.347z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m45.923 81.804-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M48.477 82.03v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m45.725 71.485-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M48.279 71.711v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m53.544 26.199.065-.105-.065-.07-.872-.14h-.84l-.872.14-.032.07.032.105.872-.14h.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M53.318 28.753h-2.035c-.185-.017-.313-.09-.323-.28V26.2l.872-.14h.84l.872.14.032 2.31c-.034.143-.114.232-.258.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m50.791 49.403-.065.105.065.07.872.14h.84l.872-.14.032-.07-.032-.105-.872.14h-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M51.018 46.849h2.035c.185.017.313.09.323.28v2.274l-.872.14h-.84l-.872-.14-.032-2.31c.034-.143.114-.232.258-.244z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m46.521 43.502-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M49.075 43.729v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m46.276 40.172-.11-.055-.064.07-.06.882.075.836.218.856.073.026.101-.042-.218-.856-.076-.836z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m48.84 40.166.184 2.026c0 .186-.062.32-.25.347l-2.265.205-.218-.855-.075-.837.06-.88 2.297-.241c.147.021.242.093.267.235z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m46.607 36.289-.1-.072-.075.06-.198.86-.056.839.08.88.068.036.107-.025-.08-.88.056-.837z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m49.14 36.686-.137 2.03c-.03.184-.11.307-.3.303l-2.27-.153-.08-.88.056-.837.198-.86 2.306.123c.142.044.225.13.227.274z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m46.319 32.652-.107-.061-.068.066-.113.876.026.84.166.867.071.03.104-.036-.166-.867-.026-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m48.879 32.8.062 2.034c-.011.185-.08.316-.27.331l-2.272.07-.167-.868-.026-.839.113-.876 2.307-.103c.146.03.237.108.253.251z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m46.344 28.695-.1-.071-.075.06-.194.861-.054.838.085.88.068.036.107-.025-.085-.88.053-.838z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m48.879 29.082-.129 2.03c-.028.184-.11.308-.3.305l-2.269-.144-.084-.879.053-.838.194-.861 2.307.114c.142.043.225.129.228.273z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m57.833 46.377.102.069.073-.062.176-.865.034-.84-.104-.876-.068-.035-.106.027.103.878-.034.839z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m55.29 46.046.084-2.033c.025-.184.103-.31.293-.311l2.272.094.104.877-.035.839-.176.865-2.308-.063c-.143-.04-.228-.124-.234-.268z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m57.886 42.569.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M55.332 42.343v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m57.765 38.825.107.06.068-.066.108-.877-.03-.839-.172-.866-.072-.03-.103.036.171.866.031.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m55.204 38.692-.074-2.033c.01-.186.078-.317.268-.333l2.272-.083.172.866.03.84-.108.876-2.306.116c-.145-.029-.237-.106-.254-.249z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m57.753 35.061.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M55.2 34.835V32.8c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m57.74 31.046.11.057.064-.07.077-.88-.061-.837-.203-.86-.073-.027-.102.04.203.86.061.837z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m55.177 31.006-.148-2.03c.004-.185.067-.319.256-.342l2.268-.165.203.86.06.837-.075.88-2.3.2c-.147-.024-.242-.098-.264-.24z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m63.121 71.419-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M65.675 71.645v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m80.451 71.617-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M83.005 71.843v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m80.385 81.737-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M82.939 81.963v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m63.253 82.002-.105-.065-.07.065-.14.872v.84l.14.872.07.032.105-.032-.14-.872v-.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M65.807 82.228v2.035c-.017.185-.09.313-.28.323h-2.274l-.14-.872v-.84l.14-.872 2.31-.032c.143.034.232.114.244.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m60.267 110.02.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M57.713 109.79v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m78.854 110.02.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M76.3 109.79v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m94.807 84.597.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M92.253 84.371v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m77.41 74.41.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M74.857 74.184v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m60.146 84.531.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M57.593 84.305V82.27c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m60.002 74.097.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M57.448 73.871v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m77.266 84.151.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M74.713 83.925V81.89c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m94.597 73.965.105.065.07-.065.14-.872v-.84l-.14-.872-.07-.032-.105.032.14.872v.84z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M92.043 73.739v-2.035c.017-.185.09-.313.28-.323h2.274l.14.872v.84l-.14.872-2.31.032c-.143-.034-.232-.114-.244-.258z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m107.02 35.259-7.312 17.569 9.236 3.488"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M63.655 55.719c-.663-.233-1.617-.288-1.677-.13-.098.376.08.662-.107.97-.533.206-2.224-1.193-3.744-1.034-.348.226-.107.783-.21 1.13-.294.517-2.566-1.465-3.988-1.13M69.226 20.261c.233.663.288 1.617.13 1.677-.376.098-.662-.08-.97.107-.206.533 1.193 2.224 1.034 3.744-.226.348-.783.107-1.13.21-.517.294 1.465 2.566 1.13 3.988-.323.355-.575 0-.913.167-.573.476 1.403 3.339.84 3.919-.267.194-1.072-.059-1.187.217-.151.77 1.652 2.511 1.228 3.918"
                                    fill="none"
                                    stroke="#cecece"
                                    strokeWidth={0.07}
                                />
                                <path
                                    d="M48.48 47.071h6.997v-6.492H48.48z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M48.48 40.58h6.997v-6.46H48.48zM48.48 34.12h6.997v-6.492H48.48z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="m37.724 44.808-4.747-3.114 4.747-3.113"
                                    fill="none"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-44.213 32.557h5.038v.194h-5.038z"
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.08}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-47.946 32.751h12.502v.226h-12.502z"
                                />
                                <path
                                    d="m231.4 96.83 3.255 2.385-3.255 2.385"
                                    fill="none"
                                    stroke="#cecece"
                                    strokeLinejoin="round"
                                    strokeWidth={0.043}
                                />
                                <path
                                    transform="rotate(90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.043}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M97.286-234.95h3.859v.133h-3.859z"
                                />
                                <path
                                    transform="rotate(90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.058}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M94.427-234.81h9.577v.155h-9.577z"
                                />
                                <g fill="#fff" stroke="#cecece" strokeLinecap="round" strokeLinejoin="round">
                                    <path
                                        transform="rotate(27.926 63.25 73.4)"
                                        strokeWidth={0.049}
                                        style={{
                                            paintOrder: "markers fill stroke",
                                        }}
                                        d="M34.295 30.081h.148v1.337h-.148zM43.914 30.081h.148v1.337h-.148z"
                                    />
                                    <path
                                        transform="rotate(27.926 63.25 73.4)"
                                        strokeWidth={0.06}
                                        style={{
                                            paintOrder: "markers fill stroke",
                                        }}
                                        d="M33.845 30.627h10.683v.198H33.845z"
                                    />
                                </g>
                                <path
                                    transform="rotate(-75.284)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-48.525 219.44h4.685v10.994h-4.685z"
                                />
                                <path
                                    transform="rotate(-75.284)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.058}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-47.593 220.31h4.087v4.665h-4.087z"
                                />
                                <path
                                    transform="rotate(-75.284)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.058}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-47.593 224.97h4.087v4.665h-4.087z"
                                />
                                <path
                                    d="M206.28 102.49c-.352-.069-.569.532-.17.684l3.493.9c.321.055.49-.528.176-.652z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M208.06 102.2c-.203.048-.158.684.092.698l2.075-.274c.183-.05.118-.654-.081-.67zM201.66 100.85c-.196-.073-.511.48-.311.632l1.877.924c.18.06.462-.478.305-.601z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.046}
                                />
                                <path
                                    transform="rotate(97.252) skewX(-.018)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.071}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M19.843-99.411h4.685v15.556h-4.685z"
                                />
                                <path
                                    transform="rotate(97.263)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.058}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M20.786-93.989h4.087v4.665h-4.087z"
                                />
                                <path
                                    transform="rotate(97.263)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.058}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M20.786-98.654h4.087v4.665h-4.087zM20.786-89.324h4.087v4.665h-4.087z"
                                />
                                <path
                                    d="M85.299 32.698c.358.022.495-.601.08-.7l-3.58-.439c-.326-.013-.418.587-.09.669zM89.968 33.28c.358.022.495-.601.08-.7l-3.58-.439c-.326-.013-.418.587-.09.669zM94.466 33.856c.358.022.495-.601.08-.7l-3.58-.439c-.326-.013-.418.587-.09.669z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="M83.568 33.218c.195-.074.068-.698-.182-.68l-2.021.54c-.176.074-.032.665.167.654zM94.617 35.085c.203.047.444-.543.226-.667l-1.98-.673c-.188-.036-.396.534-.225.636z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.046}
                                />
                                <path
                                    transform="rotate(-150.69) skewX(.046)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.037}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-105.21 6.017h4.326v4.508h-4.326z"
                                />
                                <path
                                    transform="rotate(-150.698) skewX(.016)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.045}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-104.34 6.698h3.755V9.86h-3.755z"
                                />
                                <path
                                    d="M93.904 44.581c-.104.218.26.466.427.232l1.178-2.123c.09-.2-.27-.414-.405-.23z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.041}
                                />
                                <path
                                    transform="matrix(.91747 -.3978 .39853 .91715 0 0)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.037}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M53.922 67.062h4.326v4.508h-4.326z"
                                />
                                <path
                                    transform="rotate(-23.448) skewX(.016)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.045}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M54.818 67.764h3.755v3.162h-3.755z"
                                />
                                <path
                                    d="M78.004 40.449c-.11-.214-.528-.075-.443.2l.977 2.222c.104.193.493.035.428-.183z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.041}
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-.183 222.69h1.298v4.83H-.183z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-.183 222.69h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-.176 223.4h.849v3.352h-.849z"
                                />
                                <path
                                    d="m208.22 80.988 3.106 1.208M208.29 80.805l3.106 1.208M208.33 80.713l3.106 1.208M208.37 80.617l3.106 1.208M208.41 80.516l3.106 1.208M208.26 80.892l3.106 1.208"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-157.65-63.519h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-157.65-63.519h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-157.64-62.809h.849v3.352h-.849z"
                                />
                                <path
                                    d="m157.51 62.733-.001-3.333M157.32 62.733l-.001-3.333M157.22 62.733l-.001-3.333M157.11 62.733l-.001-3.333M157.01 62.734l-.001-3.333M157.41 62.733l-.001-3.333"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-65.675)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M12.393 243.75h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(-65.675)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M12.393 243.75h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-65.675)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M12.4 244.46h.849v3.352H12.4z"
                                />
                                <path
                                    d="m227.94 89.256 3.037 1.373M228.02 89.078l3.037 1.373M228.06 88.987l3.037 1.373M228.1 88.894l3.037 1.373M228.15 88.795l3.037 1.373M227.98 89.163l3.037 1.373"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-61.105)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M33.092 263.97h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(-61.105)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M33.092 263.97h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-61.105)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M33.1 264.68h.849v3.352H33.1z"
                                />
                                <path
                                    d="m247.81 98.78 2.918 1.61M247.9 98.609l2.918 1.61M247.95 98.522l2.918 1.61M248 98.432l2.918 1.61M248.05 98.337l2.918 1.61M247.86 98.69l2.918 1.61"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-.378)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M255.63 126.06h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(-.378)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M255.63 126.06h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-.378)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M255.64 126.77h.849v3.352h-.849z"
                                />
                                <path
                                    d="m256.63 125.1.022 3.332M256.82 125.1l.022 3.332M256.92 125.1l.022 3.332M257.02 125.09l.022 3.332M257.13 125.09l.022 3.332M256.73 125.1l.022 3.332"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(180.01)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.22-152.08h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(180.01)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.22-152.08h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(180.01)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.21-151.36h.849v3.352h-.849z"
                                />
                                <path
                                    d="M155.02 151.38v-3.333M154.82 151.38v-3.333M154.73 151.38v-3.333M154.62 151.38v-3.333M154.52 151.38v-3.333M154.92 151.38v-3.333"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.17-131.74h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.17-131.74h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(179.98)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-155.16-131.03h.849v3.352h-.849z"
                                />
                                <path
                                    d="m155.05 130.97-.001-3.333M154.85 130.97l-.001-3.333M154.75 130.97l-.001-3.333M154.65 130.97l-.001-3.333M154.54 130.97l-.001-3.333M154.94 130.97l-.001-3.333"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-81.189)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-39.832 128.03h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(-81.189)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-39.832 128.03h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-81.189)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-39.824 128.74h.849v3.352h-.849z"
                                />
                                <path
                                    d="m121.16 58.921 3.293.51M121.19 58.727l3.293.51M121.2 58.629l3.293.51M121.22 58.528l3.293.51M121.24 58.421l3.293.51M121.17 58.82l3.293.51"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.982 82.88H6.28v4.83H4.982z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.982 82.88h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.989 83.591h.849v3.352h-.849z"
                                />
                                <path
                                    d="m79.785 25.502 3.106 1.208M79.856 25.32l3.106 1.208M79.892 25.227l3.106 1.208M79.929 25.132l3.106 1.208M79.969 25.031l3.106 1.208M79.822 25.407l3.106 1.208"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.69 60.963h1.298v4.83H4.69z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.69 60.963h.874v4.811H4.69z"
                                />
                                <path
                                    transform="rotate(-68.751)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M4.697 61.674h.849v3.352h-.849z"
                                />
                                <path
                                    d="m59.252 17.832 3.106 1.208M59.323 17.649l3.106 1.208M59.359 17.556l3.106 1.208M59.396 17.461l3.106 1.208M59.436 17.36l3.106 1.208M59.289 17.736l3.106 1.208"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(90.202)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M114.68-57.481h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(90.202)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M114.68-57.481h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(90.202)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M114.69-56.77h.849v3.352h-.849z"
                                />
                                <path
                                    d="m56.352 115.05-3.333-.012M56.351 115.24l-3.333-.012M56.35 115.34l-3.333-.012M56.35 115.45l-3.333-.012M56.35 115.55l-3.333-.012M56.351 115.15l-3.333-.012"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    transform="rotate(-82.865)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-30.487 87.879h2.947v2.947h-2.947z"
                                />
                                <path
                                    transform="rotate(-82.865)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-30.487 90.826h2.947v2.947h-2.947z"
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-114.66 31.697h5.946v3.223h-5.946zM-104.49 31.819h5.946v3.223h-5.946z"
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.064}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-67.557 154.28h3.425v3.71h-3.425z"
                                />
                                <path
                                    d="M685.44 819.04h16v1.76h-16z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="matrix(0 -.21407 .23189 0 -35.647 230.89)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.286}
                                />
                                <path
                                    d="M0 0v-1.76M.96 0v-1.76M2.08 0v-1.76M3.2 0v-1.76M4.16 0v-1.76M5.28 0v-1.76M6.4 0v-1.76M7.36 0v-1.76M8.48 0v-1.76M9.6 0v-1.76M10.56 0v-1.76M11.68 0v-1.76M12.8 0v-1.76M13.76 0v-1.76"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    transform="matrix(0 -.21407 .23189 0 154.69 83.914)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.286}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.064}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-84.154 154.28h3.425v3.71h-3.425z"
                                />
                                <path
                                    d="M154.69 80.729v3.425M154.28 83.914h.408M154.28 83.708h.408M154.28 83.469h.408M154.28 83.229h.408M154.28 83.023h.408M154.28 82.784h.408M154.28 82.544h.408M154.28 82.338h.408M154.28 82.099h.408M154.28 81.859h.408M154.28 81.653h.408M154.28 81.414h.408M154.28 81.174h.408M154.28 80.968h.408"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.064}
                                />
                                <path
                                    transform="rotate(-90)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M-73.185 155.11h3.204v1.707h-3.204z"
                                />
                                <path
                                    d="m160.22 76.234-.118-.034-.05.081.1.878.228.808.37.802.076.012.092-.06-.37-.801-.227-.809z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m162.74 75.761.55 1.959c.034.183-.002.326-.182.387l-2.19.614-.37-.801-.227-.809-.1-.877 2.213-.656c.149-.005.256.048.306.183z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m160.77 71.044-.092-.082-.08.052-.288.835-.144.827-.012.883.063.044.109-.014.012-.883.144-.827z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m163.25 71.706-.35 2.004c-.048.18-.142.294-.33.27l-2.241-.39.012-.883.144-.828.288-.835 2.28.365c.136.06.21.153.197.297z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m158.38 59.23-.117-.04-.054.078.054.882.184.82.327.82.076.016.095-.055-.327-.82-.184-.82z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m160.92 58.893.445 1.985c.024.185-.02.326-.203.377l-2.219.497-.327-.82-.183-.82-.055-.881 2.247-.537c.148.003.252.061.295.199z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m164.42 63.15.027.12.095.006.723-.507.603-.584.53-.707-.026-.073-.097-.053-.528.707-.603.585z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m162.8 61.158 1.461-1.416c.145-.117.288-.154.427-.024l1.582 1.633-.529.708-.603.584-.723.506-1.63-1.635c-.076-.128-.08-.248.015-.356z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m166.89 61.205-.088-.086-.083.047-.33.82-.185.819-.057.88.061.048.11-.008.057-.882.185-.819z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m169.33 61.991-.45 1.984c-.058.177-.157.286-.345.253l-2.217-.503.056-.882.186-.818.33-.82 2.258.48c.133.066.202.163.182.306z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m174.24 66.4.068.103.09-.03.494-.732.353-.762.24-.85-.05-.059-.11-.015-.239.85-.353.763z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m172.01 65.122.855-1.846c.093-.161.213-.247.39-.176l2.063.956-.24.85-.352.762-.493.732-2.11-.94c-.116-.093-.163-.203-.113-.338z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m165.88 68.675.048-.113-.074-.06-.883-.007-.83.126-.842.27-.021.074.048.099.84-.27.83-.126z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m166.04 71.234-2.011.306c-.186.011-.324-.042-.362-.228l-.342-2.248.841-.27.83-.126.883.007.38 2.278c-.013.148-.079.248-.219.281z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m170.36 68.803.066-.104-.064-.07-.87-.152-.84-.011-.873.128-.033.07.03.105.874-.128.84.01z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m170.1 71.354-2.034-.026c-.185-.02-.313-.094-.32-.285l.03-2.273.874-.129.84.011.87.151.001 2.31c-.036.143-.117.231-.261.241z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m174.39 68.9.066-.104-.064-.07-.87-.152-.84-.011-.873.128-.033.07.03.105.874-.128.84.01z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m174.13 71.451-2.034-.026c-.185-.02-.313-.094-.32-.285l.03-2.273.874-.129.84.011.87.151.001 2.31c-.036.143-.117.231-.261.241z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m163.19 80.68-.085.09.05.081.825.315.822.17.882.041.046-.062-.01-.11-.883-.04-.822-.17z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m163.93 78.225 1.992.414c.178.054.289.152.26.34l-.463 2.226-.883-.04-.822-.171-.825-.315.438-2.267c.063-.134.16-.205.303-.187z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m178.2 72.22.119-.032v-.095l-.539-.7-.612-.575-.731-.495-.071.03-.049.098.731.495.612.575z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m176.28 73.926-1.483-1.393c-.123-.14-.167-.28-.043-.426l1.557-1.657.731.496.612.575.54.699-1.558 1.704c-.124.082-.243.092-.356.002z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m203.49 79.207.001-.123-.091-.027-.82.33-.719.433-.675.57.008.077.082.073.675-.57.72-.433z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m204.61 81.512-1.743 1.05c-.167.08-.315.085-.421-.073l-1.173-1.948.675-.57.719-.433.819-.33 1.219 1.96c.045.142.022.26-.095.344z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m199.69 84.522-.111-.054-.063.072-.05.882.085.835.228.853.073.025.101-.043-.228-.853-.085-.835z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m202.25 84.487.207 2.024c.002.186-.057.321-.245.35l-2.262.232-.228-.854-.086-.835.05-.882 2.294-.267c.147.02.244.09.27.232z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m211.06 86.202.098.074.076-.057.224-.854.082-.836-.055-.881-.066-.04-.108.023.055.881-.082.836z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m208.54 85.729.198-2.025c.035-.183.12-.303.31-.294l2.263.22.054.882-.081.836-.224.854-2.301-.192c-.14-.048-.221-.137-.22-.281z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m167.36 80.869-.066.104.064.07.87.152.84.011.873-.128.033-.07-.03-.105-.874.128-.84-.01z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m167.61 78.318 2.034.026c.185.02.313.094.32.285l-.03 2.273-.874.129-.84-.011-.87-.151-.001-2.31c.036-.143.117-.231.261-.241z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m170.92 80.845-.066.104.064.07.87.152.84.011.873-.128.033-.07-.03-.105-.874.128-.84-.01z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m171.18 78.294 2.034.026c.185.02.313.094.32.285l-.03 2.273-.874.129-.84-.011-.87-.151-.001-2.31c.036-.143.117-.231.261-.241z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m177.34 78.024.086.088.084-.046.346-.812.204-.815.075-.88-.06-.048-.11.006-.075.88-.203.815z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m174.92 77.187.492-1.974c.062-.176.163-.283.35-.246l2.206.55-.075.88-.203.815-.347.812-2.248-.527c-.132-.068-.198-.168-.175-.31z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-70.681}
                                    y={182.06}
                                    width={2.344}
                                    height={2.325}
                                    ry={0.383}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.033}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-69.51}
                                    cy={183.24}
                                    rx={1.051}
                                    ry={1.032}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.034}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-69.51}
                                    cy={183.24}
                                    rx={0.146}
                                    ry={0.143}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.034}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-69.962}
                                    y={181.99}
                                    width={0.239}
                                    height={0.073}
                                    rx={0}
                                    ry={0.036}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.032}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-69.346}
                                    y={181.99}
                                    width={0.239}
                                    height={0.073}
                                    rx={0}
                                    ry={0.005}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.032}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.31374 -.94951 .95302 .3029 0 0)"
                                    x={-14.906}
                                    y={198.47}
                                    width={2.395}
                                    height={2.221}
                                    ry={0.006}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.054}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.31374 -.94951 .95302 .3029 0 0)"
                                    x={-14.772}
                                    y={200.69}
                                    width={2.26}
                                    height={1.824}
                                    ry={0.005}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.047}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.31374 -.94951 .95302 .3029 0 0)"
                                    x={-14.772}
                                    y={202.51}
                                    width={2.26}
                                    height={1.824}
                                    ry={0.005}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.047}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-78.777}
                                    y={163.04}
                                    width={8.05}
                                    height={11.979}
                                    ry={0.912}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.055}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    transform="rotate(-67.072)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M6.313 170.85h3.321v4.607H6.313z"
                                />
                                <path
                                    transform="rotate(-66.767)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M7.272 179.63h3.321v4.607H7.272z"
                                />
                                <path
                                    d="m124.89 74.717-.118-.034-.05.081.1.878.228.808.37.802.076.012.092-.06-.37-.801-.227-.809z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m127.41 74.245.55 1.959c.034.183-.002.326-.182.387l-2.19.614-.37-.801-.227-.809-.1-.877 2.213-.656c.149-.005.256.048.306.183z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m130.58 80.506-.067.103.063.072.868.162.84.022.874-.118.034-.07-.03-.105-.874.118-.84-.022z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m130.87 77.959 2.034.052c.185.022.311.098.316.288l-.059 2.274-.875.117-.84-.021-.867-.163.026-2.309c.039-.143.121-.23.265-.238z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m137.87 78.358.079.095.087-.039.413-.78.27-.795.15-.87-.057-.054-.11-.003-.148.87-.27.796z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m135.52 77.322.656-1.926c.075-.17.186-.268.369-.216l2.152.733-.148.87-.27.796-.414.78-2.196-.713c-.126-.08-.184-.184-.15-.324z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="m128.93 66.713-.006-.123-.093-.021-.798.378-.692.476-.64.609.014.076.086.068.64-.609.691-.476z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <path
                                    d="m130.19 68.946-1.677 1.152c-.162.091-.31.104-.425-.048l-1.287-1.874.639-.609.692-.475.798-.379 1.334 1.885c.053.138.038.257-.074.348z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-73.348}
                                    cy={131.82}
                                    rx={4.654}
                                    ry={4.537}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="rotate(-90)"
                                    x={-83.804}
                                    y={145.1}
                                    width={3.969}
                                    height={8.004}
                                    ry={0}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    x={119.78}
                                    y={77.922}
                                    width={3.223}
                                    height={5.621}
                                    ry={0}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.045}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.18901 -.98198 .98762 .15685 0 0)"
                                    x={-42.805}
                                    y={144.67}
                                    width={4.572}
                                    height={5.523}
                                    ry={1.941}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.047}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.32476 -.9458 .91881 .3947 0 0)"
                                    x={-4.782}
                                    y={155.81}
                                    width={4.628}
                                    height={5.155}
                                    ry={1.812}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.046}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <rect
                                    transform="matrix(.95698 -.29016 .22831 .97359 0 0)"
                                    x={127.79}
                                    y={108.79}
                                    width={4.811}
                                    height={4.936}
                                    ry={1.735}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.046}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                />
                                <path
                                    d="M111.81 95.357v-1.873h2.624v1.873zM114.88 95.357v-1.873h2.624v1.873zM117.93 95.357v-1.873h2.624v1.873zM120.97 95.357v-1.873h2.659v1.873zM124.05 95.357v-1.873h2.624v1.873zM127.09 95.357v-1.873h2.624v1.873zM130.12 95.357v-1.873h2.624v1.873zM133.19 95.357v-1.873h2.624v1.873zM136.24 95.357v-1.873h2.624v1.873zM139.28 95.357v-1.873h2.659v1.873zM142.36 95.357v-1.873h2.624v1.873zM145.4 95.357v-1.873h2.624v1.873zM148.37 95.362v-1.873h2.624v1.873zM151.45 95.362v-1.873h2.624v1.873zM154.5 95.362v-1.873h2.624v1.873zM157.54 95.362v-1.873h2.659v1.873zM160.62 95.362v-1.873h2.624v1.873zM163.66 95.362v-1.873h2.624v1.873z"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    transform="rotate(89.689)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M115.33-89.185h1.298v4.83h-1.298z"
                                />
                                <path
                                    transform="rotate(89.689)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M115.33-89.185h.874v4.811h-.874z"
                                />
                                <path
                                    transform="rotate(89.689)"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinecap="round"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.06}
                                    style={{
                                        paintOrder: "markers fill stroke",
                                    }}
                                    d="M115.34-88.475h.849v3.352h-.849z"
                                />
                                <path
                                    d="m89.087 115.01-3.333.018M89.088 115.21l-3.333.018M89.088 115.31l-3.333.018M89.089 115.41l-3.333.018M89.09 115.52l-3.333.018M89.087 115.11l-3.333.018"
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeWidth={0.06}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={2.104}
                                    ry={2.035}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.05}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={2.014}
                                    ry={1.948}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.048}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={1.839}
                                    ry={1.779}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.044}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={1.292}
                                    ry={1.25}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.031}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={0.614}
                                    ry={0.594}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.015}
                                />
                                <ellipse
                                    transform="rotate(-90)"
                                    cx={-103.51}
                                    cy={217.02}
                                    rx={0.221}
                                    ry={0.214}
                                    fill="#fff"
                                    stroke="#cecece"
                                    strokeLinejoin="bevel"
                                    strokeWidth={0.015}
                                />
                                <path
                                    d="m37.702 8.556 6.822 2.519m13.539 4.973 6.822 2.552m13.504 4.973 6.752 2.616m13.224 5.458 6.717 2.778m102.26 44.924 6.717 2.648m32.501 14.727 6.332 3.327m12.35 6.911 6.123 3.682"
                                    fill="none"
                                    stroke="#cfcfcf"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit={10}
                                    strokeWidth={0.067}
                                />
                                <path
                                    d="M7.448 181.01h31.295v1.75h-2.971v12.28h2.971v1.469h-7.299v-1.47h2.971v-12.28H23.111v12.28h2.94v1.47h-7.267v-1.47h2.97v-12.28H10.42v12.28h2.971v1.47H9.353v-13.75H7.448z"
                                    fill="url(#S)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    d="M13.39 213.44H9.353v13.749H7.448v2.03h39.66v12.873h-.743v1.435h6.491v-1.435h-4.134v-38.868h-1.615v10.216h-2.97v1.47h2.97v12.28H35.771v-12.28h2.972v-1.47h-7.3v1.47h2.972v12.28H23.111v-12.28h2.939v-1.47h-7.267v1.47h2.971v12.28H10.418v-12.28h2.972z"
                                    fill="url(#T)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    d="m47.366 181.01 21.025.035v62.482h-8.752v-1.434h7.137v-45.585H48.722v.874h-1.615v-.874h-2.97v-1.47h6.458v-3.568h1.098v3.568h15.082v-12.28H51.693v1.47h-1.098v-1.47h-3.23zM86.735 242.37v26.693l7.816-12.315-1.098-.84-5.62 8.991v-22.53zM104.05 237.44l-2.228 4.128-2.637 4.662-2.046 3.56 1.13.77 2.39-4.164 1.163-1.959 2.228-4.128 1.13-2.1zM108.54 231.77l-1.163-.665 3.198-6.367 1.744-3.708H96.462v-.7h16.18l.968-2.064 1.163.665-.743 1.609-1.162 2.484-1.098 2.379-1.195 2.344z"
                                    fill="url(#a)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    d="M92.129 180.73h-5.394v2.344h5.394v-.315h18.086v-1.75H92.129z"
                                    fill="url(#e)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    d="m117.8 212.36-1.227-.665 1.97-4.478.904-1.994 1.357-3.393 1.291-3.219 1.647.805-1.647 3.568-1.291 2.869-1.39 2.973-1.29 2.834zM124.75 191.89l2.002-5.388 1.292-3.743h-11.917v-1.75h3.165v-2.938h.678v2.939h8.656l3.875-11.895h3.747l2.38-5.29 3.24-7.2 2.745-6.472.968-2.379 2.261-5.422 1.453-3.534-29.325.035.024 34.53h-.702v-72.138h.678v2.204h19.733v.735H119.97v33.9h20.766l2.616-12.874 1.325.28-2.39 11.86 7.622.035 4.815-11.663 4.163-10.056 4.42-10.641 1.62-3.92 2.518-6.122h-18.312l-1.098 9.586-.71 5.317-1.324 8.187-.388 2.274-1.324-.28 1.324-7.907.904-6.332.226-1.644h-2.745v-.735h2.745l1.066-8.781v-1.154h20.25l1.615-3.884.969.49-4.748 11.44-4.108 9.966-3.836 9.275-3.553 8.607-3.294 7.976-4.494 10.741-1.998 4.897-1.711 4.128-5.459 11.976-1.194 2.648-3.747 8.256-3.875 8.537-1.873 4.233z"
                                    fill="url(#a)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    transform="rotate(-90 109.76 94.368) scale(.26458)"
                                    d="m23 518.5-1.5 126.75 9.094.03 44.918-.41v-15.868h-.488v-1.19H73.07v3.968l-42.477-.008v-106.48l129.51-.086v61.89l-25.512-.007v2.115l25.512.049v41.996h-42.846v-3.438h-2.074v1.192h-.365l-.004 15.467 67.627.002v-2.774l-16.234-.002v-123.1zm94.256 114.87h42.846l-.03 8.86h-42.815zm-86.543.53H73.07v8.859H30.713z"
                                    fill="url(#a)"
                                />
                                <path
                                    d="M14.747 155.93v.595l-7.157-.005-.033-.629z"
                                    fill="url(#a)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    transform="rotate(-90 109.76 94.368) scale(.26458)"
                                    d="M73.07 525.21v64.129h-3.053v2.248h3.053v20.891h1.953v-10.576h40.158v10.576h2.074v-23.271h3.053v-2.115h-3.053v-19.965H90.157V525.21h-2.806v41.916H75.023V525.21zm1.953 44.164h40.158v30.41H75.023z"
                                    fill="url(#a)"
                                />
                                <path
                                    d="M52.598 170.52h24.771v-.735l-11.362-.06-.071-31.356v-.611h-.695l.017.611v31.416h-12.66z"
                                    fill="url(#a)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    transform="rotate(-90 109.76 94.368) scale(.26458)"
                                    d="M327.82 411.62v230.07h-19.043v2.777h67.258v-65.85h8.545v-5.552h-8.545v-3.702h-9.522v5.553h4.395v44.162h-37.961v-44.162h13.182v-5.553h-13.182V524.67h44.309v-5.552h-44.31v-107.5zm2.563 212.88h43.578v18.248h-43.578z"
                                    fill="url(#a)"
                                />
                                <path
                                    d="M107.63 151.62h-.484v1.47h1.582V94.244h2.455v-.734H86.734v8.046h1.356V94.98h19.281v42.366h-2.163v1.47h2.422zM115.77 93.516h4.199v3.044h-.679v-2.31h-3.52zM172.48 82.94l5.458-13.224.974.465-5.49 13.224zM181.52 63.394l2.512-6.84 1.556-4.184.938-2.48-1.007-.43-1.621 4.29-1.816 4.998-1.563 4.191zM150.1 48.245l-.258-.28h-2.681l-.29.28v6.437l.29.28h2.68l.259-.28zM146.87 56.397h3.23v1.47h-3.23zM146.87 59.336h3.23v1.434h-3.23zM150.1 62.239h-3.23v1.47h3.23zM150.1 65.178h-3.23v1.434h3.23zM150.1 68.082h-3.23v1.47h3.23zM87.833 28.549v-3.673h2.842v-.595h-2.842v-8.152h9.495v8.152h-2.874v.595h6.265v-.595h-2.842v-8.152h9.495v8.152h-2.874v.595h4.231v-8.747h38.142v8.747h3.23v-8.747h25.222v8.747h1.357v-8.747h21.089l-2.202 6.148.974.395 2.842-7.697H86.733v13.574zM109.83 47.791h-3.553v7.265h3.556zM194.02 29.529l-.974-.43-5 13.514 1 .455z"
                                    fill="url(#a)"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path
                                    d="M665.44 1019.8h.96v-8h-1.28v8z"
                                    transform="matrix(0 -.7402 .16287 0 31.84 580.588)"
                                    fill="url(#a)"
                                />
                                <path
                                    fill="url(#a)"
                                    d="M47.257 197.37h1.32v.313h-1.32zM47.257 202.87h1.32v1.066h-1.32zM110.33 182.55h-.23v-1.296h.369v1.296zM139.99 138.86v1.924l6.2.035v.91h2.097l.176-.56h-1.723v-.91h-6.007l.024-1.811z"
                                    transform="rotate(-90 109.76 94.368)"
                                />
                                <path d="M242.61 196.26h-14.029v.42h14.029z" fill="url(#a)" />
                                <path
                                    d="M130.08 1084v-64.16H128V1084z"
                                    transform="matrix(0 -.20185 .21865 0 -24.845 222.52)"
                                    fill="url(#a)"
                                />
                                <g strokeLinejoin="bevel" strokeMiterlimit={4.535}>
                                    <path
                                        d="m622.08 1128.2 17.28-39.2 17.12 7.52-17.28 39.2"
                                        strokeLinecap="round"
                                        transform="matrix(0 -.20185 .21865 0 -24.783 222.42)"
                                        fill="#fff"
                                        stroke="#636363"
                                        strokeWidth={0.505}
                                    />
                                    <path
                                        d="m662.91 1081.9 22.049 9.638-6.4 14.72-39.2-17.28 6.43-14.598"
                                        strokeLinecap="round"
                                        transform="matrix(0 -.20185 .21865 0 -13.02 227.21)"
                                        fill="#fff"
                                        stroke="#636363"
                                        strokeWidth={0.505}
                                    />
                                    {tables.map((table) => (
                                        <Table key={table.id} table={table} zoomScaleFactor={zoomScaleFactor} />
                                    ))}
                                </g>
                            </svg>
                        </UncontrolledReactSVGPanZoom>
                    </div>
                </div>
            )}
        </SizeMe>
    );
}

export { GroundPlan };
