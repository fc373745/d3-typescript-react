import React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Rectangle from "../components/Shapes/Rectangle";
import Circle from "../components/Shapes/Circle";
import Line from "../components/Shapes/Line";
import Path from "../components/Shapes/Path";

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('bruh')}>Hello Button</Button>)
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));

storiesOf("Basic SVG Shapes", module)
    .add("Rectangle", () => <Rectangle />)
    .add("Circle", () => <Circle />)
    .add("Line", () => <Line />)
    .add("Path", () => <Path />);
