import React from 'react';
import { MantineDemo } from '@mantine/ds';
import { Slider } from '@mantine/core';
import { SliderStylesApi } from '@mantine/styles-api';

const code = `
import { Slider } from '@mantine/core';

function Demo() {
  return <Slider{{props}} marks={[{ value: 20, label: '20%' }, { value: 80, label: '80%' }]} labelAlwaysOn />;
}
`;

function Demo(props: any) {
  return (
    <Slider
      marks={[
        { value: 20, label: '20%' },
        { value: 80, label: '80%' },
      ]}
      defaultValue={40}
      labelAlwaysOn
      {...props}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SliderStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
