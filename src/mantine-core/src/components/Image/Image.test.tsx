import React from 'react';
import { render, tests, screen } from '@mantine/tests';
import { Image, ImageProps, ImageStylesNames } from './Image';

const defaultProps: ImageProps = {};

describe('@mantine/core/Image', () => {
  tests.itSupportsSystemProps<ImageProps, ImageStylesNames>({
    component: Image,
    props: defaultProps,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/Image',
    stylesApiSelectors: ['root'],
  });

  it('sets data-fallback attribute if image cannot be loaded', () => {
    const { rerender } = render(<Image src={null} fallbackSrc="test" />);
    expect(screen.getByRole('img')).toHaveAttribute('data-fallback', 'true');

    rerender(<Image src="test" fallbackSrc="test" />);
    expect(screen.getByRole('img')).not.toHaveAttribute('data-fallback');
  });
});
