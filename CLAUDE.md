# Site Dr. José Carlos Schenini (protótipo)

Site de um dentista de Santa Maria/RS, feito pela 3eTec (Arthur). Três páginas estáticas:

- `index.html` (rota `/`): página inicial, marca pessoal "Dr. José Carlos Schenini, Reabilitação Oral". Público: pacientes.
- `cursos.html` (rota `/cursos`): imersão **Esthetic Pro 2027**. Público: dentistas.
- `laboratorio.html` (rota `/laboratorio`): **CS LAB**, laboratório odontológico dentro da clínica.

Stack: HTML + CSS (`css/base.css` com o que é comum às 3 páginas; o específico fica no `<style>` de cada página) + `js/app.js` (vanilla). Deploy estático na Vercel (`vercel.json` com `cleanUrls`). Sem build.

## Identidade visual
- **Tema claro, "cara de clínica"** (pedido do cliente em 10/11/2026: menos preto, menos roxo, cores menos fortes). Tokens no `.pg` do `css/base.css`:
  - Fundos: branco `#FFFFFF` e cinza-claro frio `#F4F6F7` (classe `.alt`, alternando seções). Texto grafite `#1E2328`, secundário `#5F6870`, linhas `#E2E6E9`.
  - Acento (início e cursos): roxo suave `#7B4BAF`, tint `#F4EFF9`. CS LAB (`.pg-lab`): laranja queimado `#A9531A`, tint `#FBF2EA`. Os tons vivos (`#9418D6`, `#F07A1F`) ficam só nos logos.
  - Nada de seção preta. Escurecer só sobre foto (degradê para legibilidade).
- Logos em `/img`: use as versões `-dark` (para fundo claro): `sig-dark.png`, `esthetic-dark.png`, `cslab-dark.png`. A `sig-light.png` só aparece sobre a foto do hero. `ep-light.png` é o monograma EP.
- Componentes do `base.css`: `.stats`/`.stat` (faixa de números), `.num[data-count]` / `.num[data-since]` (números que sobem, animados pelo `app.js`), `.vid` (placeholder de vídeo: `vid-169`, `vid-916`, `vid-45`, `vid-wide`), `.dep` (depoimento), `.slot` (placeholder de foto), `.ph-hold` (placeholder de texto).
- Animações respeitam `prefers-reduced-motion`: nesse modo param o que se desloca (faixa, zoom, subida), mas ficam os fades e os números contando.
- Fotos dos casos e das edições do curso vieram do PDF do cliente (resolução limitada; serão trocadas pelos originais).

## Regras do projeto (sempre seguir)
- **Nunca usar travessão (— ou –)** em nenhum texto. Reescrever a frase com vírgula, ponto, dois-pontos ou parênteses.
- Fonte: Montserrat em todo o site (coerente com o logo Esthetic Pro). Títulos grandes em peso 300 com letter-spacing negativo; destaques (`<em>`) só com cor de acento + peso 600, sem itálico. Nada de fonte serifada, Didone ou Bodoni.
- Border-radius máximo 8px. Sem glassmorphism. Sem texto em gradiente. Nada com cara de SaaS genérico.
- Textos em pt-BR. Página de cursos fala com "tu" (voz do próprio Dr.); páginas de paciente usam "você".
- Informação que não temos fica como placeholder entre colchetes e destacada, ex.: `[CRO-RS número]`, `[Endereço do consultório]`. Nunca inventar dado (preço, data, número de alunos, depoimento).
- WhatsApp do cliente: 55 99716-7672 (`https://wa.me/5555997167672`).
- Rodapé mantém "Site desenvolvido por 3eTec" com link para https://arthur-portfolio-lps.vercel.app

## Dados confirmados (do PDF do curso)
- Imersão Esthetic Pro, sexta (tarde e noite: aula teórica com 17 temas + happy hour) e sábado (manhã: hands-on de preparos e restaurações em resina; tarde: cimentação de laminados cerâmicos ao vivo).
- Formas de pagamento: reserva de vaga (abatida do total), à vista, cartão em até 12x, entrada + 12x no boleto. Garantia de 7 dias, certificado, suporte via WhatsApp.
- **Valores e formas de pagamento NÃO aparecem no site** (decisão de 10/11/2026). Tudo é combinado pelo WhatsApp: a seção `#valores` de cursos é só um CTA "Saber valores pelo WhatsApp". Não reintroduzir preços, parcelas ou cards de pagamento sem pedido explícito.
- Local: U.NOS Coworking em Saúde, Rua Pinheiro Machado, 2350, sala 610, Santa Maria/RS.
- Dr.: natural de Itaqui/RS, Cirurgião-Dentista pela UFN em 2018, especialização em Implantodontia, membro da Sociedade Brasileira de Odontologia Reconstrutiva.

## Pendências (vêm do briefing; lista detalhada em `PENDENCIAS.md`)
CRO, endereço e horário do consultório, data e vagas da turma 2027, serviços e fotos do CS LAB, se o lab atende outros dentistas (seção "Para dentistas"), depoimentos, domínio.
