import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SEO } from '@/src/components/SEO';
import { format, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DueDateCalculator() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [result, setResult] = useState<{ dueDate: Date; weeks: number } | null>(null);

  const calculate = () => {
    if (!date) return;
    // Regra de Naegele: DUM + 280 dias
    const dueDate = addDays(date, 280);
    
    // Calcular semanas atuais
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const weeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

    setResult({ dueDate, weeks });
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Calculadora de Data de Parto" 
        description="Calcule a data provável do parto (DPP) e acompanhe em qual semana de gravidez você está." 
      />
      <Card>
        <CardHeader>
          <CardTitle>Data Provável do Parto</CardTitle>
          <CardDescription>Baseado na Data da Última Menstruação (DUM)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Data da Última Menstruação</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={calculate} className="w-full">Calcular Data</Button>

          {result && (
            <div className="mt-6 p-6 bg-muted rounded-lg text-center space-y-4">
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Data Provável do Parto</div>
                <div className="text-3xl font-bold text-pink-600">
                  {format(result.dueDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">Você está aproximadamente na</div>
                <div className="text-xl font-semibold">{result.weeks}ª semana</div>
              </div>
              
              <div className="pt-4 border-t border-border mt-4">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-format="fluid"
                  data-ad-layout-key="-fb+5w+4e-db+86"
                  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                  data-ad-slot="0000000009"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
