# Pendências do site

Tudo o que está entre colchetes `[ ]` no site e precisa de informação do cliente, mais os pontos a confirmar.
Ao receber o dado, substituir o placeholder (e remover o destaque `ph-hold` / `dark-hold` do elemento).

## Placeholders no site

| Página | Seção | Placeholder | O que precisamos |
|---|---|---|---|
| Início (`index.html`) | Contato, item "Consultório" | `[Endereço do consultório]` | Endereço completo do consultório |
| Início (`index.html`) | Contato, item "Atendimento" | `[Dias e horários]` | Dias e horários de atendimento |
| Início (`index.html`) | Rodapé | `CRO-RS [número]` | Número do CRO do Dr. José Carlos |
| Cursos (`cursos.html`) | Hero, chip da data | `[data da turma]` | Datas (sexta e sábado) da Turma 2027 |
| Cursos (`cursos.html`) | Investimento, texto abaixo do título | `[nº de vagas]` | Número de vagas da Turma 2027 |
| Cursos (`cursos.html`) | Investimento, 4 cards (reserva, à vista, cartão, entrada + boleto) | `[valor]` | Valores do curso foram retirados do protótipo. Decidir se voltam a aparecer ou se ficam "sob consulta" |
| Cursos (`cursos.html`) | Rodapé | `CRO-RS [número]` | Número do CRO (mesmo da home) |
| Laboratório (`laboratorio.html`) | "O que fazemos" | `[lista de serviços a confirmar]` | Lista real de serviços do CS LAB (a lista atual é provisória: laminados e lentes, coroas cerâmicas, enceramento e mock-up, provisórios, peças sobre implante) |
| Laboratório (`laboratorio.html`) | "Conheça o laboratório", galeria | `[Foto da bancada do CS LAB]` | Foto real da bancada do laboratório |
| Laboratório (`laboratorio.html`) | "Conheça o laboratório", galeria | `[Foto de peças finalizadas]` | Foto em close de peças prontas (laminados, coroas, modelos) |
| Laboratório (`laboratorio.html`) | "Para dentistas" (`#parceiros`) | `[manter só se o lab atender outros consultórios]` | Confirmar se o CS LAB recebe casos de outros dentistas. Se não, remover a seção e o link "Para dentistas" do menu |

## A confirmar com o cliente (não estão entre colchetes)

- **Instagram `@cacaloschenini`** (home: seção Instagram e Contato). Confirmar se é o perfil oficial a divulgar.
- **Sigla "SBOR"** (home: hero e "Sobre"). Confirmar se é a sigla usada pela Sociedade Brasileira de Odontologia Reconstrutiva.
- **Grupo de WhatsApp da turma e dúvidas no privado** (cursos: Pós-curso e FAQ). Confirmar se continua valendo para 2027.
- **Fotos dos casos e das edições** vieram do PDF do curso, com resolução limitada. Trocar pelos originais.
- **Depoimentos** de pacientes e alunos: o site não tem nenhum ainda. Só incluir com textos reais e autorização.

## Técnico

- **Domínio**: definir o domínio final. Hoje `og:url`, `og:image` e `twitter:image` apontam para `https://dr-jose-carlos-schenini.vercel.app`; ao ter o domínio, trocar nas 3 páginas e adicionar `<link rel="canonical">`.
- **Imagem de compartilhamento (Open Graph)**: em cursos e laboratório a `og:image` é o logo claro em fundo transparente, que pode sumir em prévias com fundo branco (ex.: WhatsApp). Recomendado gerar imagens 1200x630 com fundo escuro.
- **Revisões de tipografia**: há comentários `/* [revisar: ...] */` no CSS com alternativas de peso e tamanho dos títulos.
