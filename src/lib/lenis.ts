import type Lenis from "lenis";

type WindowWithLenis = Window & { lenis?: Lenis };

export function getLenis(): Lenis | undefined {
  return (window as unknown as WindowWithLenis).lenis;
}

export function setLenis(instance: Lenis): void {
  (window as unknown as WindowWithLenis).lenis = instance;
}