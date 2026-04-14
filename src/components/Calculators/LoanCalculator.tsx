import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function LoanCalculator() {
  const [amount, setAmount] = useState<number>(5000);
  const [interest, setInterest] = useState<number>(3.5);
  const [months, setMonths] = useState<number>(12);
  const [result, setResult] = useState<{ monthly: number; total: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const monthlyRate = interest / 100;
    const n = months;

    if (monthlyRate === 0) {
      setResult({ monthly: amount / n, total: amount, totalInterest: 0 });
      return;
    }

    const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = monthly * n;
    const totalInterest = total - amount;

    setResult({ monthly, total, totalInterest });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Empréstimo" 
        description="Simule empréstimos pessoais e saiba quanto você vai pagar de juros e o valor das parcelas." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Empréstimo Pessoal</CardTitle>
          <CardDescription>Simule o valor das parcelas do seu empréstimo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor do Empréstimo (R$)</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">Juros Mensais (%)</Label>
              <Input id="interest" type="number" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="months">Parcelas (meses)</Label>
              <Input id="months" type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Simular Empréstimo</Button>

          {result && (
            <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Parcela Mensal:</span>
                <span className="font-bold">R$ {result.monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Total a Pagar:</span>
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
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000011"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
