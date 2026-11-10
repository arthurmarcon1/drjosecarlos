# Site Dr. José Carlos Schenini (protótipo)

Site de um dentista de Santa Maria/RS, feito pela 3eTec (Arthur). Três páginas estáticas:

- `index.html` (rota `/`): página inicial, marca pessoal "Dr. José Carlos Schenini, Reabilitação Oral". Público: pacientes.
- `cursos.html` (rota `/cursos`): imersão **Esthetic Pro 2027**. Público: dentistas.
- `laboratorio.html` (rota `/laboratorio`): **CS LAB**, laboratório odontológico dentro da clínica.

Stack: HTML + CSS (no `<head>` de cada página) + `js/app.js` (vanilla). Deploy estático na Vercel (`vercel.json` com `cleanUrls`). Sem build.

## Identidade visual
- Cores: preto `#0A0A0B`, off-white `#EFEDE8` / `#F7F6F3`, roxo Esthetic Pro `#9418D6` (texto roxo em fundo claro `#7A12B5`, em fundo escuro `#BE5CF2`), laranja CS LAB `#F07A1F` (texto em fundo claro `#A34708`).
- Logos em `/img`: `sig-light/dark.png` (assinatura), `esthetic-light/dark.png`, `cslab-light/dark.png`, `ep-light.png` (monograma).
- Fotos dos casos e das edições do curso vieram do PDF do cliente (resolução limitada; serão trocadas pelos originais).

## Regras do projeto (sempre seguir)
- **Nunca usar travessão (— ou –)** em nenhum texto. Reescrever a frase com vírgula, ponto, dois-pontos ou parênteses.
- Fonte limpa, sem serifa (ver PROMPTS / decisão de fonte). Nada de fonte Didone/Bodoni.
- Border-radius máximo 8px. Sem glassmorphism. Sem texto em gradiente. Nada com cara de SaaS genérico.
- Textos em pt-BR. Página de cursos fala com "tu" (voz do próprio Dr.); páginas de paciente usam "você".
- Informação que não temos fica como placeholder entre colchetes e destacada, ex.: `[CRO-RS número]`, `[Endereço do consultório]`. Nunca inventar dado (preço, data, número de alunos, depoimento).
- WhatsApp do cliente: 55 99716-7672 (`https://wa.me/5555997167672`).
- Rodapé mantém "Site desenvolvido por 3eTec" com link para https://arthur-portfolio-lps.vercel.app

## Dados confirmados (do PDF do curso)
- Imersão Esthetic Pro, sexta (tarde e noite: aula teórica com 17 temas + happy hour) e sábado (manhã: hands-on de preparos e restaurações em resina; tarde: cimentação de laminados cerâmicos ao vivo).
- Preços: reserva R$ 200 (abatida), à vista R$ 3.800, cartão até 12x total R$ 4.600, entrada R$ 1.600 + 12x R$ 250 no boleto. Garantia de 7 dias, certificado, suporte via WhatsApp.
- Local: U.NOS Coworking em Saúde, Rua Pinheiro Machado, 2350, sala 610, Santa Maria/RS.
- Dr.: natural de Itaqui/RS, Cirurgião-Dentista pela UFN em 2018, especialização em Implantodontia, membro da Sociedade Brasileira de Odontologia Reconstrutiva.

## Pendências (vêm do briefing)
CRO, endereço e horário do consultório, data e vagas da turma 2027, serviços e fotos do CS LAB, se o lab atende outros dentistas (seção "Para dentistas"), depoimentos, domínio.
