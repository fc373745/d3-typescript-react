import React from "react";

import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Rectangle from "../components/Shapes/Rectangle";
import Circle from "../components/Shapes/Circle";
import Line from "../components/Shapes/Line";
import Path from "../components/Shapes/Path";
import Select from "../components/D3Basics/Select";
import Text from "../components/D3Basics/Text";
import Group from "../components/D3Basics/Group";
import DataJoin from "../components/Data/DataJoin";
import MultipleJoins from "../components/Data/MultipleJoins";
import Enter from "../components/Data/Enter";
import Json from "../components/Data/Json";
import LinearScale from "../components/BarCharts/LinearScale";

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

storiesOf("D3 Selections", module)
    .add("Select", () => <Select />)
    .add("Text", () => <Text />)
    .add("Group", () => <Group />);

storiesOf("Data", module)
    .add("Data Join", () => (
        <DataJoin data={{ width: 100, height: 150, fill: "blue" }} />
    ))
    .add("selectAll Joins", () => <MultipleJoins />)
    .add("Enter", () => <Enter />)
    .add("Json fetch", () => <Json />);

storiesOf("Bar Chart", module).add("Linear Scale", () => <LinearScale />);
