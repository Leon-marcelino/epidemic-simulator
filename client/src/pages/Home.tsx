/**
 * Simulador de Propagação Epidêmica Profissional
 * 
 * Página principal com layout responsivo:
 * - Sidebar esquerda: Painel de parâmetros (1/3)
 * - Área central: Gráficos e métricas (2/3)
 * 
 * Design: Minimalismo Científico com paleta azul-escuro e cinza
 */

import { useState, useMemo } from "react";
import { SEIRParameters, simulateEpidemic } from "@/lib/seir-simulator";
import { ParameterPanel } from "@/components/ParameterPanel";
import { SEIRChart } from "@/components/SEIRChart";
import { SummaryMetrics } from "@/components/SummaryMetrics";
import { Activity } from "lucide-react";

const DEFAULT_PARAMETERS: SEIRParameters = {
  populationTotal: 1000000,
  r0: 2.5,
  incubationPeriod: 5,
  infectiousPeriod: 10,
  mortalityRate: 0.01,
  isolationRate: 0.3,
  interventionStartDay: 30,
  hospitalBeds: 5000,
  icuBeds: 500,
  simulationDays: 365,
  initialInfected: 10,
};

export default function Home() {
  const [parameters, setParameters] = useState<SEIRParameters>(DEFAULT_PARAMETERS);

  // Simula a epidemia quando parâmetros mudam
  const simulationResult = useMemo(() => {
    return simulateEpidemic(parameters);
  }, [parameters]);

  const handleParameterChange = (key: keyof SEIRParameters, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Simulador de Propagação Epidêmica
              </h1>
              <p className="text-xs text-muted-foreground">
                Modelo SEIR para análise de doenças infecciosas
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar: Painel de Parâmetros (1/3) */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              <ParameterPanel
                parameters={parameters}
                onParameterChange={handleParameterChange}
              />
            </div>
          </aside>

          {/* Main Area: Gráficos e Métricas (2/3) */}
          <section className="lg:col-span-2 space-y-8 order-1 lg:order-2">
            {/* Resumo de Métricas */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Resumo da Simulação
              </h2>
              <SummaryMetrics
                result={simulationResult}
                populationTotal={parameters.populationTotal}
              />
            </div>

            {/* Gráfico SEIR */}
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                Análise Temporal
              </h2>
              <SEIRChart
                data={simulationResult.data}
                hospitalCapacity={parameters.hospitalBeds}
                icuCapacity={parameters.icuBeds}
                hospitalCapacityExceeded={simulationResult.hospitalCapacityExceeded}
                icuCapacityExceeded={simulationResult.icuCapacityExceeded}
              />
            </div>

            {/* Informações Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Sobre o Modelo SEIR */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Sobre o Modelo SEIR
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">S (Suscetíveis):</strong> Pessoas que podem ser infectadas
                  </li>
                  <li>
                    <strong className="text-foreground">E (Expostos):</strong> Pessoas infectadas mas não infecciosas
                  </li>
                  <li>
                    <strong className="text-foreground">I (Infectados):</strong> Pessoas infecciosas
                  </li>
                  <li>
                    <strong className="text-foreground">R (Recuperados):</strong> Pessoas imunizadas ou falecidas
                  </li>
                </ul>
              </div>

              {/* Interpretação de Resultados */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Interpretação de Resultados
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <strong className="text-foreground">R₀:</strong> Número médio de pessoas infectadas por um caso
                  </li>
                  <li>
                    <strong className="text-foreground">Pico:</strong> Momento de maior pressão no sistema de saúde
                  </li>
                  <li>
                    <strong className="text-foreground">Taxa de Ataque:</strong> Porcentagem total da população afetada
                  </li>
                  <li>
                    <strong className="text-foreground">Isolamento:</strong> Reduz R₀ e achata a curva
                  </li>
                </ul>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-secondary/30 border border-border rounded-lg p-6 mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                ⚠️ Aviso Importante
              </h3>
              <p className="text-sm text-muted-foreground">
                Esta simulação é uma aproximação matemática baseada no modelo SEIR. Resultados reais dependem de múltiplos fatores não capturados pelo modelo, incluindo: comportamento humano, variações geográficas, capacidade de teste, efetividade de vacinas, e mutações virais. Use este simulador apenas para fins educacionais e de planejamento preliminar. Consulte especialistas em epidemiologia para análises críticas.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>
            Simulador de Propagação Epidêmica Profissional • Modelo SEIR • Desenvolvido para gestores de saúde
          </p>
        </div>
      </footer>
    </div>
  );
}
