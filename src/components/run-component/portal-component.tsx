import React, { useState, useEffect } from "react";
import { createRoot, Root } from "react-dom/client";
import { createPortal } from "react-dom";
interface Options<State> {
  state?: State;
  render: (state?: State) => React.ReactElement;
  mountElement?: HTMLElement;
  callback?: () => void;
}

import RootContext from "@/stores/root-context";
import { root as rootStore } from "@/stores/root";
function PortalWrapper({
  children,
  container,
}: {
  children: React.ReactElement;
  container: HTMLElement;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>,
    container
  );
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const mountElement =
      this.options.mountElement ?? document.getElementById("portal-root");
    const container = document.createElement("div");

    container.className = "DynamicRenderingContainer";

    if (mountElement) {
      mountElement.appendChild(container);
    }

    this.container = container;

    this.root = createRoot(container);

    this.render();
  }

  private render(): void {
    const { render } = this.options;

    // React 18+ 特性
    this.root.render(
      <PortalWrapper container={this.container}>
        {render(this.state)}
      </PortalWrapper>
    );

    // React 17 特性
    // ReactDOM.render(render(this.state), this.container, callback);
  }
}
