// Type definitions for fz-search v1.0.0
// TypeScript Version: 3.5.3

declare module 'fz-search' {
  export default class FuzzySearch<T> {
    public constructor(options: FuzzySearchOptions<T>);

    public search(pattern: string): T[];

    public highlight(value: string): string;
  }

  interface FuzzySearchOptions<T> {
    source: T[];
    keys: string;
    token_field_min_length: number;
    highlight_before: string;
    highlight_after: string;
    highlight_bridge_gap?: number;
  }
}
