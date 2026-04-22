import React from "react";
import { createRoot, Root } from "react-dom/client";
import RootContext from "@/stores/root-context";
import { root as rootStore } from "@/stores/root";

interface Options<State> {
  state?: State;
  render: (state?: State) => React.ReactElement;
  mountElement?: HTMLElement;
  callback?: () => void;
}

export default class RenderComponent<State> {
  state?: State;
  private readonly options: Options<State>;
  private container!: HTMLElement;
  private root!: Root;

  constructor(options: Options<State>) {
    this.options = options;
    this.state = options.state;
    this.init();
  }

  setState(state: Partial<State>): void {
    Object.assign(this.state as any, state);

    this.render();
  }

  unmount(): void {
    const { container } = this;
    const parent = container.parentNode;

    // React 17 特性
    // ReactDOM.unmountComponentAtNode(container);

    // React 18+ 特性
    this.root.unmount();

    if (parent) {
      parent.removeChild(container);
    }
  }

  private init(): void {
    const mountElement = this.options.mountElement ?? document.body;
    const container = document.createElement("div");

    container.className = "DynamicRenderingContainer";

    mountElement.appendChild(container);

    this.container = container;

    this.root = createRoot(container);

    this.render();
  }

  private render(): void {
    const { render } = this.options;

    // React 18+ 特性
    this.root.render(
      <RootContext.Provider value={rootStore}>{render(this.state)}</RootContext.Provider>
    );

    // React 17 特性
    // ReactDOM.render(render(this.state), this.container, callback);
  }
}
