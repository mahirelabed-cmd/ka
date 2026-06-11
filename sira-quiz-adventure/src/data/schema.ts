import { z } from 'zod';

/** Schwierigkeitsstufen: Kinder (8–12), Jugendliche (13–17), Erwachsene. */
export const LevelSchema = z.enum(['kids', 'youth', 'adult']);
export type Level = z.infer<typeof LevelSchema>;

const questionBase = {
  id: z.string().regex(/^st\d{2}-(kids|youth|adult)-\d{3}$/),
  station: z.number().int().min(1).max(12),
  level: LevelSchema,
  question: z.string().min(5),
  explanation: z.string().min(10),
  source: z.string().min(3),
  pearlId: z.string().regex(/^pearl-/),
};

export const MultipleChoiceSchema = z.object({
  ...questionBase,
  type: z.literal('multiple_choice'),
  options: z.array(z.string().min(1)).length(4),
  answerIndex: z.number().int().min(0).max(3),
});

export const TrueFalseSchema = z.object({
  ...questionBase,
  type: z.literal('true_false'),
  answer: z.boolean(),
});

export const OrderSchema = z.object({
  ...questionBase,
  type: z.literal('order'),
  /** Ereignisse in der korrekten chronologischen Reihenfolge. */
  items: z.array(z.string().min(1)).min(3).max(4),
});

export const MatchSchema = z.object({
  ...questionBase,
  type: z.literal('match'),
  /** Paare, z.B. Person ↔ Beiname. Max. 4 Paare. */
  pairs: z
    .array(z.object({ left: z.string().min(1), right: z.string().min(1) }))
    .min(3)
    .max(4),
});

export const QuestionSchema = z.discriminatedUnion('type', [
  MultipleChoiceSchema,
  TrueFalseSchema,
  OrderSchema,
  MatchSchema,
]);

export type MultipleChoiceQuestion = z.infer<typeof MultipleChoiceSchema>;
export type TrueFalseQuestion = z.infer<typeof TrueFalseSchema>;
export type OrderQuestion = z.infer<typeof OrderSchema>;
export type MatchQuestion = z.infer<typeof MatchSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export const PearlSchema = z.object({
  id: z.string().regex(/^pearl-/),
  station: z.number().int().min(1).max(12),
  title: z.string().min(3),
  /** Lektion: 4–6 Sätze. */
  lesson: z.string().min(80),
  source: z.string().min(3),
});
export type Pearl = z.infer<typeof PearlSchema>;

export const StationSchema = z.object({
  id: z.number().int().min(1).max(12),
  name: z.string(),
  theme: z.string(),
  period: z.string(),
  /** Atmosphärischer Einstieg, 3–5 Sätze. */
  intro: z.string().min(120),
  /** Lernziel: „In diesem Kapitel erfährst du…" */
  goal: z.string().min(20),
  pearlIds: z.array(z.string().regex(/^pearl-/)).length(3),
  /** Position auf der stilisierten SVG-Karte (viewBox 0 0 700 1100). */
  x: z.number(),
  y: z.number(),
});
export type Station = z.infer<typeof StationSchema>;

/** Pro Station und Stufe werden 14 Fragen angelegt, 10 davon gezogen. */
export const POOL_SIZE = 14;
export const ROUND_SIZE = 10;
export const PASS_THRESHOLD = 7;
export const STATION_COUNT = 12;
