import React, { Component } from 'react';
import "./app.css";
import { Store } from './Store';
import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { Dot } from './paint';


// TODO: define a "page" enum type for all of the possible app pages
type Page = { kind: "directory" } | { kind: "store" } | { kind: "palette" } | { kind: "canvas" };
const initialInventory: number[] = [0, 0, 0, 0, 0, 0];

type AppProps = {};  // no props

type AppState = {
  // TODO: create state to track page and any other data
  // that need to be communicated between components
  page: Page;
  paintColors: number[];  // ROYGBP
  dots: Dot[];
};


/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    // TODO: initialize state you create
    this.state = {
      page: { kind: 'directory' },
      paintColors: initialInventory,
      dots: [],
    };
  }

  render = (): JSX.Element => {
    // TODO: update to return the correct component depending on which
    // page the app should render

    const pageKind = this.state.page.kind;

    if (pageKind === "store") {
      return (
        <Store
        inventory={this.state.paintColors}
        setInventory={this.doInventoryChange}
        onBackClick={this.doDirectoryChange}
        />
      );
    } else if (pageKind === "palette") {
      return (
        <Palette
          inventory={this.state.paintColors}
          setInventory={this.doInventoryChange}
          onBackClick={this.doDirectoryChange}
        />
      );
    } else if (pageKind === "canvas") {
      return (
        <Canvas
          inventory={this.state.paintColors}
          setInventory={this.doInventoryChange}
          drawnDots={this.state.dots}
          setDrawnDots={this.doDotsChange}
          onBackClick={this.doDirectoryChange}
        />
      );
    } else {
      return this.renderDirectory();
    }
  };

  renderDirectory = (): JSX.Element => {
    // TODO: add onClick properties to each of these <a> links
    // that cause the App to switch to the appropriate page view
    return <div>
      <h1>Directory</h1>
      <p><a href="#" onClick={() => this.setPage({ kind: "store" })}>Paint Store</a></p>
      <p><a href="#" onClick={() => this.setPage({ kind: "palette" })}>Paint Mixing Palette</a></p>
      <p><a href="#" onClick={() => this.setPage({ kind: "canvas" })}>Canvas</a></p>
    </div>;
  }

  // TODO: create onBackClick handler functions for each of <Store> <Canvas> and <Palette>
  // - switch the page view to go 'back'
  // - store any needed information from components in App state

  // Method to change pages
  setPage = (page: Page): void => {
    this.setState({ page });
  };

  // Navigation handlers
  doDirectoryChange = (): void => {
    this.setPage({ kind: 'directory' });
  };

  // Method to update inventory
  doInventoryChange = (newInventory: number[]): void => {
    this.setState({ paintColors: newInventory });
  };

  // Method to update drawn dots
  doDotsChange = (newDots: Dot[]): void => {
    this.setState({ dots: newDots });
  };
}