export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  dramatic: 0.8,
  stagger: 0.08,
  staggerSlow: 0.12,
}

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  reveal: [0.22, 1, 0.36, 1] as const,
  snap: [0.25, 0.46, 0.45, 0.94] as const,
  dramatic: [0.76, 0, 0.24, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  linear: [0, 0, 1, 1] as const,
}

export const THRESHOLD = {
  eager: 0.05,
  normal: 0.2,
  patient: 0.4,
  center: 0.5,
}
