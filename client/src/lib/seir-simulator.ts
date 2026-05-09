/**
 * Motor de Simulação SEIR (Suscetíveis-Expostos-Infetados-Recuperados)
 * 
 * Implementa o modelo epidemiológico SEIR com parâmetros de intervenção
 * e capacidade hospitalar para análise de propagação de doenças.
 */

export interface SEIRParameters {
  // Parâmetros da população
  populationTotal: number;
  
  // Parâmetros epidemiológicos
  r0: number; // Taxa de transmissão básica
  incubationPeriod: number; // Período de incubação em dias
  infectiousPeriod: number; // Duração da infecciosidade em dias
  mortalityRate: number; // Taxa de mortalidade (0-1)
  
  // Parâmetros de intervenção
  isolationRate: number; // Taxa de isolamento social (0-1)
  interventionStartDay: number; // Dia de início das restrições
  
  // Capacidade hospitalar
  hospitalBeds: number; // Leitos de enfermaria
  icuBeds: number; // Leitos de UTI
  
  // Simulação
  simulationDays: number; // Número de dias a simular
  initialInfected: number; // Número inicial de infectados
}

export interface DailyData {
  day: number;
  susceptible: number;
  exposed: number;
  infected: number;
  recovered: number;
  deaths: number;
  hospitalized: number;
  inICU: number;
  r_effective: number; // R efetivo do dia
}

export interface SimulationResult {
  data: DailyData[];
  peakInfection: number;
  peakDay: number;
  totalDeaths: number;
  totalRecovered: number;
  hospitalCapacityExceeded: boolean;
  icuCapacityExceeded: boolean;
  maxHospitalized: number;
  maxInICU: number;
}

/**
 * Calcula a taxa de transmissão efetiva (R efetivo) considerando intervenções
 */
function calculateEffectiveR(
  r0: number,
  isolationRate: number,
  daysSinceIntervention: number
): number {
  // Redução gradual da transmissão com isolamento
  const isolationEffect = 1 - isolationRate;
  
  // Efeito de fadiga de intervenção (redução gradual da efetividade)
  const fatigueEffect = Math.max(0.5, 1 - daysSinceIntervention * 0.01);
  
  return r0 * isolationEffect * fatigueEffect;
}

/**
 * Simula a progressão da epidemia usando o modelo SEIR
 */
export function simulateEpidemic(params: SEIRParameters): SimulationResult {
  const {
    populationTotal,
    r0,
    incubationPeriod,
    infectiousPeriod,
    mortalityRate,
    isolationRate,
    interventionStartDay,
    hospitalBeds,
    icuBeds,
    simulationDays,
    initialInfected,
  } = params;

  const data: DailyData[] = [];
  
  // Estado inicial
  let S = populationTotal - initialInfected; // Suscetíveis
  let E = 0; // Expostos
  let I = initialInfected; // Infectados
  let R = 0; // Recuperados
  let D = 0; // Mortes
  let H = 0; // Hospitalizados
  let U = 0; // Em UTI
  
  let peakInfection = I;
  let peakDay = 0;
  let hospitalCapacityExceeded = false;
  let icuCapacityExceeded = false;
  let maxHospitalized = 0;
  let maxInICU = 0;

  // Parâmetros do modelo
  const sigma = 1 / incubationPeriod; // Taxa de progressão E→I
  const gamma = 1 / infectiousPeriod; // Taxa de recuperação I→R
  const dt = 1; // Passo de tempo em dias

  for (let day = 0; day < simulationDays; day++) {
    // Calcula R efetivo considerando intervenções
    const daysSinceIntervention = Math.max(0, day - interventionStartDay);
    const isIntervention = day >= interventionStartDay;
    const currentIsolationRate = isIntervention ? isolationRate : 0;
    const r_effective = calculateEffectiveR(r0, currentIsolationRate, daysSinceIntervention);

    // Equações diferenciais SEIR
    const beta = r_effective / infectiousPeriod; // Taxa de transmissão
    const N = S + E + I + R; // População total (excluindo mortes)
    
    // Novos casos expostos
    const newExposed = (beta * S * I) / N * dt;
    
    // Progressão de expostos para infectados
    const newInfected = sigma * E * dt;
    
    // Recuperação e morte
    const newRecovered = gamma * I * (1 - mortalityRate) * dt;
    const newDeaths = gamma * I * mortalityRate * dt;

    // Atualiza compartimentos
    S = Math.max(0, S - newExposed);
    E = Math.max(0, E + newExposed - newInfected);
    I = Math.max(0, I + newInfected - newRecovered - newDeaths);
    R = Math.max(0, R + newRecovered);
    D = D + newDeaths;

    // Estimativa de hospitalização
    // Assume que ~5% dos infectados precisam de hospitalização
    // e ~20% dos hospitalizados precisam de UTI
    const hospitalizationRate = 0.05;
    const icuRate = 0.2;
    
    H = Math.min(I * hospitalizationRate, hospitalBeds * 1.5); // Pode exceder capacidade
    U = Math.min(H * icuRate, icuBeds * 1.5);

    // Verifica se capacidade foi excedida
    if (H > hospitalBeds) hospitalCapacityExceeded = true;
    if (U > icuBeds) icuCapacityExceeded = true;

    maxHospitalized = Math.max(maxHospitalized, H);
    maxInICU = Math.max(maxInICU, U);

    // Rastreia pico de infecção
    if (I > peakInfection) {
      peakInfection = I;
      peakDay = day;
    }

    // Armazena dados do dia
    data.push({
      day,
      susceptible: Math.round(S),
      exposed: Math.round(E),
      infected: Math.round(I),
      recovered: Math.round(R),
      deaths: Math.round(D),
      hospitalized: Math.round(H),
      inICU: Math.round(U),
      r_effective: parseFloat(r_effective.toFixed(2)),
    });
  }

  return {
    data,
    peakInfection: Math.round(peakInfection),
    peakDay,
    totalDeaths: Math.round(D),
    totalRecovered: Math.round(R),
    hospitalCapacityExceeded,
    icuCapacityExceeded,
    maxHospitalized: Math.round(maxHospitalized),
    maxInICU: Math.round(maxInICU),
  };
}

/**
 * Formata um número para exibição com separadores de milhares
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(Math.round(num));
}

/**
 * Formata uma porcentagem
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Calcula a taxa de ataque (% da população que foi infectada)
 */
export function calculateAttackRate(total: number, population: number): number {
  return (total / population) * 100;
}
