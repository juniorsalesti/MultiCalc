import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SEO } from '@/src/components/SEO';

export function BMICalculator() {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(1.75);
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const bmi = weight / (height * height);
    let category = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Abaixo do peso';
      color = 'text-blue-500';
    } else if (bmi < 25) {
      category = 'Peso normal';
      color = 'text-green-500';
    } else if (bmi < 30) {
      category = 'Sobrepeso';
      color = 'text-yellow-500';
    } else if (bmi < 35) {
      category = 'Obesidade Grau I';
      color = 'text-orange-500';
    } else if (bmi < 40) {
      category = 'Obesidade Grau II';
      color = 'text-red-500';
    } else {
      category = 'Obesidade Grau III';
      color = 'text-red-700';
    }

    setResult({ bmi, category, color });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de IMC" 
        description="Calcule seu Índice de Massa Corporal (IMC) e saiba se você está no peso ideal." 
      />
      <Card>
        <CardHeader>
          <CardTitle><h1>Calculadora de IMC</h1></CardTitle>
          <CardDescription>Descubra seu Índice de Massa Corporal e saiba se está no peso ideal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert mb-4 text-muted-foreground">
            <p>
              O <strong>Índice de Massa Corporal (IMC)</strong> é uma medida internacional usada para calcular se uma pessoa está no peso ideal. 
              É um método rápido e fácil para avaliar o nível de gordura corporal de cada pessoa, sendo um preditor de saúde adotado pela Organização Mundial da Saúde (OMS).
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" step="0.1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altura (m)</Label>
              <Input id="height" type="number" step="0.01" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calcular IMC</Button>

          {result && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Seu IMC é</div>
              <div className="text-4xl font-bold">{result.bmi.toFixed(1)}</div>
              <div className={`text-xl font-semibold ${result.color}`}>{result.category}</div>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="0000000003"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
