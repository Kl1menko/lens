type ConditionScaleProps = {
  score: number; // 1-10
  notes?: string;
};

const labels = [
  "Проєкт",
  "Сильний знос",
  "Зношено",
  "Вживане",
  "Задовільно",
  "Добре",
  "Дуже добре",
  "Відмінно",
  "Майже нове",
  "Як нове",
  "Deadstock",
];

export function ConditionScale({ score, notes }: ConditionScaleProps) {
  const clamped = Math.min(10, Math.max(1, score));
  const percent = (clamped / 10) * 100;

  return (
    <div className="space-y-2 rounded-2xl border border-border/70 bg-card/60 p-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Стан</span>
        <span className="font-semibold text-foreground">
          {clamped}/10 · {labels[clamped]}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-border">
        <div
          className="h-2 rounded-full bg-emerald-400"
          style={{ width: `${percent}%` }}
        />
      </div>
      {notes ? <p className="text-sm text-muted-foreground">{notes}</p> : null}
    </div>
  );
}
