import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function FinancingCalculator() {
  const [value, setValue] = useState<number>(100000);
  const [downPayment, setDownPayment] = useState<number>(20000);
  const [interest, setInterest] = useState<number>(10);
  const [months, setMonths] = useState<number>(360);
  const [result, setResult] = useState<{ monthly: number; total: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const principal = value - downPayment;
    const monthlyRate = interest / 100 / 12;
    const n = months;

    if (monthlyRate === 0) {
      const monthly = principal / n;
      setResult({ monthly, total: principal, totalInterest: 0 });
      return;
    }

    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = monthly * n;
    const totalInterest = total - principal;

    setResult({ monthly, total, totalInterest });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Financiamento" 
        description="Calcule as parcelas do seu financiamento imobiliário ou de veículos com juros compostos." 
      />
      <Card>
        <CardHeader>
          <CardTitle><h1>Financiamento</h1></CardTitle>
          <CardDescription>Simule as parcelas do seu financiamento imobiliário ou de veículos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert mb-4 text-muted-foreground">
            <p>
              Nossa <strong>calculadora de financiamento</strong> utiliza o sistema de amortização francês (Tabela Price) para ajudar você a planejar a compra da sua casa própria ou carro novo. 
              Basta inserir o valor total, a entrada e a taxa de juros para ver o valor exato da sua parcela mensal.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor do Bem (R$)</Label>
              <Input id="value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Entrada (R$)</Label>
              <Input id="downPayment" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">Taxa de Juros Anual (%)</Label>
              <Input id="interest" type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="months">Prazo (meses)</Label>
              <Input id="months" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calcular</Button>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Parcela Mensal:</span>
                <span className="font-bold">R$ {result.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Pago:</span>
                <span className="font-bold">R$ {result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span>Total em Juros:</span>
                <span>R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="0000000002"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
