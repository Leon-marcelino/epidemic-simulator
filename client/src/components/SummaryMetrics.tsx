/**
 * Resumo de Métricas - Minimalismo Científico
 * 
 * Cards com as principais métricas da simulação:
 * - Pico de Infecção Estimado
 * - Data do Pico
 * - Total de Óbitos Estimados
 * - Taxa de Ataque
 */

import { SimulationResult, formatNumber, calculateAttackRate } from "@/lib/seir-simulator";
import { TrendingUp, Calendar, AlertTriangle, Percent } from "lucide-react";

interface SummaryMetricsProps {
  result: SimulationResult;
  populationTotal: number;
}

export function SummaryMetrics({ result, populationTotal }: SummaryMetricsProps) {
  const attackRate = calculateAttackRate(
    result.totalRecovered + result.totalDeaths,
    populationTotal
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Pico de Infecção */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Pico de Infecção</p>
            <p className="metric-value mt-2">{formatNumber(result.peakInfection)}</p>
          </div>
          <TrendingUp className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Número máximo de infectados simultâneos
        </p>
      </div>

      {/* Data do Pico */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Data do Pico</p>
            <p className="metric-value mt-2">Dia {result.peakDay}</p>
          </div>
          <Calendar className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Aproximadamente {Math.round(result.peakDay / 7)} semanas após início
        </p>
      </div>

      {/* Total de Óbitos */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Total de Óbitos</p>
            <p className="metric-value mt-2">{formatNumber(result.totalDeaths)}</p>
          </div>
          <AlertTriangle className="w-5 h-5 text-accent/50 group-hover:text-accent transition-colors" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Estimativa de mortes acumuladas
        </p>
      </div>

      {/* Taxa de Ataque */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Taxa de Ataque</p>
            <p className="metric-value mt-2">{attackRate.toFixed(1)}%</p>
          </div>
          <Percent className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Porcentagem da população afetada
        </p>
      </div>

      {/* Recuperados */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Total Recuperados</p>
            <p className="metric-value mt-2">{formatNumber(result.totalRecovered)}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Pessoas que se recuperaram
        </p>
      </div>

      {/* Máximo Hospitalizado */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Pico de Hospitalizados</p>
            <p className="metric-value mt-2">{formatNumber(result.maxHospitalized)}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Máximo simultâneo em enfermaria
        </p>
      </div>

      {/* Máximo em UTI */}
      <div className="metric-card group">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Pico em UTI</p>
            <p className="metric-value mt-2">{formatNumber(result.maxInICU)}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Máximo simultâneo em terapia intensiva
        </p>
      </div>

      {/* Status de Capacidade */}
      <div className={`metric-card group ${
        result.hospitalCapacityExceeded || result.icuCapacityExceeded
          ? "border-accent bg-accent/5"
          : "border-green-500/30 bg-green-500/5"
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="metric-label">Status de Capacidade</p>
            <p className={`metric-value mt-2 ${
              result.hospitalCapacityExceeded || result.icuCapacityExceeded
                ? "text-accent"
                : "text-green-600"
            }`}>
              {result.hospitalCapacityExceeded || result.icuCapacityExceeded
                ? "Crítico"
                : "Adequado"}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {result.hospitalCapacityExceeded || result.icuCapacityExceeded
            ? "Sistema de saúde pode entrar em colapso"
            : "Sistema de saúde consegue absorver"}
        </p>
      </div>
    </div>
  );
}
