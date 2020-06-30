import React from 'react';

import InLineProgressBar from './inLineProgressBar';
import { withKnobs, text, number } from "@storybook/addon-knobs";

export default {
  title: 'Title|InLineProgressBar/folder',
  decorators: [withKnobs],
  component: InLineProgressBar,
};

export const RedProgressBar = () => <InLineProgressBar
  color={text('Color', 'red')}
  percentage={number('Percentage', 10)} />;
export const BlueProgressBar = () => <InLineProgressBar color="blue" percentage={60} />;

RedProgressBar.story = {
  name: 'Red',
};
