import * as React from 'react';
import { WheelEntry, Wheel } from './wheel';
import { easeIn, clamp } from './utils';

interface SpinnerProps {
  entries: WheelEntry[];
  duration: number;
  target: number;
  onFinish: () => void;
}

interface SpinnerState {
  t: number;
}

const FOCUS_DURATION = 1;

export class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  static defaultProps = {
    onFinish() {}
  };

  state = {
    t: 0
  };

  private tick = () => {
    this.setState(prevState => {
      if (prevState.t + 1.0 / 60 < this.props.duration + FOCUS_DURATION) {
        requestAnimationFrame(this.tick);
      }
      return {
        t: prevState.t + 1.0 / 60
      };
    });
  };

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  render() {
    const { entries, duration, target } = this.props;
    const { t } = this.state;

    const angularOffset = easeIn({ duration, end: target }, t);
    const tFocus = clamp((t - duration) / FOCUS_DURATION, 0, 1);

    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: 80,
            top: 285,
            fontSize: 20,
            opacity: 1 - tFocus
          }}
        >
          —
        </div>
        <Wheel
          entries={entries}
          angularOffset={angularOffset}
          tFocus={tFocus}
        />
      </>
    );
  }
}

interface SpinnerWithButtonState {
  spinning: boolean;
  target: number;
}

interface SpinnerWithButtonProps {
  entries: WheelEntry[];
  duration: number;
}

export class SpinnerWithButton extends React.Component<
  SpinnerWithButtonProps,
  SpinnerWithButtonState
> {
  state = {
    spinning: false,
    target: 0
  };

  private spin = () => {
    this.setState({
      spinning: true,
      target: 2 * Math.PI * (3 * Math.random() + 7)
    });
  };

  render() {
    return (
      <>
        {this.state.spinning && (
          <Spinner
            entries={this.props.entries}
            duration={this.props.duration}
            target={this.state.target}
          />
        )}
        {!this.state.spinning && <Wheel entries={this.props.entries} />}
        <input
          type="button"
          onClick={this.spin}
          disabled={this.state.spinning}
          value="SPIN"
          style={{ width: 100, position: 'absolute', left: 250, top: 550 }}
        />
      </>
    );
  }
}
