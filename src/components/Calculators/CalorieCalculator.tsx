import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEO } from '@/src/components/SEO';

export function CalorieCalculator() {
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<string>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [activity, setActivity] = useState<string>('1.2');
  const [result, setResult] = useState<{ tmb: number; maintenance: number; lose: number; gain: number } | null>(null);

  const calculate = () => {
    let tmb = 0;
    if (gender === 'male') {
      tmb = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      tmb = 447.59 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    const maintenance = tmb * Number(activity);
    setResult({
      tmb,
      maintenance,
      lose: maintenance - 500,
      gain: maintenance + 500
    });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Calorias" 
        description="Calcule sua Taxa Metabólica Basal (TMB) e quantas calorias você precisa para manter, perder ou ganhar peso." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Calorias</CardTitle>
          <CardDescription>Calcule sua necessidade calórica diária</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Idade</Label>
              <Input id="age" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Gênero</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Nível de Atividade</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger>
                  <SelectValue placeholder="Atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentário (pouco ou nenhum exercício)</SelectItem>
                  <SelectItem value="1.375">Levemente ativo (1-3 dias/semana)</SelectItem>
                  <SelectItem value="1.55">Moderadamente ativo (3-5 dias/semana)</SelectItem>
                  <SelectItem value="1.725">Muito ativo (6-7 dias/semana)</SelectItem>
                  <SelectItem value="1.9">Extremamente ativo (atleta, 2x/dia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculate} className="w-full">Calcular Calorias</Button>

          {result && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xs text-muted-foreground uppercase">Manutenção</div>
                <div className="text-2xl font-bold">{Math.round(result.maintenance)} kcal</div>
              </div>
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
                <div className="text-xs text-green-700 dark:text-green-400 uppercase">Perda de Peso</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">{Math.round(result.lose)} kcal</div>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
                <div className="text-xs text-blue-700 dark:text-blue-400 uppercase">Ganho de Massa</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{Math.round(result.gain)} kcal</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-xs text-muted-foreground uppercase">TMB</div>
                <div className="text-2xl font-bold">{Math.round(result.tmb)} kcal</div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center sm:col-span-2">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000008"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
