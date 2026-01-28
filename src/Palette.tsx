import React, { ChangeEvent, MouseEvent, Component } from 'react';
import { Color, RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE, stringToColor, COLORS, mix, unmix } from './paint';
import { PaintPot } from './PaintPot';

type PaletteProps = {
  // TODO: initialize with needed props
  inventory: number[];
  setInventory: (newInventory: number[]) => void;
  onBackClick: () => void;
};

type PaletteState = {
  // Currently selected first color to mix
  firstColor: string,
  // Currently selected second color to mix
  secondColor: string,

  // Displayed message if invalid mix is attempted
  err: string,

  // Quantities of each color of paint available
  //   colors are identified by their index in colors[]
  paintInventory: number[];
};


/** Palette component that displays a current palette of colors with mixing and unmixing. */
export class Palette extends Component<PaletteProps, PaletteState> {
  constructor(props: PaletteProps) {
    super(props);

    this.state = {
      firstColor: "",
      secondColor: "",
      err: "",
      paintInventory: [10, 0, 10, 0, 10, 0] // Initialized with some RYB for testing
    };
  }

  render = (): JSX.Element => {
    return <div>
      <h1>Palette</h1>

      <p>
        <label>Select first color:</label>
        <select value={this.state.firstColor} onChange={this.doFirstColorChange}>
          <option value="">(select a primary color)</option>
          {this.renderPrimaryOptions()}
        </select>
      </p>
      <p>
        <label>and second color:</label>
        <select value={this.state.secondColor} onChange={this.doSecondColorChange}>
          <option value="">(select a primary color)</option>
          {this.renderPrimaryOptions()}
        </select>
      </p>
      <button onClick={this.doMixClick}>Mix!</button>
      <button onClick={this.doUnMixClick}>Un-Mix All</button>
      <p className={"err"}>{this.state.err}</p>

      {this.renderPaints()}

      <br></br>
      <button onClick={this.doBackClick}>Back to Directory</button>
    </div>;
  };

  renderPaints = (): JSX.Element => {
    return <div className="paints">
      <PaintPot color={RED} size="s" selected={false}
        full={this.state.paintInventory[0] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[0]}

      <PaintPot color={ORANGE} size="s" selected={false}
        full={this.state.paintInventory[1] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[1]}

      <PaintPot color={YELLOW} size="s" selected={false}
        full={this.state.paintInventory[2] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[2]}

      <PaintPot color={GREEN} size="s" selected={false}
        full={this.state.paintInventory[3] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[3]}

      <PaintPot color={BLUE} size="s" selected={false}
        full={this.state.paintInventory[4] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[4]}

      <PaintPot color={PURPLE} size="s" selected={false}
        full={this.state.paintInventory[5] > 0}
        onPaintClick={this.doPaintChange}
      ></PaintPot>
      {this.state.paintInventory[5]}
    </div>
  }

  renderPrimaryOptions = (): Array<JSX.Element> => {
    return [
      <option key={RED} value={RED}>red</option>,
      <option key={YELLOW} value={YELLOW}>yellow</option>,
      <option key={BLUE} value={BLUE}>blue</option>
    ]
  }

  doPaintChange = (_color: Color): void => {
    // Clicking on paint should do nothing in this component
  }

  doFirstColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({firstColor: evt.target.value});
  }

  doSecondColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({secondColor: evt.target.value});
  }

  doMixClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.firstColor === this.state.secondColor) {
      this.setState({err: "Mixing the same color does nothing!"});
    } else {
      const c1: Color | undefined = stringToColor(this.state.firstColor);
      const c2: Color | undefined = stringToColor(this.state.secondColor);
      if (c1 === undefined || c2 === undefined) {
        this.setState({err: "Two colors must be selected to mix!"});
        return;
      }

      const colorIdx1: number = COLORS.indexOf(c1);
      const colorIdx2: number = COLORS.indexOf(c2);
      if (this.state.paintInventory[colorIdx1] === 0 || this.state.paintInventory[colorIdx2] === 0) {
        this.setState({err: `You do not have enough ${c1} or ${c2} to mix the two.`});
        return;
      }

      const newInventory = mix(this.state.paintInventory, c1, c2);

      this.setState({paintInventory: newInventory, err: ""});
    }
  }

  doUnMixClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.setState({paintInventory: unmix(this.state.paintInventory)});
  }

  doBackClick = (): void => {
    // TODO: fill this in to use callback passed from App
    this.props.setInventory(this.state.paintInventory);
    this.props.onBackClick();
  }

  componentDidMount = (): void => {
    this.setState({ paintInventory: this.props.inventory });
  };
}
