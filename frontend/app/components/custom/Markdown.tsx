import * as React from "react";
import type { RenderableTreeNodes } from "@markdoc/markdoc";

import pkg from "@markdoc/markdoc";
const { renderers, parse, transform } = pkg;

import { useState } from "react";

type CounterProps = {
  initialValue: number;
};

export function Counter({ initialValue }: CounterProps) {
  let [count, setCount] = useState(initialValue);
  return (
    <div>
      <output>{count}</output>
      <button onClick={() => setCount((current) => current + 1)} type="button">
        Increment
      </button>
      <button onClick={() => setCount((current) => current - 1)} type="button">
        Decrement
      </button>
    </div>
  );
}

export let scheme = {
  render: Counter.name,
  description: "Displays a counter with the initial value provided",
  children: [],
  attributes: {
    initialValue: {
      type: Number,
      default: 0,
    },
  },
};

// TODO: FIGURE OUT TYPES FOR MARKDOC


export function markdown(markdown: string, config: any): RenderableTreeNodes {
  return transform(parse(markdown, config));
}

export function Markdown({
  content,
  config = {},
}: {
  content: string;
  config?: any;
}) {
  return (
    <div className="rich-text">
      {renderers.react(markdown(content, config), React)}
    </div>
  );
}
