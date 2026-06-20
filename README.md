# Adam Zaatar Portfolio

Personal portfolio for Adam Zaatar, built with Next.js, TypeScript, and Tailwind CSS.

## Systems demos

The portfolio includes two public operating-systems demos:

- `/projects/thread-library`
- `/projects/virtual-memory-pager`

These demos are separate TypeScript browser visualizations. The original C++ course implementations are private due to course policy, and the public demos explain the concepts without exposing course solutions.

## Local development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm lint
pnpm build
pnpm exec tsc --noEmit
```
