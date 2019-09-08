export const sum = (arr: any[]) => arr.reduce((a, b) => a + b, 0);
export const cumsum = (arr: number[]) => {
  const result = [0];
  for (let i = 0; i < arr.length; i++) {
    result[i + 1] = result[i] + arr[i];
  }
  return result.slice(1);
};

export const clamp = (x: number, min: number, max: number) =>
  Math.max(min, Math.min(max, x));
export const easeIn = (
  t: number,
  params: {
    duration?: number;
    start?: number;
    end?: number;
    degree?: number;
  } = {}
) => {
  const { duration = 1, start = 0, end = 1, degree = 5 } = params;
  const t_ = clamp(t, 0, duration);
  return (end - start) * (1 - Math.pow(1 - t_ / duration, degree)) + start;
};

export const lnnr = (x: number, m: number) => (x < 0 ? (x % m) + m : x % m);

export const lerp = (start: number, end: number, t: number) => {
  const t_ = clamp(t, 0, 1);
  return start * (1 - t_) + end * t_;
};
