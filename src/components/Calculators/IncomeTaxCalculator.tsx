import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function IncomeTaxCalculator() {
  const [salary, setSalary] = useState<number>(5000);
  const [dependents, setDependents] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);
  const [result, setResult] = useState<{ base: number; tax: number; rate: number; net: number } | null>(null);

  const calculate = () => {
    // Simplificação da tabela progressiva mensal 2024/2025
    // INSS simplificado (aproximado)
    let inss = 0;
    if (salary <= 1412) inss = salary * 0.075;
    else if (salary <= 2666.68) inss = (salary - 1412) * 0.09 + 105.90;
    else if (salary <= 4000.03) inss = (salary - 2666.68) * 0.12 + 218.82;
    else if (salary <= 7786.02) inss = (salary - 4000.03) * 0.14 + 378.82;
    else inss = 908.85; // Teto INSS

    const dependentDeduction = dependents * 189.59;
    const base = salary - inss - dependentDeduction - otherDeductions;

    let tax = 0;
    let rate = 0;

    if (base <= 2259.20) {
      tax = 0;
      rate = 0;
    } else if (base <= 2826.65) {
      tax = base * 0.075 - 169.44;
      rate = 7.5;
    } else if (base <= 3751.05) {
      tax = base * 0.15 - 381.44;
      rate = 15;
    } else if (base <= 4664.68) {
      tax = base * 0.225 - 662.77;
      rate = 22.5;
    } else {
      tax = base * 0.275 - 896.00;
      rate = 27.5;
    }

    if (tax < 0) tax = 0;

    setResult({
      base,
      tax,
      rate: (tax / salary) * 100,
      net: salary - inss - tax
    });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Imposto de Renda" 
        description="Calcule o IRRF mensal sobre seu salário com base na tabela progressiva da Receita Federal." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Imposto de Renda (IRRF)</CardTitle>
          <CardDescription>Simulação mensal baseada na tabela 2024/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salary">Salário Bruto (R$)</Label>
              <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Dependentes</Label>
              <Input id="dependents" type="number" value={dependents} onChange={(e) => setDependents(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calcular Imposto</Button>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Imposto Retido (IRRF):</span>
                <span className="font-bold text-red-600">R$ {result.tax.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold">{result.rate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span>Salário Líquido:</span>
                <span className="font-bold text-green-600 text-lg">R$ {result.net.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-4 italic">
                * Valores aproximados. Não substitui a declaração oficial.
              </p>
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000006"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
