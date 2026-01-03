import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, TrendingUp, Lock, Zap, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Zap, title: "Rápido", description: "Feche caixa em segundos" },
    { icon: BarChart3, title: "Analítico", description: "Veja todas as estatísticas" },
    { icon: Lock, title: "Seguro", description: "Seus dados protegidos no Firebase" },
    { icon: TrendingUp, title: "Escalável", description: "Cresce com seu negócio" },
  ];

  const pricingPlans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "para sempre",
      description: "Perfeito para testar",
      features: [
        { text: "1 fechamento por dia", included: true },
        { text: "Impressão térmica", included: true },
        { text: "Cálculos precisos", included: true },
        { text: "Fechamentos ilimitados", included: false },
        { text: "Suporte por email", included: false },
      ],
      cta: "Começar Grátis",
      highlighted: false,
    },
    {
      name: "Premium",
      price: "R$ 30",
      period: "por mês",
      description: "Para crecer sem limites",
      features: [
        { text: "Fechamentos ilimitados", included: true },
        { text: "Impressão térmica", included: true },
        { text: "Cálculos precisos", included: true },
        { text: "Histórico completo", included: true },
        { text: "Suporte por email", included: true },
      ],
      cta: "Iniciar Trial Grátis",
      highlighted: true,
      badge: "7 dias grátis",
    },
  ];

  const testimonials = [
    {
      name: "João Silva",
      role: "Dono de Pizzaria",
      text: "Comecei com Fecha-Caixa e economizei 2 horas por dia! Recomendo para todos.",
      avatar: "👨‍💼",
    },
    {
      name: "Maria Santos",
      role: "Gerente de Bar",
      text: "Nunca foi tão fácil fechar caixa. Muito mais seguro e rápido!",
      avatar: "👩‍💼",
    },
    {
      name: "Carlos Costa",
      role: "Loja de Roupas",
      text: "Excelente! A impressão térmica é perfeita. Já indiquei para 3 amigos.",
      avatar: "👨‍💻",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">💰 Fecha-Caixa</div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/login")}>
              Começar Grátis
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Feche seu caixa em <span className="text-blue-600">segundos</span>
            </h1>
            <p className="text-xl text-gray-600">
              Sistema de fechamento de caixa simples, rápido e seguro. Ideal para PDVs,
              pizzarias, bares, lojas e qualquer negócio que precisa fazer contas.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
                onClick={() => navigate("/login")}
              >
                Começar Grátis Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => document.getElementById("pricing")?.scrollIntoView()}
              >
                Ver Planos
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              ✨ 7 dias de trial grátis no Premium • Sem cartão de crédito necessário
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600">Seu dashboard bonito aqui</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-white rounded-2xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Por que escolher Fecha-Caixa?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Uma ferramenta completa para gerenciar seu caixa com segurança e eficiência
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} className="border-2 hover:border-blue-600 transition">
                <CardContent className="pt-6 text-center">
                  <Icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Preços Simples e Justos</h2>
          <p className="text-gray-600 text-lg">Escolha o plano que funciona para você</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <Card
              key={i}
              className={`relative ${
                plan.highlighted ? "border-2 border-blue-600 shadow-2xl scale-105" : "border-2"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {plan.badge}
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold">{plan.price}</div>
                  <p className="text-gray-500 text-sm">{plan.period}</p>
                </div>
                <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  size="lg"
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => navigate("/login")}
                >
                  {plan.cta}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300" />
                      )}
                      <span
                        className={feature.included ? "text-gray-900" : "text-gray-400"}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="border-2">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div className="space-y-6">
          {[
            {
              q: "Quanto custa?",
              a: "Grátis para 1 fechamento/dia. Premium por R$ 30/mês com 7 dias de trial.",
            },
            {
              q: "Meus dados estão seguros?",
              a: "Sim! Usamos Firebase do Google com criptografia de ponta a ponta.",
            },
            {
              q: "Preciso de cartão de crédito para testar?",
              a: "Não! Teste grátis o plano Free. O Premium tem 7 dias grátis sem cartão.",
            },
            {
              q: "Como faço para imprimir?",
              a: "Clique em 'Imprimir' e a nota será aberta. Se tiver impressora térmica, sai automático!",
            },
            {
              q: "Posso cancelar a qualquer momento?",
              a: "Sim! Cancel sua subscrição quando quiser na área de conta.",
            },
          ].map((faq, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white max-w-7xl mx-auto my-12 rounded-2xl px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
        <p className="text-lg mb-8 opacity-90">
          Junte-se a centenas de empresários que já usam Fecha-Caixa
        </p>
        <Button
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
          onClick={() => navigate("/login")}
        >
          Criar Conta Grátis Agora
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Fecha-Caixa</h3>
              <p className="text-gray-400 text-sm">Sistema de fechamento de caixa online</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <p className="text-gray-400 text-sm">
                📧 gabriel.dait@gmail.com<br/>
                💬 WhatsApp (em breve)
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Fecha-Caixa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
