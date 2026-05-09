/**
 * Painel de Parâmetros - Minimalismo Científico
 * 
 * Componente responsável por coletar os parâmetros da simulação SEIR.
 * Design: Sidebar esquerda com cards brancos, sliders com feedback visual.
 */

import { SEIRParameters } from "@/lib/seir-simulator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AlertCircle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ParameterPanelProps {
  parameters: SEIRParameters;
  onParameterChange: (key: keyof SEIRParameters, value: number) => void;
}

export function ParameterPanel({ parameters, onParameterChange }: ParameterPanelProps) {
  const handleSliderChange = (key: keyof SEIRParameters, value: number[]) => {
    onParameterChange(key, value[0]);
  };

  return (
    <div className="w-full space-y-6 overflow-y-auto pr-4 max-h-[calc(100vh-120px)]">
      {/* Cabeçalho */}
      <div className="space-y-2 pb-4">
        <h2 className="text-2xl font-bold text-foreground">Parâmetros</h2>
        <p className="text-sm text-muted-foreground">
          Ajuste os parâmetros da simulação SEIR
        </p>
      </div>

      {/* Seção: População */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">População</CardTitle>
          <CardDescription className="text-xs">Dados demográficos iniciais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* População Total */}
          <div className="space-y-2">
            <Label htmlFor="population" className="text-xs font-semibold uppercase text-muted-foreground">
              População Total
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="population"
                min={10000}
                max={10000000}
                step={100000}
                value={[parameters.populationTotal]}
                onValueChange={(value) => handleSliderChange("populationTotal", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {(parameters.populationTotal / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>

          {/* Infectados Iniciais */}
          <div className="space-y-2">
            <Label htmlFor="initial-infected" className="text-xs font-semibold uppercase text-muted-foreground">
              Infectados Iniciais
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="initial-infected"
                min={1}
                max={1000}
                step={10}
                value={[parameters.initialInfected]}
                onValueChange={(value) => handleSliderChange("initialInfected", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.initialInfected}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Epidemiologia */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Epidemiologia</CardTitle>
          <CardDescription className="text-xs">Características da doença</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* R0 - Taxa de Transmissão */}
          <div className="space-y-2">
            <Label htmlFor="r0" className="text-xs font-semibold uppercase text-muted-foreground">
              R₀ (Taxa de Transmissão)
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="r0"
                min={0.5}
                max={10}
                step={0.1}
                value={[parameters.r0]}
                onValueChange={(value) => handleSliderChange("r0", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.r0.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Número médio de pessoas infectadas por um caso
            </p>
          </div>

          {/* Período de Incubação */}
          <div className="space-y-2">
            <Label htmlFor="incubation" className="text-xs font-semibold uppercase text-muted-foreground">
              Período de Incubação (dias)
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="incubation"
                min={1}
                max={21}
                step={1}
                value={[parameters.incubationPeriod]}
                onValueChange={(value) => handleSliderChange("incubationPeriod", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.incubationPeriod}
              </span>
            </div>
          </div>

          {/* Duração da Infecciosidade */}
          <div className="space-y-2">
            <Label htmlFor="infectious" className="text-xs font-semibold uppercase text-muted-foreground">
              Duração da Infecciosidade (dias)
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="infectious"
                min={1}
                max={21}
                step={1}
                value={[parameters.infectiousPeriod]}
                onValueChange={(value) => handleSliderChange("infectiousPeriod", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.infectiousPeriod}
              </span>
            </div>
          </div>

          {/* Taxa de Mortalidade */}
          <div className="space-y-2">
            <Label htmlFor="mortality" className="text-xs font-semibold uppercase text-muted-foreground">
              Taxa de Mortalidade
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="mortality"
                min={0}
                max={0.1}
                step={0.001}
                value={[parameters.mortalityRate]}
                onValueChange={(value) => handleSliderChange("mortalityRate", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {(parameters.mortalityRate * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Intervenções */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Intervenções</CardTitle>
          <CardDescription className="text-xs">Medidas de controle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Taxa de Isolamento */}
          <div className="space-y-2">
            <Label htmlFor="isolation" className="text-xs font-semibold uppercase text-muted-foreground">
              Taxa de Isolamento Social
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="isolation"
                min={0}
                max={0.9}
                step={0.05}
                value={[parameters.isolationRate]}
                onValueChange={(value) => handleSliderChange("isolationRate", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {(parameters.isolationRate * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Dia de Início das Restrições */}
          <div className="space-y-2">
            <Label htmlFor="intervention-day" className="text-xs font-semibold uppercase text-muted-foreground">
              Dia de Início das Restrições
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="intervention-day"
                min={0}
                max={180}
                step={1}
                value={[parameters.interventionStartDay]}
                onValueChange={(value) => handleSliderChange("interventionStartDay", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                Dia {parameters.interventionStartDay}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Capacidade Hospitalar */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Capacidade Hospitalar</CardTitle>
          <CardDescription className="text-xs">Recursos de saúde disponíveis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Leitos de Enfermaria */}
          <div className="space-y-2">
            <Label htmlFor="hospital-beds" className="text-xs font-semibold uppercase text-muted-foreground">
              Leitos de Enfermaria
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="hospital-beds"
                min={100}
                max={50000}
                step={500}
                value={[parameters.hospitalBeds]}
                onValueChange={(value) => handleSliderChange("hospitalBeds", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.hospitalBeds}
              </span>
            </div>
          </div>

          {/* Leitos de UTI */}
          <div className="space-y-2">
            <Label htmlFor="icu-beds" className="text-xs font-semibold uppercase text-muted-foreground">
              Leitos de UTI
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="icu-beds"
                min={10}
                max={5000}
                step={50}
                value={[parameters.icuBeds]}
                onValueChange={(value) => handleSliderChange("icuBeds", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.icuBeds}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Simulação */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Simulação</CardTitle>
          <CardDescription className="text-xs">Configurações de execução</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dias de Simulação */}
          <div className="space-y-2">
            <Label htmlFor="sim-days" className="text-xs font-semibold uppercase text-muted-foreground">
              Dias de Simulação
            </Label>
            <div className="flex items-center gap-3">
              <Slider
                id="sim-days"
                min={30}
                max={730}
                step={10}
                value={[parameters.simulationDays]}
                onValueChange={(value) => handleSliderChange("simulationDays", value)}
                className="flex-1"
              />
              <span className="text-sm font-mono font-semibold text-primary w-24 text-right">
                {parameters.simulationDays}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informação de Precisão */}
      <Alert className="border-border bg-secondary/30">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-xs text-foreground">
          Esta simulação é uma aproximação matemática. Resultados reais dependem de múltiplos fatores não modelados.
        </AlertDescription>
      </Alert>
    </div>
  );
}
