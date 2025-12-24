//Solution credit: tenthmascot (https://www.reddit.com/r/adventofcode/comments/1pk87hl/2025_day_10_part_2_bifurcate_your_way_to_victory/)
import fs from "fs";

function buildPatterns(coeffs: number[][]): Map<string, Map<string, number>> {
  const numButtons = coeffs.length;
  const numVars = coeffs[0].length;

  const out = new Map<string, Map<string, number>>();

  function parityKey(arr: number[]): string {
    return arr.map(v => v & 1).join(",");
  }

  function arrKey(arr: number[]): string {
    return arr.join(",");
  }

  for (let mask = 0; mask < (1 << numButtons); mask++) {
    const pattern = new Array<number>(numVars).fill(0);
    let cost = 0;

    for (let i = 0; i < numButtons; i++) {
      if ((mask >> i) & 1) {
        cost++;
        const b = coeffs[i];
        for (let j = 0; j < numVars; j++) {
          pattern[j] += b[j];
        }
      }
    }

    const pKey = parityKey(pattern);
    const patKey = arrKey(pattern);

    if (!out.has(pKey)) out.set(pKey, new Map());
    const m = out.get(pKey)!;

    if (!m.has(patKey) || m.get(patKey)! > cost) {
      m.set(patKey, cost);
    }
  }

  return out;
}

function solveSingle(coeffs: number[][], goal: number[]): number {
  const patternCosts = buildPatterns(coeffs);
  const memo = new Map<string, number>();

  function key(arr: number[]): string {
    return arr.join(",");
  }

  function solve(goal: number[]): number {
    const k = key(goal);
    if (memo.has(k)) return memo.get(k)!;

    if (goal.every(v => v === 0)) return 0;

    let best = Number.MAX_SAFE_INTEGER;
    const parity = goal.map(v => v & 1).join(",");
    const patterns = patternCosts.get(parity);
    if (!patterns) return best;

    for (const [pKey, cost] of patterns.entries()) {
      const pattern = pKey.split(",").map(Number);

      let ok = true;
      for (let i = 0; i < goal.length; i++) {
        if (pattern[i] > goal[i]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      const next = goal.map((v, i) => (v - pattern[i]) >> 1);
      best = Math.min(best, cost + 2 * solve(next));
    }

    memo.set(k, best);
    return best;
  }

  return solve(goal);
}

function main() {
  const raw = fs.readFileSync("../data/input10.txt", "utf8");
  const lines = raw.trim().split(/\r?\n/);

  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(" ");
    const goal = parts.at(-1)!.slice(1, -1).split(",").map(Number);

    const rawButtons = parts.slice(1, -1).map(p =>
      p.slice(1, -1).split(",").map(Number)
    );

    const coeffs = rawButtons.map(b =>
      Array.from({ length: goal.length }, (_, i) => b.includes(i) ? 1 : 0)
    );

    const ans = solveSingle(coeffs, goal);
    console.log(`Line ${i + 1}/${lines.length}: answer ${ans}`);
    total += ans;
  }

  console.log(total);
}

main();
