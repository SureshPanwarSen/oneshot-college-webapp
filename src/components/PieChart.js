import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import './App.css'
import Color from './color';

const Pie = props => {

    const [width] = useState(400);
    const [height] = useState(400);
    const [innerRadius] = useState(100);
    const [outerRadius] = useState(150);
    const [bgColor, setBgColor] = useState('')
    const [state, setState] = useState('')
    const [isState, setChartTypeState] = useState(true)
    const [course, setCourse] = useState('')

    /** Getting gradient colors by percentage of values */
    const gradientColors = [];

    for (let i = 0; i < props.data.length; i++) {
        const data = props.data[i];
        const color = Color.getColor(data.value);
        data.color = color;
        gradientColors.push(color);
    }

    const pieColors = gradientColors;

    const ref = useRef(null);

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);

    const createArc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const formatText = (str) => {
        const length = str.length;
        if (length > 10) {
            return str.substring(0, 9) + '..'
        } else {
            return str.substring(0, 10)
        }
    }

    useEffect(() => {
        setBgColor('#F2F4F6')
    }, [props.theme])

    useEffect(
        () => {
            const data = createPie(props.data);
            const group = d3.select(ref.current);

            const colors = d3.scaleOrdinal(pieColors);

            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc")
                .on("mouseover", function (event, d) {
                    d3.select("#tooltip")
                        .style("left", event.pageX + "px")
                        .style("top", event.pageY + "px")
                        .style("opacity", 1)
                        .select("#value")
                        .text(d.data.name + " - " + d.value);
                })
                .on("mouseout", function () {
                    d3.select("#tooltip")
                        .style("opacity", 0);
                    ;
                }).on('click', function (d, i) {
                    if (i.data.type === 'state') {
                        props.stateHandler(i.data);
                        setState(i.data);
                        setChartTypeState(true);
                    } else if (i.data.type === 'course') {
                        props.courseHandler(i.data);
                        setCourse(i.data);
                        setChartTypeState(false);
                    }
                });

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            path
                .attr("class", "arc")
                .attr("d", createArc)
                .attr("fill", (d, i) => colors(i));

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .style("fill", "#dddddd")
                .style("font-size", "0.8rem")
                .style("font-weight", 600)
                .style("width", "auto")
                .style("height", "auto")
                .text(d => formatText(d.value + '%'))
        },
        [props.data, pieColors]
    );

    return (
        <div className="themeColor" style={{ background: bgColor }}>
            <div className="container space center">
                <div className="content space">
                    <div> {isState && state.name ? `Selected State ${state.name}` : 'Click on Area of State to see list of colleges in the same state'}</div>
                    <div> {!isState && course.name ? `Selected Course ${course.name}` : 'Click on Area of Courses to see list of colleges offering the course'}</div>
                    <div id="tooltip" className="hidden">
                        <p><span id="value">100</span>%</p>
                    </div>
                </div>

                <div className="chart-center">
                    <svg width={width} height={height} viewBox={"0 0 300 300"} preserveAspectRatio={"xMinYMin meet"}>
                        <g
                            ref={ref}
                            transform={`translate(${outerRadius} ${outerRadius})`}
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Pie;