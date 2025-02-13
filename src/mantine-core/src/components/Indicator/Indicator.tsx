import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  createVarsResolver,
  Factory,
  MantineRadius,
  MantineColor,
  getThemeColor,
  rem,
  getRadius,
} from '../../core';
import { getPositionVariables } from './get-position-variables/get-position-variables';
import { IndicatorPosition } from './Indicator.types';
import classes from './Indicator.module.css';

export type IndicatorPositionVariables =
  | '--indicator-top'
  | '--indicator-bottom'
  | '--indicator-left'
  | '--indicator-right'
  | '--indicator-translate-x'
  | '--indicator-translate-y';

export type IndicatorStylesNames = 'root' | 'indicator';
export type IndicatorCssVariables = {
  root:
    | '--indicator-color'
    | '--indicator-size'
    | '--indicator-radius'
    | '--indicator-z-index'
    | IndicatorPositionVariables;
};

export interface IndicatorProps
  extends BoxProps,
    StylesApiProps<IndicatorFactory>,
    ElementProps<'div'> {
  /** Indicator position relative to the target element, `'top-end'` by default */
  position?: IndicatorPosition;

  /** Indicator offset relative to the target element, usually used for elements with border-radius, equals to `size` by default */
  offset?: number;

  /** Determines whether the indicator container should be an inline element, `false` by default */
  inline?: boolean;

  /** Indicator width and height, `10` by default */
  size?: number | string;

  /** Label rendered inside the indicator, for example, notification count */
  label?: React.ReactNode;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, `100` by default */
  radius?: MantineRadius | (string & {}) | number;

  /** Key of `theme.colors` or any valid CSS color value, `theme.primaryColor` by default */
  color?: MantineColor;

  /** Determines whether the indicator should have a border (color of the border is the same as the body element), `false` by default */
  withBorder?: boolean;

  /** When Indicator is disabled it renders children only */
  disabled?: boolean;

  /** Determines whether the indicator should have processing animation, `false` by default */
  processing?: boolean;

  /** Indicator z-index, `200` by default */
  zIndex?: React.CSSProperties['zIndex'];
}

export type IndicatorFactory = Factory<{
  props: IndicatorProps;
  ref: HTMLDivElement;
  stylesNames: IndicatorStylesNames;
  vars: IndicatorCssVariables;
}>;

const defaultProps: Partial<IndicatorProps> = {
  position: 'top-end',
  offset: 0,
  inline: false,
  withBorder: false,
  disabled: false,
  processing: false,
  size: 10,
};

const varsResolver = createVarsResolver<IndicatorFactory>(
  (theme, { color, position, offset, size, radius, zIndex }) => ({
    root: {
      '--indicator-color': getThemeColor(color, theme),
      '--indicator-size': rem(size),
      '--indicator-radius': typeof radius !== 'undefined' ? getRadius(radius) : undefined,
      '--indicator-z-index': zIndex?.toString(),
      ...getPositionVariables(position, offset),
    },
  })
);

export const Indicator = factory<IndicatorFactory>((_props, ref) => {
  const props = useProps('Indicator', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    position,
    offset,
    inline,
    label,
    radius,
    color,
    withBorder,
    disabled,
    processing,
    zIndex,
    ...others
  } = props;

  const getStyles = useStyles<IndicatorFactory>({
    name: 'Indicator',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  return (
    <Box ref={ref} {...getStyles('root')} mod={{ inline }} {...others}>
      {!disabled && (
        <>
          <Box
            mod={{ 'with-label': !!label, 'with-border': withBorder, processing }}
            {...getStyles('indicator')}
          >
            {label}
          </Box>
        </>
      )}
      {children}
    </Box>
  );
});

Indicator.classes = classes;
Indicator.displayName = '@mantine/core/Indicator';
