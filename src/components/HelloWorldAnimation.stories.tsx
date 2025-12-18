import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HelloWorldAnimation, HelloWorldAnimationProps } from './HelloWorldAnimation';
import './helloWorldAnimation.css';

const meta: Meta<typeof HelloWorldAnimation> = {
  title: 'Components/HelloWorldAnimation',
  component: HelloWorldAnimation,
  argTypes: {
    text: { control: 'text' },
    durationMs: { control: { type: 'number', min: 0, step: 50 } },
    staggerMs: { control: { type: 'number', min: 0, step: 10 } },
    disableMotion: { control: 'boolean' },
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'p', 'span', 'div'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof HelloWorldAnimation>;

export const Default: Story = {
  args: {
    text: 'Hello, World!',
    durationMs: 800,
    staggerMs: 60,
    disableMotion: false,
    as: 'h1',
  } as HelloWorldAnimationProps,
};

export const SlowAndDramatic: Story = {
  args: {
    text: 'Hello, World!',
    durationMs: 1200,
    staggerMs: 90,
  },
};

export const MotionDisabled: Story = {
  args: {
    text: 'Hello, World!',
    disableMotion: true,
  },
};

