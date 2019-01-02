import React from 'react';

import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ButtonTest from '../components/ButtonTest'
import Rectangle from '../components/Shapes/Rectangle'
import Circle from '../components/Shapes/Circle'

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

storiesOf('Button Test', module)
  .add('without props', ()=> <ButtonTest></ButtonTest>)
  .add('with props', ()=> <ButtonTest text="with the text buddy boy"></ButtonTest>)

storiesOf('Shapes SVG Test', module)
  .add('Rectangle', ()=><Rectangle></Rectangle>)
  .add('Circle', ()=><Circle></Circle>)
