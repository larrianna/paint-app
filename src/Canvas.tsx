import React, { Component, MouseEvent } from 'react';
import { Color, Dot, RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, COLORS } from './paint';
import { PaintPot } from './PaintPot';

// TODO (Task 7c): update component to preserve drawn dots on exit + reopen

// Circle radius for rendered dots
const RADIUS: number = 5;

type CanvasProps = {
  // TODO: initialize with needed props
  inventory: number[];
  setInventory: (newInventory: number[]) => void;
  drawnDots: Dot[];
  setDrawnDots: (dots: Dot[]) => void;
  onBackClick: () => void;
};

type CanvasState = {
  // Currently selected color for drawing
  currColor: Color | undefined,

  // All dots displayed on the canvas
  dots: Dot[];

  // Quantities of each color of paint available
  //   colors are identified by their index in COLORS[]
  paintInventory: number[];
};


/** Canvas component that displays a blank canvas with editing. */
export class Canvas extends Component<CanvasProps, CanvasState> {
  constructor(props: CanvasProps) {
    super(props);

    this.state = {
      currColor: undefined,
      dots: [],
      paintInventory: [10, 10, 10, 10, 10, 10]
    };
  }

  render = (): JSX.Element => {
    return <div>
      <h1>Canvas</h1>
      {this.renderPaints()}

      <svg id="svg" width="600" height="600" viewBox="0 0 600 600" onClick={this.doCanvasClick}>
        {this.renderDots()}
      </svg>

      <br></br>
      <button onClick={this.doBackClick}>Back to Directory</button>
    </div>;
  };

  renderPaints = (): JSX.Element => {
    return <div className="paints">
      <PaintPot color={RED} size="s"
        full={this.state.paintInventory[0] >= 1}
        selected={this.state.currColor === RED}
        onPaintClick={this.doPaintChange}
      ></PaintPot>

      <PaintPot color={ORANGE} size="s"
        full={this.state.paintInventory[1] >= 1}
        selected={this.state.currColor === ORANGE}
        onPaintClick={this.doPaintChange}
      ></PaintPot>

      <PaintPot color={YELLOW} size="s"
        full={this.state.paintInventory[2] >= 1}
        selected={this.state.currColor === YELLOW}
        onPaintClick={this.doPaintChange}
      ></PaintPot>

      <PaintPot color={GREEN} size="s"
        full={this.state.paintInventory[3] >= 1}
        selected={this.state.currColor === GREEN}
        onPaintClick={this.doPaintChange}
      ></PaintPot>

      <PaintPot color={BLUE} size="s"
        full={this.state.paintInventory[4] >= 1}
        selected={this.state.currColor === BLUE}
        onPaintClick={this.doPaintChange}
      ></PaintPot>

      <PaintPot color={PURPLE} size="s"
        full={this.state.paintInventory[5] >= 1}
        selected={this.state.currColor === PURPLE}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
    </div>
  }

  /** Returns SVG circle elements for each drawn dot */
  renderDots = (): JSX.Element[] => {
    const circles: JSX.Element[] = [];
    for (const [i, dot] of this.state.dots.entries()) {
      circles.push(<circle key={i} cx={dot.x} cy={dot.y} fill={dot.color} r={RADIUS}/>);
    }
    return circles;
  };

  doCanvasClick = (evt: MouseEvent<SVGElement>): void => {
    // Only add a dot if there is a color selected
    if (this.state.currColor !== undefined) {
      const currColorIdx = COLORS.indexOf(this.state.currColor);

      // and there is paint remaining in that color
      if (this.state.paintInventory[currColorIdx] >= 1) {
        // (x, y) point of click relative to canvas
        const x = evt.clientX - 28;
        const y = evt.clientY - 152;

        const dots = this.state.dots.concat([
          {x: x, y: y, color: this.state.currColor}
        ]);

        const newPaintAmt = this.state.paintInventory[currColorIdx] - 1;

        const newPaintInventory =
          this.state.paintInventory.slice(0, currColorIdx)
          .concat([newPaintAmt])
          .concat(this.state.paintInventory.slice(currColorIdx + 1));

        if (newPaintAmt === 0) {
          this.setState({dots: dots, paintInventory: newPaintInventory, currColor: undefined});
        } else {
          this.setState({dots: dots, paintInventory: newPaintInventory});
        }
      }
    }
  }

  doPaintChange = (color: Color): void => {
    // Only allow color to be selected if there is remaining paint
    const colorIdx = COLORS.indexOf(color);
    if (this.state.paintInventory[colorIdx] >= 1) {
      this.setState({currColor: color});
    }
  }

  doBackClick = (): void => {
    // TODO: fill this in to use callback passed from App
    this.props.setDrawnDots(this.state.dots);
    this.props.setInventory(this.state.paintInventory);
    this.props.onBackClick();
  }

  componentDidMount = (): void => {
    this.setState({ dots: this.props.drawnDots });
  };
}
