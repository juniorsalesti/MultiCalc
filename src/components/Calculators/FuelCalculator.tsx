import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function FuelCalculator() {
  const [gasoline, setGasoline] = useState<number>(5.80);
  const [ethanol, setEthanol] = useState<number>(3.90);
  const [result, setResult] = useState<{ ratio: number; recommendation: string; color: string } | null>(null);

  const calculate = () => {
    const ratio = ethanol / gasoline;
    let recommendation = '';
    let color = '';

    if (ratio <= 0.7) {
      recommendation = 'Abasteça com ETANOL';
      color = 'text-green-600';
    } else {
      recommendation = 'Abasteça com GASOLINA';
      color = 'text-blue-600';
    }

    setResult({ ratio, recommendation, color });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Combustível: Álcool ou Gasolina?" 
        description="Saiba qual combustível compensa mais para o seu bolso: Etanol ou Gasolina." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Álcool ou Gasolina?</CardTitle>
          <CardDescription>Compare os preços e economize no posto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gasoline">Preço da Gasolina (R$)</Label>
              <Input id="gasoline" type="number" step="0.01" value={gasoline} onChange={(e) => setGasoline(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ethanol">Preço do Etanol (R$)</Label>
              <Input id="ethanol" type="number" step="0.01" value={ethanol} onChange={(e) => setEthanol(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Comparar</Button>

          {result && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Relação: {(result.ratio * 100).toFixed(1)}%</div>
              <div className={`text-2xl font-bold ${result.color}`}>{result.recommendation}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Geralmente o etanol compensa se custar até 70% do valor da gasolina.
              </p>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000004"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
