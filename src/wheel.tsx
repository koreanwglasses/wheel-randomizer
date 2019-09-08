import * as React from 'react';
import { Color } from './color';
import { sum, cumsum, lnnr, easeIn, lerp, clamp } from './utils';

interface WheelSliceProps {
  label: string;
  relativeWeight: number;
  backgroundColor: Color;
  angularOffset: number;
  radius: number;
  left: number;
  top: number;
  tFill: number;
}

class WheelSlice extends React.Component<WheelSliceProps> {
  static defaultProps = {
    left: 0,
    top: 0,
    tFill: 0
  };

  render() {
    const {
      label,
      relativeWeight,
      backgroundColor,
      angularOffset,
      radius,
      left,
      top,
      tFill
    } = this.props;

    const textColor =
      backgroundColor.luminance > 0.8 ? Color.BLACK : Color.WHITE;

    const angle = lerp(2 * Math.PI * relativeWeight, 1.5 * Math.PI, tFill);

    return (
      <div
        style={{
          width: 2 * radius + 'px',
          height: 2 * radius + 'px',
          position: 'absolute',
          left,
          top,
          lineHeight: 2 * radius + 'px',
          fontSize: 15 * (1 + tFill),
          color: textColor.toRGBA(),
          background: `conic-gradient(from ${-0.5 * Math.PI -
            angle / 2}rad at ${50 +
            50 *
              tFill}% 50%, ${backgroundColor.toRGBA()} ${angle}rad, transparent ${angle}rad)`,
          transform: `rotate(${angularOffset}rad)`,
          borderRadius: 50 * (1 - tFill) + '%',
          zIndex: tFill > 0 ? 1 : 'auto'
        }}
      >
        <span style={{ paddingLeft: 10 * (1 + tFill) }}>{label}</span>
      </div>
    );
  }
}

export interface WheelEntry {
  label: string;
  weight: number;
}

export const WheelColorSchemes = {
  DEFAULT: (i: number) => Color.fromHSL(0.3 + ((1.618034 * i) % 1), 0.8, 0.8)
};

interface WheelProps {
  entries: WheelEntry[];
  colorscheme: Color[] | ((index: number) => Color);
  angularOffset: number;
  tFocus: number;
}

export class Wheel extends React.Component<WheelProps> {
  private colors: Color[] = [];
  private wheel = React.createRef<HTMLDivElement>();

  static defaultProps = {
    colorscheme: WheelColorSchemes.DEFAULT,
    angularOffset: 0,
    tFocus: 0
  };

  render() {
    const { entries, colorscheme, angularOffset, tFocus } = this.props;
    const weightSum = sum(entries.map(entry => entry.weight));
    const relativeWeights = entries.map(entry => entry.weight / weightSum);

    const angularOffsets = [0];
    for (let i = 0; i < entries.length - 1; i++) {
      angularOffsets.push(
        angularOffsets[i] +
          Math.PI * (relativeWeights[i] + relativeWeights[i + 1])
      );
    }

    const pointedIndex = cumsum(relativeWeights)
      .map(
        x =>
          x >= lnnr(-angularOffset / (2 * Math.PI) + relativeWeights[0] / 2, 1)
      )
      .indexOf(true);

    const animatedAngularOffset = easeIn(tFocus, {
      duration: 1,
      start:
        lnnr(angularOffset - Math.PI * relativeWeights[0], 2 * Math.PI) +
        Math.PI * relativeWeights[0],
      end: 2 * Math.PI - angularOffsets[pointedIndex]
    });

    while (this.colors.length < entries.length) {
      const i = this.colors.length;
      this.colors[i] = Array.isArray(colorscheme)
        ? colorscheme[i]
        : colorscheme(i);
    }

    return (
      <div
        style={{
          width: 410,
          height: 400,
          position: 'relative',
          overflow: 'hidden',
          left: 'calc(50% - 210px)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 182,
            fontSize: 20,
            opacity: 1 - tFocus
          }}
        >
          —
        </div>

        <div
          ref={this.wheel}
          style={{
            width: 400,
            height: 400,
            position: 'relative',
            left: 10,
            transform: `rotate(${animatedAngularOffset}rad)`
          }}
        >
          {entries.map((entry, i) => (
            <WheelSlice
              label={entry.label}
              relativeWeight={relativeWeights[i]}
              backgroundColor={this.colors[i]}
              angularOffset={angularOffsets[i]}
              radius={200}
              key={i}
              top={0}
              tFill={i == pointedIndex ? tFocus : 0}
            />
          ))}
        </div>
      </div>
    );
  }
}
