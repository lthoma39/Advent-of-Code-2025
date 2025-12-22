import fs from "fs";

type Point = [col: number, row: number];
type Interval = [number, number];
type RowIntervals = Map<number, Interval[]>;
type RowCrossings = Map<number, number[]>;

function calculateArea(a: Point, b: Point): number {
  const width = Math.abs(a[0] - b[0]) + 1;
  const height = Math.abs(a[1] - b[1]) + 1;
  return width * height;
}

function addInterval(map: RowIntervals, row: number, l: number, r: number): void {
  if (!map.has(row)) map.set(row, []);
  if (l <= r) map.get(row)!.push([l, r]);
  else map.get(row)!.push([r, l]);
}

function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const out: Interval[] = [];
  let [cl, cr] = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const [l, r] = intervals[i];
    if (l <= cr + 1) cr = Math.max(cr, r);
    else {
      out.push([cl, cr]);
      cl = l; cr = r;
    }
  }
  out.push([cl, cr]);
  return out;
}

function unionRowIntervals(a: RowIntervals, b: RowIntervals): RowIntervals {
  const out: RowIntervals = new Map();

  for (const [row, ints] of a.entries()) out.set(row, ints.slice());
  for (const [row, ints] of b.entries()) {
    if (!out.has(row)) out.set(row, []);
    out.get(row)!.push(...ints);
  }

  for (const [row, ints] of out.entries()) {
    out.set(row, mergeIntervals(ints));
  }
  return out;
}

function buildBoundary(points: Point[]): RowIntervals {
  const rows: RowIntervals = new Map();
  const n = points.length;

  for (let i = 0; i < n; i++) {
    const [c1, r1] = points[i];
    const [c2, r2] = points[(i + 1) % n];

    if (r1 === r2) {
      const left = Math.min(c1, c2);
      const right = Math.max(c1, c2);
      addInterval(rows, r1, left, right);
    } else {
      const top = Math.min(r1, r2);
      const bottom = Math.max(r1, r2);
      for (let r = top; r <= bottom; r++) addInterval(rows, r, c1, c1);
    }
  }

  for (const [row, ints] of rows.entries()) rows.set(row, mergeIntervals(ints));
  return rows;
}

function buildCrossings(points: Point[]): RowCrossings {
  const crossings: RowCrossings = new Map();
  const n = points.length;

  for (let i = 0; i < n; i++) {
    const [c1, r1] = points[i];
    const [c2, r2] = points[(i + 1) % n];

    if (c1 === c2 && r1 !== r2) {
      const top = Math.min(r1, r2);
      const bottom = Math.max(r1, r2);
      for (let r = top; r < bottom; r++) {
        if (!crossings.has(r)) crossings.set(r, []);
        crossings.get(r)!.push(c1);
      }
    }
  }

  return crossings;
}

function fillInteriorFromCrossings(crossings: RowCrossings): RowIntervals {
  const interior: RowIntervals = new Map();

  for (const [row, xs] of crossings.entries()) {
    xs.sort((a, b) => a - b);

    const ints: Interval[] = [];
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const left = xs[i];
      const right = xs[i + 1];
      ints.push([Math.min(left, right), Math.max(left, right)]);
    }

    interior.set(row, mergeIntervals(ints));
  }

  return interior;
}

function isValidRect(p1: Point, p2: Point, allowed: RowIntervals): boolean {
  const left = Math.min(p1[0], p2[0]);
  const right = Math.max(p1[0], p2[0]);
  const top = Math.min(p1[1], p2[1]);
  const bottom = Math.max(p1[1], p2[1]);

  for (let row = top; row <= bottom; row++) {
    const intervals = allowed.get(row);
    if (!intervals) return false;

    let ok = false;
    for (const [l, r] of intervals) {
      if (l <= left && right <= r) { ok = true; break; }
    }
    if (!ok) return false;
  }

  return true;
}

function main(): void {
  const data = fs.readFileSync("../data/input9.txt", "utf8").trim().split(/\r?\n/);
  const points: Point[] = data.map(line => line.split(",").map(Number) as Point);

  const boundary = buildBoundary(points);
  const crossings = buildCrossings(points);
  const interior = fillInteriorFromCrossings(crossings);
  const allowed = unionRowIntervals(boundary, interior);

  let result = 0;

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const area = calculateArea(points[i], points[j]);
      if (area <= result) continue;
      if (!isValidRect(points[i], points[j], allowed)) continue;
      result = area;
    }
  }

  console.log(result);
}

main();
