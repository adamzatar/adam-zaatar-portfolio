"use client";

import { useMemo, useState } from "react";

import {
  createPagerSimulation,
  pagerPresets,
  PagerPresetId,
  PagerSimulationState,
  runPagerTrace,
  stepPagerSimulation,
} from "@/lib/demos/pagerSimulation";

function pageTone(resident: boolean, dirty: boolean) {
  if (resident && dirty) return "border-primary/35 bg-primary/10 text-text";
  if (resident) return "border-primary/25 bg-bg text-text";
  return "border-border bg-surface text-muted";
}

function bit(value: boolean) {
  return value ? "1" : "0";
}

export default function PagerDemo() {
  const [state, setState] = useState(() => createPagerSimulation());
  const preset = useMemo(
    () => pagerPresets.find((item) => item.id === state.presetId) ?? pagerPresets[0],
    [state.presetId]
  );
  const nextAccess = preset.accesses[state.accessIndex];

  function reset(presetId: PagerPresetId = state.presetId) {
    setState(createPagerSimulation(presetId));
  }

  function apply(update: (current: PagerSimulationState) => PagerSimulationState) {
    setState((current) => update(current));
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <section className="space-y-5">
          <div>
            <label htmlFor="pager-preset" className="text-sm font-semibold text-text">
              Preset
            </label>
            <select
              id="pager-preset"
              value={state.presetId}
              onChange={(event) => reset(event.target.value as PagerPresetId)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            >
              {pagerPresets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {preset.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => apply(stepPagerSimulation)}
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => apply(stepPagerSimulation)}
              className="link-plain rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Step
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="link-plain rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => apply(runPagerTrace)}
              className="link-plain rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50"
            >
              Run Trace
            </button>
          </div>

          <article className="rounded-xl border border-border bg-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Next access
            </p>
            <p className="mt-2 text-sm text-text">
              {nextAccess ? `${nextAccess.mode.toUpperCase()} ${nextAccess.pageId}` : "Trace complete"}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs text-muted">Hits</p>
                <p className="text-lg font-semibold text-text">{state.hits}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs text-muted">Faults</p>
                <p className="text-lg font-semibold text-text">{state.faults}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs text-muted">Evictions</p>
                <p className="text-lg font-semibold text-text">{state.evictions}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl border border-border bg-bg p-4">
              <h3 className="text-sm font-semibold text-text">Physical frames</h3>
              <div className="mt-3 grid gap-3">
                {state.frames.map((frame) => (
                  <div
                    key={frame.id}
                    className={`rounded-lg border px-3 py-3 text-sm ${
                      frame.id === state.clockHand
                        ? "border-primary/35 bg-primary/10 text-text"
                        : "border-border bg-surface text-muted"
                    }`}
                  >
                    <span className="font-semibold text-text">F{frame.id}</span>{" "}
                    {frame.pageId ? `holds ${frame.pageId}` : "empty"}
                    {frame.id === state.clockHand ? (
                      <span className="ml-2 text-xs font-medium text-muted">clock hand</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-border bg-bg p-4">
              <h3 className="text-sm font-semibold text-text">Virtual pages</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {Object.values(state.pages).map((page) => (
                  <div
                    key={page.id}
                    className={`rounded-lg border px-3 py-3 text-sm ${pageTone(
                      page.resident,
                      page.dirty
                    )}`}
                  >
                    <p className="font-semibold text-text">{page.id}</p>
                    <p className="mt-1 text-xs">
                      {page.resident ? `resident in F${page.frameId}` : "not resident"}
                    </p>
                    <p className="mt-1 text-xs">
                      R:{bit(page.referenced)} D:{bit(page.dirty)} swap writes:{page.swapWrites}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <article className="overflow-hidden rounded-xl border border-border bg-bg">
            <div className="border-b border-border p-4">
              <h3 className="text-sm font-semibold text-text">Page table</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-muted">
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium">Page</th>
                    <th className="px-4 py-3 font-medium">Resident</th>
                    <th className="px-4 py-3 font-medium">Frame</th>
                    <th className="px-4 py-3 font-medium">Referenced</th>
                    <th className="px-4 py-3 font-medium">Dirty</th>
                    <th className="px-4 py-3 font-medium">Backing</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(state.pages).map((page) => (
                    <tr key={page.id} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-3 font-medium text-text">{page.id}</td>
                      <td className="px-4 py-3 text-muted">{page.resident ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 text-muted">
                        {page.frameId === null ? "None" : `F${page.frameId}`}
                      </td>
                      <td className="px-4 py-3 text-muted">{bit(page.referenced)}</td>
                      <td className="px-4 py-3 text-muted">{bit(page.dirty)}</td>
                      <td className="px-4 py-3 text-muted">swap</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-xl border border-border bg-bg p-4">
            <h3 className="text-sm font-semibold text-text">Trace log</h3>
            <ol className="mt-3 space-y-2" aria-live="polite">
              {state.trace.map((entry, index) => (
                <li key={`${entry}-${index}`} className="text-sm leading-relaxed text-muted">
                  {entry}
                </li>
              ))}
            </ol>
          </article>
        </section>
      </div>
    </div>
  );
}
