namespace pxsim.visuals {
    const WIRE_WIDTH = PIN_DIST / 2.5;
    export const WIRES_CSS = `
        .sim-bb-wire {
            fill:none;
            stroke-linecap: round;
            stroke-width:${WIRE_WIDTH}px;
            pointer-events: none;
        }
        .sim-bb-wire-end {
            stroke:#333;
            fill:#333;
        }
        .sim-bb-wire-hover {
            stroke-width: ${WIRE_WIDTH}px;
            visibility: hidden;
            stroke-dasharray: ${PIN_DIST / 10.0},${PIN_DIST / 1.5};
            /*stroke-opacity: 0.4;*/
        }
        .grayed .sim-bb-wire-end:not(.notgrayed) {
            stroke: #777;
        }
        .grayed .sim-bb-wire:not(.notgrayed) {
            stroke: #CCC;
        }
        .sim-bb-wire-ends-g:hover .sim-bb-wire-end {
            stroke: red;
        }
        `;


    let nextWireId = 0; //TODO remove

    //TODO: make this stupid class obsolete
    export class WireFactory {
        private underboard: SVGGElement;
        private overboard: SVGGElement;
        private boardEdges: number[];
        public styleEl: SVGStyleElement;

        constructor(underboard: SVGGElement, overboard: SVGGElement, boardEdges: number[], styleEl: SVGStyleElement) {
            this.styleEl = styleEl;
            this.styleEl.textContent += WIRES_CSS;
            this.underboard = underboard;
            this.overboard = overboard;
            this.boardEdges = boardEdges;
        }

        private indexOfMin(vs: number[]): number {
            let minIdx = 0;
            let min = vs[0];
            for (let i = 1; i < vs.length; i++) {
                if (vs[i] < min) {
                    min = vs[i];
                    minIdx = i;
                }
            }
            return minIdx;
        }
        private closestEdgeIdx(p: [number, number]): number {
            let dists = this.boardEdges.map(e => Math.abs(p[1] - e));
            let edgeIdx = this.indexOfMin(dists);
            return edgeIdx;
        }
        private closestEdge(p: [number, number]): number {
            return this.boardEdges[this.closestEdgeIdx(p)];
        }

        // wires
        private mkCurvedWireSeg = (p1: [number, number], p2: [number, number], clr: string): SVGPathElement => {
            const coordStr = (xy: [number, number]): string => {return `${xy[0]}, ${xy[1]}`};
            let c1: [number, number] = [p1[0], p2[1]];
            let c2: [number, number] = [p2[0], p1[1]];
            let w = <SVGPathElement>svg.mkPath("sim-bb-wire", `M${coordStr(p1)} C${coordStr(c1)} ${coordStr(c2)} ${coordStr(p2)}`);
            if (clr in WIRE_COLOR_MAP) {
                svg.addClass(w, `wire-stroke-${clr}`);
            } else {
                (<any>w).style["stroke"] = clr;
            }
            return w;
        }
        private mkWireSeg = (p1: [number, number], p2: [number, number], clr: string): SVGPathElement => {
            const coordStr = (xy: [number, number]): string => {return `${xy[0]}, ${xy[1]}`};
            let w = <SVGPathElement>svg.mkPath("sim-bb-wire", `M${coordStr(p1)} L${coordStr(p2)}`);
            if (clr in WIRE_COLOR_MAP) {
                svg.addClass(w, `wire-stroke-${clr}`);
            } else {
                (<any>w).style["stroke"] = clr;
            }
            return w;
        }
        private mkWireEnd = (p: [number, number], clr: string): SVGElement => {
            const endW = PIN_DIST / 4;
            let w = svg.elt("circle");
            let x = p[0];
            let y = p[1];
            let r = WIRE_WIDTH / 2 + endW / 2;
            svg.hydrate(w, {cx: x, cy: y, r: r, class: "sim-bb-wire-end"});
            if (clr in WIRE_COLOR_MAP) {
                svg.addClass(w, `wire-fill-${clr}`);
            } else {
                (<any>w).style["fill"] = clr;
            }
            (<any>w).style["stroke-width"] = `${endW}px`;
            return w;
        }
        public drawWire(pin1: Coord, pin2: Coord, clr: string): {endG: SVGGElement, end1: SVGElement, end2: SVGElement, wires: SVGElement[]} {
            let wires: SVGElement[] = [];
            let g = svg.child(this.overboard, "g", {class: "sim-bb-wire-group"});
            const closestPointOffBoard = (p: [number, number]): [number, number] => {
                const offset = PIN_DIST / 2;
                let e = this.closestEdge(p);
                let y: number;
                if (e - p[1] < 0)
                    y = e - offset;
                else
                    y = e + offset;
                return [p[0], y];
            }
            let wireId = nextWireId++;
            let end1 = this.mkWireEnd(pin1, clr);
            let end2 = this.mkWireEnd(pin2, clr);
            let endG = <SVGGElement>svg.child(g, "g", {class: "sim-bb-wire-ends-g"});
            endG.appendChild(end1);
            endG.appendChild(end2);
            let edgeIdx1 = this.closestEdgeIdx(pin1);
            let edgeIdx2 = this.closestEdgeIdx(pin2);
            if (edgeIdx1 == edgeIdx2) {
                let seg = this.mkWireSeg(pin1, pin2, clr);
                g.appendChild(seg);
                wires.push(seg);
            } else {
                let offP1 = closestPointOffBoard(pin1);
                let offP2 = closestPointOffBoard(pin2);
                let offSeg1 = this.mkWireSeg(pin1, offP1, clr);
                let offSeg2 = this.mkWireSeg(pin2, offP2, clr);
                let midSeg: SVGElement;
                let midSegHover: SVGElement;
                let isBetweenMiddleTwoEdges = (edgeIdx1 == 1 || edgeIdx1 == 2) && (edgeIdx2 == 1 || edgeIdx2 == 2);
                if (isBetweenMiddleTwoEdges) {
                    midSeg = this.mkCurvedWireSeg(offP1, offP2, clr);
                    midSegHover = this. mkCurvedWireSeg(offP1, offP2, clr);
                } else {
                    midSeg = this.mkWireSeg(offP1, offP2, clr);
                    midSegHover = this.mkWireSeg(offP1, offP2, clr);
                }
                svg.addClass(midSegHover, "sim-bb-wire-hover");
                g.appendChild(offSeg1);
                wires.push(offSeg1);
                g.appendChild(offSeg2);
                wires.push(offSeg2);
                this.underboard.appendChild(midSeg);
                wires.push(midSeg);
                g.appendChild(midSegHover);
                wires.push(midSegHover);
                //set hover mechanism
                let wireIdClass = `sim-bb-wire-id-${wireId}`;
                const setId = (e: SVGElement) => svg.addClass(e, wireIdClass);
                setId(endG);
                setId(midSegHover);
                this.styleEl.textContent += `
                    .${wireIdClass}:hover ~ .${wireIdClass}.sim-bb-wire-hover {
                        visibility: visible;
                    }`
            }
            return {endG: endG, end1: end1, end2: end2, wires: wires};
        }
    }
}