import React from 'react';
import {
  Box,
  BoxProps,
  useProps,
  factory,
  ElementProps,
  StylesApiProps,
  Factory,
} from '../../../core';
import { useTabsContext } from '../Tabs.context';
import classes from '../Tabs.module.css';

export type TabsListStylesNames = 'list';

export interface TabsListProps
  extends BoxProps,
    StylesApiProps<TabsListFactory>,
    ElementProps<'div'> {
  /** `Tabs.Tab` components */
  children: React.ReactNode;

  /** Determines whether tabs should take all available space, `false` by default */
  grow?: boolean;

  /** Tabs alignment, `flex-start` by default */
  justify?: React.CSSProperties['justifyContent'];
}

export type TabsListFactory = Factory<{
  props: TabsListProps;
  ref: HTMLDivElement;
  stylesNames: TabsListStylesNames;
  compound: true;
}>;

const defaultProps: Partial<TabsListProps> = {};

export const TabsList = factory<TabsListFactory>((_props, ref) => {
  const props = useProps('TabsList', defaultProps, _props);
  const { children, className, grow, justify, classNames, styles, style, ...others } = props;

  const ctx = useTabsContext();

  return (
    <Box
      {...others}
      {...ctx.getStyles('list', {
        className,
        style,
        classNames,
        styles,
        props,
        variant: ctx.variant,
      })}
      ref={ref}
      role="tablist"
      variant={ctx.variant}
      mod={{
        grow,
        orientation: ctx.orientation,
        placement: ctx.orientation === 'vertical' && ctx.placement,
        inverted: ctx.inverted,
      }}
      aria-orientation={ctx.orientation}
      __vars={{ '--tabs-justify': justify }}
    >
      {children}
    </Box>
  );
});

TabsList.classes = classes;
TabsList.displayName = '@mantine/core/TabsList';
