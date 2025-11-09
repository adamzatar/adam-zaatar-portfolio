if (typeof window !== "undefined") {
  const origError = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.includes("hydrated but some attributes")) {
      console.groupCollapsed("⚠️ Hydration mismatch detected");
      console.log("🕵️ Stack trace:", new Error().stack);
      console.log("🔍 React message:", first);
      console.groupEnd();
    }
    origError(...args);
  };
}

export {};
