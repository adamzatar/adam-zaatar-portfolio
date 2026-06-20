export type AccessMode = "read" | "write";
export type PagerPresetId = "locality-clock" | "write-eviction";

export type PageId = "P0" | "P1" | "P2" | "P3" | "P4" | "P5";

export type MemoryAccess = {
  pageId: PageId;
  mode: AccessMode;
  note?: string;
};

export type VirtualPage = {
  id: PageId;
  resident: boolean;
  frameId: number | null;
  referenced: boolean;
  dirty: boolean;
  backing: "swap";
  swapWrites: number;
};

export type Frame = {
  id: number;
  pageId: PageId | null;
};

export type PagerSimulationState = {
  presetId: PagerPresetId;
  accessIndex: number;
  pages: Record<PageId, VirtualPage>;
  frames: Frame[];
  clockHand: number;
  hits: number;
  faults: number;
  evictions: number;
  trace: string[];
};

export type PagerPreset = {
  id: PagerPresetId;
  name: string;
  description: string;
  accesses: MemoryAccess[];
};

export const pagerPresets: PagerPreset[] = [
  {
    id: "locality-clock",
    name: "Locality and clock replacement",
    description:
      "A trace with repeated nearby accesses, then enough new pages to force second chances and eviction.",
    accesses: [
      { pageId: "P0", mode: "read", note: "First access to P0 faults and allocates a free frame." },
      { pageId: "P1", mode: "read" },
      { pageId: "P0", mode: "write", note: "A repeated access is a hit and marks the page dirty." },
      { pageId: "P2", mode: "read" },
      { pageId: "P0", mode: "read", note: "Locality keeps P0 hot." },
      { pageId: "P3", mode: "write", note: "No free frame remains, so clock replacement runs." },
      { pageId: "P1", mode: "read" },
      { pageId: "P4", mode: "read" },
      { pageId: "P3", mode: "write" },
      { pageId: "P5", mode: "read" },
      { pageId: "P0", mode: "read" },
    ],
  },
  {
    id: "write-eviction",
    name: "Dirty eviction",
    description:
      "A write-heavy trace that shows why dirty pages need extra backing-store work before eviction.",
    accesses: [
      { pageId: "P0", mode: "write" },
      { pageId: "P1", mode: "write" },
      { pageId: "P2", mode: "read" },
      { pageId: "P0", mode: "write" },
      { pageId: "P3", mode: "read" },
      { pageId: "P4", mode: "write" },
      { pageId: "P1", mode: "read" },
      { pageId: "P5", mode: "write" },
    ],
  },
];

const pageIds: PageId[] = ["P0", "P1", "P2", "P3", "P4", "P5"];

function makePages(): Record<PageId, VirtualPage> {
  return Object.fromEntries(
    pageIds.map((id) => [
      id,
      {
        id,
        resident: false,
        frameId: null,
        referenced: false,
        dirty: false,
        backing: "swap" as const,
        swapWrites: 0,
      },
    ])
  ) as Record<PageId, VirtualPage>;
}

function cloneState(state: PagerSimulationState): PagerSimulationState {
  return {
    ...state,
    pages: Object.fromEntries(
      pageIds.map((id) => [id, { ...state.pages[id] }])
    ) as Record<PageId, VirtualPage>,
    frames: state.frames.map((frame) => ({ ...frame })),
    trace: [...state.trace],
  };
}

function appendTrace(state: PagerSimulationState, message: string) {
  state.trace = [message, ...state.trace].slice(0, 14);
}

function modeLabel(mode: AccessMode): string {
  return mode === "write" ? "write" : "read";
}

function findFreeFrame(state: PagerSimulationState): Frame | undefined {
  return state.frames.find((frame) => frame.pageId === null);
}

function evictWithClock(state: PagerSimulationState): Frame {
  for (let inspected = 0; inspected < state.frames.length * 2; inspected += 1) {
    const frame = state.frames[state.clockHand];
    const pageId = frame.pageId;

    if (!pageId) {
      appendTrace(state, `Clock hand found free frame F${frame.id}.`);
      return frame;
    }

    const page = state.pages[pageId];
    if (page.referenced) {
      page.referenced = false;
      appendTrace(state, `Clock gives ${pageId} a second chance and clears its reference bit.`);
      state.clockHand = (state.clockHand + 1) % state.frames.length;
      continue;
    }

    if (page.dirty) {
      page.swapWrites += 1;
      appendTrace(state, `${pageId} is dirty, so the demo records a swap write before eviction.`);
    } else {
      appendTrace(state, `${pageId} is clean and can be evicted without a swap write.`);
    }

    page.resident = false;
    page.frameId = null;
    page.referenced = false;
    page.dirty = false;
    frame.pageId = null;
    state.evictions += 1;
    state.clockHand = (state.clockHand + 1) % state.frames.length;
    return frame;
  }

  const fallback = state.frames[state.clockHand];
  appendTrace(state, `Clock fallback chose frame F${fallback.id}.`);
  return fallback;
}

export function createPagerSimulation(
  presetId: PagerPresetId = "locality-clock"
): PagerSimulationState {
  const preset = pagerPresets.find((item) => item.id === presetId) ?? pagerPresets[0];

  return {
    presetId: preset.id,
    accessIndex: 0,
    pages: makePages(),
    frames: [
      { id: 0, pageId: null },
      { id: 1, pageId: null },
      { id: 2, pageId: null },
    ],
    clockHand: 0,
    hits: 0,
    faults: 0,
    evictions: 0,
    trace: [`Loaded preset: ${preset.name}. Use Start or Step to run the trace.`],
  };
}

export function accessMemory(
  state: PagerSimulationState,
  access: MemoryAccess
): PagerSimulationState {
  const next = cloneState(state);
  const page = next.pages[access.pageId];
  const accessText = `${modeLabel(access.mode)} ${access.pageId}`;

  if (page.resident && page.frameId !== null) {
    page.referenced = true;
    if (access.mode === "write") page.dirty = true;
    next.hits += 1;
    appendTrace(next, `Hit: ${accessText} uses frame F${page.frameId}.`);
    if (access.note) appendTrace(next, access.note);
    return next;
  }

  next.faults += 1;
  appendTrace(next, `Page fault: ${accessText} is not resident.`);

  const frame = findFreeFrame(next) ?? evictWithClock(next);
  frame.pageId = access.pageId;
  page.resident = true;
  page.frameId = frame.id;
  page.referenced = true;
  page.dirty = access.mode === "write";
  appendTrace(next, `Mapped ${access.pageId} into frame F${frame.id}.`);
  if (page.dirty) appendTrace(next, `${access.pageId} is dirty because the access was a write.`);
  if (access.note) appendTrace(next, access.note);

  return next;
}

export function stepPagerSimulation(state: PagerSimulationState): PagerSimulationState {
  const preset = pagerPresets.find((item) => item.id === state.presetId) ?? pagerPresets[0];
  const access = preset.accesses[state.accessIndex];

  if (!access) {
    const next = cloneState(state);
    appendTrace(next, "Trace is complete. Reset or choose another preset.");
    return next;
  }

  const next = accessMemory(state, access);
  next.accessIndex = state.accessIndex + 1;
  return next;
}

export function runPagerTrace(state: PagerSimulationState): PagerSimulationState {
  let next = state;
  const preset = pagerPresets.find((item) => item.id === state.presetId) ?? pagerPresets[0];

  while (next.accessIndex < preset.accesses.length) {
    next = stepPagerSimulation(next);
  }

  return next;
}
