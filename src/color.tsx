export class Color {
  private r_: number;
  private g_: number;
  private b_: number;
  private a_: number;

  private constructor(r: number, g: number, b: number, a: number) {
    this.r_ = r;
    this.g_ = g;
    this.b_ = b;
    this.a_ = a;
  }

  get r() {
    return this.r_;
  }
  get g() {
    return this.g_;
  }
  get b() {
    return this.b_;
  }
  get a() {
    return this.a_;
  }

  get luminance() {
    return 0.2126 * this.r_ + 0.7152 * this.g_ + 0.0722 * this.b_;
  }

  toRGBA() {
    return `rgba(${this.r_ * 255}, ${this.g_ * 255}, ${this.b_ * 255}, ${
      this.a_
    })`;
  }

  static fromRGB(rgb: { r: number; g: number; b: number }): Color;
  static fromRGB(r: number, g: number, b: number): Color;
  static fromRGB(
    rgbOrR: { r: number; g: number; b: number } | number,
    gOrNull: number = null,
    bOrNull: number = null
  ) {
    if (
      typeof rgbOrR === 'number' &&
      typeof gOrNull === 'number' &&
      typeof bOrNull === 'number'
    ) {
      const r = rgbOrR;
      const g = gOrNull;
      const b = bOrNull;
      return new Color(r, g, b, 1);
    }
    if (typeof rgbOrR === 'object') {
      const { r, g, b } = rgbOrR;
      return new Color(r, g, b, 1);
    }
    throw 'Invalid arguments';
  }

  static HSLtoRGB(h: number, s: number, l: number) {
    let r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r, g, b };
  }

  static fromHSL(h: number, s: number, l: number) {
    return Color.fromRGB(this.HSLtoRGB(h, s, l));
  }

  static WHITE = new Color(1, 1, 1, 1);
  static BLACK = new Color(0, 0, 0, 1);
}
