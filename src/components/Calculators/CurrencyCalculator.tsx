import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEO } from '@/src/components/SEO';
import { RefreshCw } from 'lucide-react';

export function CurrencyCalculator() {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('BRL');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Usando uma API pública gratuita (exemplo: awesomeapi para BRL)
      const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await response.json();
      setRates(data.rates);
      if (data.rates[to]) {
        setResult(amount * data.rates[to]);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [from]);

  const calculate = () => {
    if (rates[to]) {
      setResult(amount * rates[to]);
    }
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Conversor de Moedas" 
        description="Converta moedas em tempo real com taxas de câmbio atualizadas (Dólar, Euro, Real, etc)." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Conversor de Moedas</CardTitle>
          <CardDescription>Taxas de câmbio em tempo real</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>De</Label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="De" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - Dólar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="BRL">BRL - Real</SelectItem>
                  <SelectItem value="GBP">GBP - Libra</SelectItem>
                  <SelectItem value="JPY">JPY - Iene</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Para</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Para" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">BRL - Real</SelectItem>
                  <SelectItem value="USD">USD - Dólar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - Libra</SelectItem>
                  <SelectItem value="JPY">JPY - Iene</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1">Converter</Button>
            <Button variant="outline" size="icon" onClick={fetchRates} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {result !== null && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Resultado</div>
              <div className="text-4xl font-bold">
                {to} {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground">
                1 {from} = {rates[to]?.toFixed(4)} {to}
              </div>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-9374250998377227"
                  data-ad-slot="0000000007"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
