import * as React from 'react';
import { WheelEntry, Wheel } from './wheel';
import { easeIn, clamp } from './utils';

export enum SpinnerMode {
  NONE,
  SPIN,
  FOCUS,
  UNFOCUS
}

interface SpinnerProps {
  entries: WheelEntry[];
  mode: SpinnerMode;
  duration: number;
  end: number;
  start: number;
  onAnimationEnd: (mode: SpinnerMode) => void;
}

interface SpinnerState {
  t: number;
}

export class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  static defaultProps = {
    mode: SpinnerMode.NONE,
    end: 0,
    start: 0,
    onAnimationEnd: () => {}
  };

  state = {
    t: 0
  };

  private startTime: number = null;

  private tick = (time: number) => {
    if (this.props.mode === SpinnerMode.NONE) return;

    if (this.startTime === null) {
      this.startTime = time;
    }
    const t = (time - this.startTime) / 1000;
    this.setState({ t });
    if (t < this.props.duration) {
      requestAnimationFrame(this.tick);
    } else {
      this.props.onAnimationEnd(this.props.mode);
    }
  };

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  componentDidUpdate(prevProps: SpinnerProps) {
    if (prevProps.mode != this.props.mode) {
      this.startTime = null;
      this.setState({ t: 0 });
      requestAnimationFrame(this.tick);
    }
  }

  render() {
    const { mode, entries, duration, start, end } = this.props;
    const { t } = this.state;

    const angularOffset =
      mode === SpinnerMode.SPIN ? easeIn(t, { duration, start, end }) : end;

    let tFocus = 0;
    if (mode === SpinnerMode.FOCUS) {
      tFocus = clamp(t / duration, 0, 1);
    }
    if (mode === SpinnerMode.UNFOCUS) {
      tFocus = easeIn(t / duration, { start: 1, end: 0 });
    }

    return (
      <div style={{ width: '100vw' }}>
        <Wheel
          entries={entries}
          angularOffset={angularOffset}
          tFocus={tFocus}
        />
      </div>
    );
  }
}

const ANIM_DURATION: { [mode: number]: number } = {
  [SpinnerMode.SPIN]: 5,
  [SpinnerMode.FOCUS]: 1,
  [SpinnerMode.UNFOCUS]: 0.5
};

interface SpinnerWithButtonState {
  spinning: boolean;
  displaying: boolean;
  mode: SpinnerMode;
  start: number;
  end: number;
}

interface SpinnerWithButtonProps {
  entries: WheelEntry[];
}

export class SpinnerWithButton extends React.Component<
  SpinnerWithButtonProps,
  SpinnerWithButtonState
> {
  state = {
    spinning: false,
    displaying: false,
    mode: SpinnerMode.NONE,
    start: 0,
    end: 0
  };

  private spin = () => {
    this.setState(prevState => {
      return {
        mode: SpinnerMode.SPIN,
        start: prevState.end % (2 * Math.PI),
        end: 2 * Math.PI * (3 * Math.random() + 7)
      };
    });
  };

  private onAnimationEnd = (mode: SpinnerMode) => {
    if (mode === SpinnerMode.UNFOCUS && this.state.spinning) {
      this.spin();
    }
    if (mode === SpinnerMode.SPIN && !this.state.displaying) {
      this.setState({
        spinning: false,
        displaying: true,
        mode: SpinnerMode.FOCUS
      });
    }
  };

  private onSpinClick = () => {
    if (this.state.displaying) {
      this.setState({
        spinning: true,
        displaying: false,
        mode: SpinnerMode.UNFOCUS
      });
    } else {
      this.setState({ spinning: true, displaying: false });
      this.spin();
    }
  };

  render() {
    return (
      <div className="spinner-with-button">
        <Spinner
          entries={this.props.entries}
          mode={this.state.mode}
          duration={ANIM_DURATION[this.state.mode]}
          start={this.state.start}
          end={this.state.end}
          onAnimationEnd={this.onAnimationEnd}
        />
        <div style={{ width: '100%', textAlign: 'center', marginTop: '50px' }}>
          <input
            type="button"
            onClick={this.onSpinClick}
            disabled={this.state.spinning}
            value="SPIN"
            style={{ width: 100 }}
          />
        </div>
      </div>
    );
  }
}
