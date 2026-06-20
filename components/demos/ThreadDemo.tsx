"use client";

import { useMemo, useState } from "react";

import {
  broadcastThread,
  createThreadSimulation,
  finishThread,
  joinThread,
  lockThread,
  signalThread,
  stepThreadSimulation,
  threadPresets,
  ThreadId,
  ThreadRecord,
  ThreadSimulationState,
  unlockThread,
  waitThread,
  yieldThread,
} from "@/lib/demos/threadSimulation";

const statusOrder = ["Ready", "Running", "Blocked", "Done"] as const;
const secondaryButtonClass =
  "link-plain rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-text transition-colors duration-200 ease-out hover:border-primary/50";

function threadName(id: ThreadId | null, state: ThreadSimulationState): string {
  return id ? state.threads[id].name : "None";
}

function threadsByStatus(state: ThreadSimulationState, status: ThreadRecord["status"]) {
  return Object.values(state.threads).filter((thread) => thread.status === status);
}

function statusTone(status: ThreadRecord["status"]) {
  switch (status) {
    case "Running":
      return "border-primary/30 bg-primary/10 text-text";
    case "Blocked":
      return "border-border bg-bg text-muted";
    case "Done":
      return "border-border bg-surface text-muted";
    default:
      return "border-border bg-surface text-text";
  }
}

export default function ThreadDemo() {
  const [state, setState] = useState(() => createThreadSimulation());
  const preset = useMemo(
    () => threadPresets.find((item) => item.id === state.presetId) ?? threadPresets[0],
    [state.presetId]
  );
  const nextAction = preset.actions[state.actionIndex];

  function reset(presetId = state.presetId) {
    setState(createThreadSimulation(presetId));
  }

  function apply(update: (current: ThreadSimulationState) => ThreadSimulationState) {
    setState((current) => update(current));
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="space-y-5">
          <div>
            <label
              htmlFor="thread-preset"
              className="text-sm font-semibold text-text"
            >
              Preset
            </label>
            <select
              id="thread-preset"
              value={state.presetId}
              onChange={(event) => reset(event.target.value as typeof state.presetId)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
            >
              {threadPresets.map((item) => (
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
              onClick={() => apply(stepThreadSimulation)}
              className="link-plain rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-contrast transition-colors duration-200 ease-out hover:bg-primary/90"
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => apply(stepThreadSimulation)}
              className={secondaryButtonClass}
            >
              Step
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className={secondaryButtonClass}
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => apply(yieldThread)}
              className={secondaryButtonClass}
            >
              Yield
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => apply(lockThread)} className={secondaryButtonClass}>
              Lock
            </button>
            <button type="button" onClick={() => apply(unlockThread)} className={secondaryButtonClass}>
              Unlock
            </button>
            <button type="button" onClick={() => apply(waitThread)} className={secondaryButtonClass}>
              Wait
            </button>
            <button type="button" onClick={() => apply(signalThread)} className={secondaryButtonClass}>
              Signal
            </button>
            <button type="button" onClick={() => apply(broadcastThread)} className={secondaryButtonClass}>
              Broadcast
            </button>
            <button
              type="button"
              onClick={() => apply((current) => joinThread(current, "worker-a"))}
              className={secondaryButtonClass}
            >
              Join
            </button>
          </div>

          <button
            type="button"
            onClick={() => apply(finishThread)}
            className={`${secondaryButtonClass} w-full`}
          >
            Mark running thread done
          </button>

          <div className="rounded-xl border border-border bg-bg p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Next preset action
            </p>
            <p className="mt-2 text-sm text-text">
              {nextAction ? nextAction.type : "Trace complete"}
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {statusOrder.map((status) => {
              const threads =
                status === "Ready"
                  ? state.readyQueue.map((id) => state.threads[id])
                  : threadsByStatus(state, status);

              return (
                <article key={status} className="rounded-xl border border-border bg-bg p-4">
                  <h3 className="text-sm font-semibold text-text">{status}</h3>
                  <div className="mt-3 space-y-2">
                    {threads.length > 0 ? (
                      threads.map((thread) => (
                        <p
                          key={thread.id}
                          className={`rounded-lg border px-3 py-2 text-sm ${statusTone(thread.status)}`}
                        >
                          {thread.name}
                          {thread.waitingOn ? (
                            <span className="block text-xs text-muted">
                              waiting on {thread.waitingOn}
                            </span>
                          ) : null}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted">Empty</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-border bg-bg p-4">
              <h3 className="text-sm font-semibold text-text">Lock</h3>
              <p className="mt-2 text-sm text-muted">
                Owner: <span className="font-medium text-text">{threadName(state.lock.owner, state)}</span>
              </p>
              <p className="mt-2 text-sm text-muted">
                Wait queue:{" "}
                <span className="font-medium text-text">
                  {state.lock.waitQueue.map((id) => threadName(id, state)).join(", ") || "Empty"}
                </span>
              </p>
            </article>

            <article className="rounded-xl border border-border bg-bg p-4">
              <h3 className="text-sm font-semibold text-text">Condition queue</h3>
              <p className="mt-2 text-sm text-muted">
                Waiting:{" "}
                <span className="font-medium text-text">
                  {state.conditionQueue.map((id) => threadName(id, state)).join(", ") || "Empty"}
                </span>
              </p>
            </article>
          </div>

          <article className="rounded-xl border border-border bg-bg p-4">
            <h3 className="text-sm font-semibold text-text">Execution trace</h3>
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
