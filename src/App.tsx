/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinancingCalculator } from './components/Calculators/FinancingCalculator';
import { LoanCalculator } from './components/Calculators/LoanCalculator';
import { IncomeTaxCalculator } from './components/Calculators/IncomeTaxCalculator';
import { CurrencyCalculator } from './components/Calculators/CurrencyCalculator';
import { BMICalculator } from './components/Calculators/BMICalculator';
import { CalorieCalculator } from './components/Calculators/CalorieCalculator';
import { DueDateCalculator } from './components/Calculators/DueDateCalculator';
import { Salary13Calculator } from './components/Calculators/Salary13Calculator';
import { BillSplitter } from './components/Calculators/BillSplitter';
import { FuelCalculator } from './components/Calculators/FuelCalculator';
import { GoogleAds } from './components/GoogleAds';
import { 
  Calculator, Heart, Wallet, Utensils, Baby, Fuel, Users, 
  TrendingUp, Landmark, DollarSign, Menu, ChevronDown, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

const CALCULATORS = [
  { id: 'financing', label: 'Financiamento', icon: TrendingUp, color: 'text-blue-500' },
  { id: 'loan', label: 'Empréstimo', icon: Landmark, color: 'text-indigo-500' },
  { id: 'tax', label: 'Imposto', icon: Wallet, color: 'text-green-600' },
  { id: 'currency', label: 'Câmbio', icon: DollarSign, color: 'text-emerald-500' },
  { id: 'bmi', label: 'IMC', icon: Heart, color: 'text-red-500' },
  { id: 'calories', label: 'Calorias', icon: Utensils, color: 'text-orange-500' },
  { id: 'duedate', label: 'Parto', icon: Baby, color: 'text-pink-500' },
  { id: 'salary13', label: '13º Salário', icon: Wallet, color: 'text-yellow-600' },
  { id: 'splitter', label: 'Contas', icon: Users, color: 'text-purple-500' },
  { id: 'fuel', label: 'Combustível', icon: Fuel, color: 'text-amber-600' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('financing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleTabChange('financing')}>
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
                <Calculator className="h-5 w-5" />
              </div>
              <h1 className="text-lg font-bold tracking-tight hidden sm:block">MultiCalc</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleTabChange('financing')}>Início</Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Calculadoras <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Todas as Opções</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-[300px]">
                    {CALCULATORS.map((calc) => (
                      <DropdownMenuItem 
                        key={calc.id} 
                        onClick={() => handleTabChange(calc.id)}
                        className="gap-2 cursor-pointer"
                      >
                        <calc.icon className={`h-4 w-4 ${calc.color}`} />
                        <span>{calc.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm">Sobre</Button>
              <Button variant="ghost" size="sm">Contato</Button>
            </nav>

            {/* Mobile Menu & Search */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
              
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      MultiCalc
                    </SheetTitle>
                    <SheetDescription>
                      Escolha uma calculadora abaixo
                    </SheetDescription>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-120px)] p-4">
                    <div className="grid grid-cols-1 gap-1">
                      {CALCULATORS.map((calc) => (
                        <Button
                          key={calc.id}
                          variant={activeTab === calc.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-3 h-12 text-base font-medium"
                          onClick={() => handleTabChange(calc.id)}
                        >
                          <calc.icon className={`h-5 w-5 ${calc.color}`} />
                          {calc.label}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              <Button variant="default" size="sm" className="hidden sm:flex">
                Favoritos
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-5xl">
          <div className="text-center mb-8 md:mb-12 space-y-3">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight px-4">
              Todas as calculadoras em um só lugar
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-4">
              Ferramentas simples, rápidas e precisas para facilitar o seu dia a dia.
              Finanças, saúde, utilitários e muito mais.
            </p>
          </div>

          <GoogleAds slot="0000000001" className="mb-8" />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative mb-8">
              <div className="overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                <TabsList className="inline-flex w-auto min-w-full md:flex md:w-full h-auto p-1 bg-muted/50 rounded-xl">
                  {CALCULATORS.map((calc) => (
                    <TabsTrigger 
                      key={calc.id}
                      value={calc.id} 
                      className="flex flex-col gap-1.5 py-3 px-4 min-w-[90px] md:flex-1 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all"
                    >
                      <calc.icon className={`h-4 w-4 ${calc.color}`} />
                      <span className="text-[10px] uppercase font-bold tracking-wider">{calc.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {/* Fade effect for mobile scroll */}
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
            </div>

            <div className="mt-2">
              <TabsContent value="financing" className="mt-0 focus-visible:outline-none">
                <FinancingCalculator />
              </TabsContent>
              <TabsContent value="loan" className="mt-0 focus-visible:outline-none">
                <LoanCalculator />
              </TabsContent>
              <TabsContent value="tax" className="mt-0 focus-visible:outline-none">
                <IncomeTaxCalculator />
              </TabsContent>
              <TabsContent value="currency" className="mt-0 focus-visible:outline-none">
                <CurrencyCalculator />
              </TabsContent>
              <TabsContent value="bmi" className="mt-0 focus-visible:outline-none">
                <BMICalculator />
              </TabsContent>
              <TabsContent value="calories" className="mt-0 focus-visible:outline-none">
                <CalorieCalculator />
              </TabsContent>
              <TabsContent value="duedate" className="mt-0 focus-visible:outline-none">
                <DueDateCalculator />
              </TabsContent>
              <TabsContent value="salary13" className="mt-0 focus-visible:outline-none">
                <Salary13Calculator />
              </TabsContent>
              <TabsContent value="splitter" className="mt-0 focus-visible:outline-none">
                <BillSplitter />
              </TabsContent>
              <TabsContent value="fuel" className="mt-0 focus-visible:outline-none">
                <FuelCalculator />
              </TabsContent>
            </div>
          </Tabs>

          <GoogleAds slot="0000000012" className="mt-12" />
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card mt-auto">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">MultiCalc</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sua plataforma definitiva de ferramentas online. Desenvolvida para ser rápida, segura e gratuita para todos.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider">Categorias</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li><button onClick={() => handleTabChange('financing')} className="hover:text-primary">Finanças</button></li>
                  <li><button onClick={() => handleTabChange('bmi')} className="hover:text-primary">Saúde</button></li>
                  <li><button onClick={() => handleTabChange('fuel')} className="hover:text-primary">Utilitários</button></li>
                  <li><button onClick={() => handleTabChange('tax')} className="hover:text-primary">Impostos</button></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-primary">Privacidade</a></li>
                  <li><a href="#" className="hover:text-primary">Cookies</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-xs text-muted-foreground">MultiCalc © 2024. Todos os direitos reservados.</span>
              <div className="flex gap-4">
                {/* Social icons could go here */}
              </div>
            </div>
            
            <p className="text-[10px] text-muted-foreground text-center mt-8 leading-relaxed">
              AVISO: As calculadoras fornecidas neste site são apenas para fins informativos e não constituem aconselhamento financeiro, jurídico ou médico profissional. Sempre consulte um especialista qualificado antes de tomar decisões importantes.
            </p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}
