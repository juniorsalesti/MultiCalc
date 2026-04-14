import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function Salary13Calculator() {
  const [salary, setSalary] = useState<number>(3000);
  const [months, setMonths] = useState<number>(12);
  const [result, setResult] = useState<{ gross: number; installments: { first: number; second: number } } | null>(null);

  const calculate = () => {
    const gross = (salary / 12) * months;
    // Simplificação: 1ª parcela é 50% do bruto sem descontos
    const first = gross * 0.5;
    // 2ª parcela teria descontos (INSS/IR), mas vamos simplificar para o bruto restante
    const second = gross * 0.5;

    setResult({ gross, installments: { first, second } });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Décimo Terceiro" 
        description="Calcule o valor do seu 13º salário proporcional aos meses trabalhados no ano." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Décimo Terceiro Salário</CardTitle>
          <CardDescription>Calcule o valor proporcional ao tempo trabalhado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salário Bruto Mensal (R$)</Label>
              <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="months">Meses Trabalhados no Ano</Label>
              <Input id="months" type="number" min="1" max="12" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calcular 13º</Button>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground uppercase">Valor Total Bruto</div>
                <div className="text-3xl font-bold">R$ {result.gross.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">1ª Parcela (Nov)</div>
                  <div className="font-semibold">R$ {result.installments.first.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">2ª Parcela (Dez)</div>
                  <div className="font-semibold">R$ {result.installments.second.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground italic text-center">
                * Valores brutos. A segunda parcela sofre descontos de INSS e IRRF.
              </p>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000010"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
