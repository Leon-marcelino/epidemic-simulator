/**
 * Gráfico SEIR - Minimalismo Científico
 * 
 * Visualização interativa das curvas S, E, I, R usando Recharts.
 * Inclui linha de capacidade hospitalar para referência.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { DailyData } from "@/lib/seir-simulator";

interface SEIRChartProps {
  data: DailyData[];
  hospitalCapacity: number;
  icuCapacity: number;
  hospitalCapacityExceeded: boolean;
  icuCapacityExceeded: boolean;
}

export function SEIRChart({
  data,
  hospitalCapacity,
  icuCapacity,
  hospitalCapacityExceeded,
  icuCapacityExceeded,
}: SEIRChartProps) {
  return (
    <div className="w-full h-full bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Curvas de Propagação SEIR</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Evolução temporal da epidemia ao longo dos dias
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="day"
            label={{ value: "Dias", position: "insideBottomRight", offset: -5 }}
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            label={{ value: "Número de Pessoas", angle: -90, position: "insideLeft" }}
            stroke="var(--muted-foreground)"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              color: "var(--card-foreground)",
            }}
            formatter={(value) => {
              if (typeof value === "number") {
                return [value.toLocaleString("pt-BR"), ""];
              }
              return value;
            }}
            labelFormatter={(label) => `Dia ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => {
              const labels: Record<string, string> = {
                susceptible: "Suscetíveis (S)",
                exposed: "Expostos (E)",
                infected: "Infectados (I)",
                recovered: "Recuperados (R)",
                hospitalized: "Hospitalizados",
                inICU: "Em UTI",
              };
              return labels[value] || value;
            }}
          />

          {/* Linhas de referência para capacidade hospitalar */}
          <ReferenceLine
            y={hospitalCapacity}
            stroke="var(--chart-4)"
            strokeDasharray="5 5"
            label={{
              value: `Cap. Enfermaria: ${hospitalCapacity}`,
              position: "right",
              fill: "var(--chart-4)",
              fontSize: 12,
            }}
          />
          {icuCapacity > 0 && (
            <ReferenceLine
              y={icuCapacity}
              stroke="var(--destructive)"
              strokeDasharray="5 5"
              label={{
                value: `Cap. UTI: ${icuCapacity}`,
                position: "right",
                fill: "var(--destructive)",
                fontSize: 12,
              }}
            />
          )}

          {/* Curvas SEIR */}
          <Line
            type="monotone"
            dataKey="susceptible"
            stroke="var(--chart-1)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="exposed"
            stroke="var(--chart-2)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="infected"
            stroke="var(--chart-3)"
            dot={false}
            strokeWidth={2.5}
            isAnimationActive={true}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="var(--chart-4)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={500}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="var(--chart-5)"
            dot={false}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={500}
          />

          {/* Curva de hospitalizados */}
          <Line
            type="monotone"
            dataKey="hospitalized"
            stroke="var(--accent)"
            dot={false}
            strokeWidth={2}
            strokeDasharray="5 5"
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Alertas de capacidade excedida */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hospitalCapacityExceeded && (
          <div className="p-3 bg-accent/10 border border-accent rounded-md">
            <p className="text-sm font-semibold text-accent">
              ⚠️ Capacidade de Enfermaria Excedida
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              A demanda por leitos ultrapassa a capacidade disponível
            </p>
          </div>
        )}
        {icuCapacityExceeded && (
          <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-sm font-semibold text-destructive">
              ⚠️ Capacidade de UTI Excedida
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              A demanda por leitos de UTI ultrapassa a capacidade disponível
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
