import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function BillSplitter() {
  const [total, setTotal] = useState<number>(100);
  const [people, setPeople] = useState<number>(2);
  const [tip, setTip] = useState<number>(10);
  const [result, setResult] = useState<{ perPerson: number; totalWithTip: number } | null>(null);

  const calculate = () => {
    const totalWithTip = total * (1 + tip / 100);
    const perPerson = totalWithTip / people;
    setResult({ perPerson, totalWithTip });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Divisão de Contas" 
        description="Divida a conta do restaurante ou bar de forma justa entre os amigos, incluindo gorjeta." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Divisão de Contas</CardTitle>
          <CardDescription>Divida a conta com os amigos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total">Valor Total (R$)</Label>
              <Input id="total" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">Pessoas</Label>
              <Input id="people" type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tip">Gorjeta (%)</Label>
              <Input id="tip" type="number" value={tip} onChange={(e) => setTip(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Dividir Conta</Button>

          {result && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Cada um paga</div>
              <div className="text-4xl font-bold">R$ {result.perPerson.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="text-sm text-muted-foreground">Total com gorjeta: R$ {result.totalWithTip.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="0000000005"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
