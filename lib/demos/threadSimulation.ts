export type ThreadStatus = "Ready" | "Running" | "Blocked" | "Done";

export type ThreadId = "main" | "worker-a" | "worker-b";

export type ThreadAction =
  | { type: "schedule"; note?: string }
  | { type: "yield"; note?: string }
  | { type: "lock"; note?: string }
  | { type: "unlock"; note?: string }
  | { type: "wait"; note?: string }
  | { type: "signal"; note?: string }
  | { type: "broadcast"; note?: string }
  | { type: "join"; target: ThreadId; note?: string }
  | { type: "finish"; note?: string };

export type ThreadPresetId = "lock-contention" | "condition-signal" | "yield-join";

export type ThreadRecord = {
  id: ThreadId;
  name: string;
  status: ThreadStatus;
  waitingOn?: "lock" | "condition" | `join:${ThreadId}`;
};

export type ThreadSimulationState = {
  presetId: ThreadPresetId;
  actionIndex: number;
  threads: Record<ThreadId, ThreadRecord>;
  readyQueue: ThreadId[];
  running: ThreadId | null;
  lock: {
    owner: ThreadId | null;
    waitQueue: ThreadId[];
  };
  conditionQueue: ThreadId[];
  joinWaiters: Partial<Record<ThreadId, ThreadId[]>>;
  trace: string[];
};

export type ThreadPreset = {
  id: ThreadPresetId;
  name: string;
  description: string;
  actions: ThreadAction[];
};

const threadNames: Record<ThreadId, string> = {
  main: "Coordinator",
  "worker-a": "Worker A",
  "worker-b": "Worker B",
};

export const threadPresets: ThreadPreset[] = [
  {
    id: "lock-contention",
    name: "Lock contention",
    description:
      "Shows one thread holding a lock while another blocks, then returns to the ready queue after unlock.",
    actions: [
      { type: "schedule", note: "The demo scheduler picks the first runnable thread." },
      { type: "lock", note: "Coordinator enters a critical section." },
      { type: "yield", note: "Yield gives another runnable thread a turn." },
      { type: "lock", note: "Worker A tries to enter the same critical section and blocks." },
      { type: "yield", note: "Worker B can still run while Worker A waits." },
      { type: "unlock", note: "Coordinator releases the lock and wakes one waiter." },
      { type: "yield", note: "The next runnable thread gets a chance to acquire the lock." },
      { type: "lock", note: "Worker A now enters the critical section." },
      { type: "finish", note: "Worker A finishes and leaves the scheduler." },
    ],
  },
  {
    id: "condition-signal",
    name: "Condition-variable wait/signal",
    description:
      "Shows a waiter releasing the lock, blocking on a condition queue, and resuming after a signal.",
    actions: [
      { type: "schedule" },
      { type: "lock", note: "Coordinator holds the lock before checking a condition." },
      { type: "wait", note: "Wait releases the lock and blocks on the condition queue." },
      { type: "lock", note: "Worker A enters and changes the condition." },
      { type: "signal", note: "Signal moves one waiting thread back to the ready queue." },
      { type: "unlock", note: "Worker A exits the critical section." },
      { type: "yield", note: "The scheduler gives the waiting coordinator another turn." },
      { type: "lock", note: "Coordinator reacquires the lock before continuing." },
      { type: "finish", note: "Coordinator completes the waiting path." },
    ],
  },
  {
    id: "yield-join",
    name: "Yield and join behavior",
    description:
      "Shows cooperative yields, a coordinator waiting for a worker, and a join waiter waking when the target finishes.",
    actions: [
      { type: "schedule" },
      { type: "yield", note: "Coordinator yields to let workers make progress." },
      { type: "yield", note: "Worker A yields before finishing." },
      { type: "finish", note: "Worker B completes first." },
      { type: "join", target: "worker-a", note: "Coordinator blocks until Worker A is done." },
      { type: "finish", note: "Worker A finishes and wakes join waiters." },
      { type: "finish", note: "Coordinator observes the completed worker and exits." },
    ],
  },
];

function makeThreads(): Record<ThreadId, ThreadRecord> {
  return {
    main: { id: "main", name: threadNames.main, status: "Ready" },
    "worker-a": { id: "worker-a", name: threadNames["worker-a"], status: "Ready" },
    "worker-b": { id: "worker-b", name: threadNames["worker-b"], status: "Ready" },
  };
}

function cloneState(state: ThreadSimulationState): ThreadSimulationState {
  return {
    ...state,
    threads: {
      main: { ...state.threads.main },
      "worker-a": { ...state.threads["worker-a"] },
      "worker-b": { ...state.threads["worker-b"] },
    },
    readyQueue: [...state.readyQueue],
    lock: {
      owner: state.lock.owner,
      waitQueue: [...state.lock.waitQueue],
    },
    conditionQueue: [...state.conditionQueue],
    joinWaiters: Object.fromEntries(
      Object.entries(state.joinWaiters).map(([target, waiters]) => [target, [...waiters]])
    ) as ThreadSimulationState["joinWaiters"],
    trace: [...state.trace],
  };
}

function appendTrace(state: ThreadSimulationState, message: string) {
  state.trace = [message, ...state.trace].slice(0, 12);
}

function label(threadId: ThreadId | null): string {
  return threadId ? threadNames[threadId] : "No thread";
}

function scheduleNext(state: ThreadSimulationState, reason = "Scheduler picks the next ready thread.") {
  if (state.running || state.readyQueue.length === 0) {
    if (!state.running) appendTrace(state, "Scheduler found no runnable threads.");
    return;
  }

  const next = state.readyQueue.shift();
  if (!next) return;

  state.running = next;
  state.threads[next].status = "Running";
  state.threads[next].waitingOn = undefined;
  appendTrace(state, `${reason} ${label(next)} is running.`);
}

function blockRunning(
  state: ThreadSimulationState,
  waitingOn: NonNullable<ThreadRecord["waitingOn"]>,
  message: string
) {
  const current = state.running;
  if (!current) {
    appendTrace(state, "No running thread can block.");
    return;
  }

  state.running = null;
  state.threads[current].status = "Blocked";
  state.threads[current].waitingOn = waitingOn;
  appendTrace(state, message);
  scheduleNext(state);
}

function wakeThread(state: ThreadSimulationState, threadId: ThreadId, reason: string) {
  if (state.threads[threadId].status === "Done") return;

  state.threads[threadId].status = "Ready";
  state.threads[threadId].waitingOn = undefined;
  if (!state.readyQueue.includes(threadId) && state.running !== threadId) {
    state.readyQueue.push(threadId);
  }
  appendTrace(state, `${label(threadId)} moved to ready. ${reason}`);
}

export function createThreadSimulation(
  presetId: ThreadPresetId = "lock-contention"
): ThreadSimulationState {
  const preset = threadPresets.find((item) => item.id === presetId) ?? threadPresets[0];

  return {
    presetId: preset.id,
    actionIndex: 0,
    threads: makeThreads(),
    readyQueue: ["main", "worker-a", "worker-b"],
    running: null,
    lock: {
      owner: null,
      waitQueue: [],
    },
    conditionQueue: [],
    joinWaiters: {},
    trace: [`Loaded preset: ${preset.name}. Use Start or Step to begin.`],
  };
}

export function yieldThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Yield requested with no running thread.");
    return next;
  }

  next.threads[current].status = "Ready";
  next.readyQueue.push(current);
  next.running = null;
  appendTrace(next, `${label(current)} yielded back to the ready queue.`);
  scheduleNext(next);
  return next;
}

export function lockThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Lock requested with no running thread.");
    return next;
  }

  if (!next.lock.owner) {
    next.lock.owner = current;
    appendTrace(next, `${label(current)} acquired the lock.`);
    return next;
  }

  if (next.lock.owner === current) {
    appendTrace(next, `${label(current)} already owns the lock in this demo model.`);
    return next;
  }

  next.lock.waitQueue.push(current);
  blockRunning(next, "lock", `${label(current)} blocked because ${label(next.lock.owner)} owns the lock.`);
  return next;
}

export function unlockThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Unlock requested with no running thread.");
    return next;
  }

  if (next.lock.owner !== current) {
    appendTrace(next, `${label(current)} cannot unlock because it does not own the lock.`);
    return next;
  }

  next.lock.owner = null;
  appendTrace(next, `${label(current)} released the lock.`);

  const waiter = next.lock.waitQueue.shift();
  if (waiter) {
    wakeThread(next, waiter, "It can compete for the lock on a later turn.");
  }

  return next;
}

export function waitThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Wait requested with no running thread.");
    return next;
  }

  if (next.lock.owner === current) {
    next.lock.owner = null;
    const waiter = next.lock.waitQueue.shift();
    if (waiter) wakeThread(next, waiter, "The lock became available while another thread waited.");
  }

  next.conditionQueue.push(current);
  blockRunning(next, "condition", `${label(current)} waits on the condition queue.`);
  return next;
}

export function signalThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const waiter = next.conditionQueue.shift();

  if (!waiter) {
    appendTrace(next, "Signal had no effect because the condition queue was empty.");
    return next;
  }

  wakeThread(next, waiter, "Signal wakes one condition waiter.");
  return next;
}

export function broadcastThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);

  if (next.conditionQueue.length === 0) {
    appendTrace(next, "Broadcast had no effect because the condition queue was empty.");
    return next;
  }

  const waiters = [...next.conditionQueue];
  next.conditionQueue = [];
  for (const waiter of waiters) {
    wakeThread(next, waiter, "Broadcast wakes all condition waiters.");
  }
  return next;
}

export function joinThread(
  state: ThreadSimulationState,
  target: ThreadId = "worker-a"
): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Join requested with no running thread.");
    return next;
  }

  if (current === target) {
    appendTrace(next, `${label(current)} cannot join itself.`);
    return next;
  }

  if (next.threads[target].status === "Done") {
    appendTrace(next, `${label(current)} joined ${label(target)}, which was already done.`);
    return next;
  }

  next.joinWaiters[target] = [...(next.joinWaiters[target] ?? []), current];
  blockRunning(next, `join:${target}`, `${label(current)} blocked until ${label(target)} finishes.`);
  return next;
}

export function finishThread(state: ThreadSimulationState): ThreadSimulationState {
  const next = cloneState(state);
  const current = next.running;

  if (!current) {
    scheduleNext(next, "Finish requested with no running thread.");
    return next;
  }

  if (next.lock.owner === current) {
    next.lock.owner = null;
    const waiter = next.lock.waitQueue.shift();
    if (waiter) wakeThread(next, waiter, "The lock owner finished and released the lock.");
  }

  next.running = null;
  next.threads[current].status = "Done";
  next.threads[current].waitingOn = undefined;
  appendTrace(next, `${label(current)} completed.`);

  const joiners = next.joinWaiters[current] ?? [];
  delete next.joinWaiters[current];
  for (const waiter of joiners) {
    wakeThread(next, waiter, `${label(current)} finished, so join can return.`);
  }

  scheduleNext(next);
  return next;
}

export function applyThreadAction(
  state: ThreadSimulationState,
  action: ThreadAction
): ThreadSimulationState {
  let next = state;

  switch (action.type) {
    case "schedule":
      next = cloneState(state);
      scheduleNext(next, action.note ?? "Scheduler picks the next ready thread.");
      break;
    case "yield":
      next = yieldThread(state);
      break;
    case "lock":
      next = lockThread(state);
      break;
    case "unlock":
      next = unlockThread(state);
      break;
    case "wait":
      next = waitThread(state);
      break;
    case "signal":
      next = signalThread(state);
      break;
    case "broadcast":
      next = broadcastThread(state);
      break;
    case "join":
      next = joinThread(state, action.target);
      break;
    case "finish":
      next = finishThread(state);
      break;
    default:
      next = cloneState(state);
  }

  if (action.note) {
    appendTrace(next, action.note);
  }

  return next;
}

export function stepThreadSimulation(state: ThreadSimulationState): ThreadSimulationState {
  const preset = threadPresets.find((item) => item.id === state.presetId) ?? threadPresets[0];
  const action = preset.actions[state.actionIndex];

  if (!action) {
    const next = cloneState(state);
    appendTrace(next, "Preset trace is complete. Reset or choose another preset.");
    return next;
  }

  const next = applyThreadAction(state, action);
  next.actionIndex = state.actionIndex + 1;
  return next;
}
