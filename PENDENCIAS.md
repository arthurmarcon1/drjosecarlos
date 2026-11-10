# Pendências do site

Tudo o que está entre colchetes `[ ]` no site e precisa de informação do cliente, mais os pontos a confirmar.
Ao receber o dado, substituir o placeholder (e remover o `<span class="ph-hold">` em volta).

## Textos e dados

| Página | Seção | Placeholder | O que precisamos |
|---|---|---|---|
| Início | Contato, item "Consultório" | `[Endereço do consultório]` | Endereço completo do consultório |
| Início | Contato, item "Atendimento" | `[Dias e horários]` | Dias e horários de atendimento |
| Início | Rodapé | `CRO-RS [número]` | Número do CRO do Dr. José Carlos |
| Cursos | Hero, chip da data | `[data da turma]` | Datas (sexta e sábado) da Turma 2027 |
| Cursos | Rodapé | `CRO-RS [número]` | Número do CRO (mesmo da home) |
| Laboratório | "O que fazemos" | `[lista de serviços a confirmar]` | Lista real de serviços do CS LAB (a atual é provisória: laminados e lentes, coroas cerâmicas, enceramento e mock-up, provisórios, peças sobre implante) |
| Laboratório | "Para dentistas" (`#parceiros`) | `[manter só se o lab atender outros consultórios]` | Confirmar se o CS LAB recebe casos de outros dentistas. Se não, remover a seção e o link "Para dentistas" do menu |

## Números (faixas com contagem animada)

Para preencher, trocar `<span class="ph-hold">[nº]</span>` por `<span class="num" data-count="350">350</span>` (o número sobe de 0 até o valor quando aparece na tela). Para "+350", escrever `+<span class="num" data-count="350">350</span>`.

| Página | Placeholder | O que precisamos |
|---|---|---|
| Início | `[nº]` Sorrisos planejados no consultório | Número aproximado de pacientes/casos |
| Início | `[nº]` Dentistas que já passaram pela Esthetic Pro | Total de alunos das edições anteriores |
| Cursos | `[nº]` Dentistas que já passaram pela imersão | Mesmo número da home |
| Laboratório | `[nº]` Peças confeccionadas no CS LAB | Número aproximado de peças |
| Laboratório | `[nº]` Anos de laboratório | Desde quando o CS LAB funciona |

Os números já preenchidos vêm de dados confirmados: anos de formado (calculado a partir de 2018, atualiza sozinho), 5 tratamentos da lista da home, 17 temas, 2 dias, 7 dias de garantia e 5 etapas do processo do lab.

## Depoimentos de alunos (cursos, seção "Quem já fez")

3 cards, cada um com: `[Depoimento em vídeo N]`, `[Depoimento do aluno N]` (texto), `[Nome do aluno]`, `[Cidade/UF · Turma 20XX]` e um quadrado para a foto do aluno (`.dep-av`). Só publicar com texto real e autorização de uso de imagem.

## Vídeos

| Página | Placeholder | Sugestão de conteúdo |
|---|---|---|
| Início, seção "Vídeos" | `[Vídeo principal]` (16:9) | Apresentação do Dr. e do consultório |
| Início, seção "Vídeos" | `[Vídeo curto 1]` (vertical) | Ex.: resina ou cerâmica, qual escolher? |
| Início, seção "Vídeos" | `[Vídeo curto 2]` (vertical) | Ex.: bastidores do CS LAB |
| Cursos, "Como é estar lá" | `[Vídeo da imersão]` (faixa larga) | Resumo de uma edição anterior |
| Cursos, "Quem já fez" | `[Depoimento em vídeo 1, 2, 3]` | Depoimentos de alunos |
| Laboratório, "Conheça o laboratório" | `[Vídeo: bastidores do CS LAB]` (faixa larga) | Confecção de uma peça, da bancada à prova |

Como trocar: dentro do `<figure class="vid ...">`, apagar o conteúdo e colocar
`<video src="/videos/arquivo.mp4" poster="/img/capa-do-video.jpg" controls playsinline preload="none"></video>`
ou o `<iframe>` do YouTube/Vimeo. O CSS já faz o vídeo ocupar o quadro. Para vídeos do Instagram, o ideal é baixar o arquivo e hospedar no site (o embed do Instagram é pesado).

## Fotos

| Página | Placeholder | O que precisamos |
|---|---|---|
| Laboratório | `[Foto da bancada do CS LAB]` | Foto real da bancada |
| Laboratório | `[Foto de peças finalizadas]` | Close de peças prontas (laminados, coroas, modelos) |

## A confirmar com o cliente (não estão entre colchetes)

- **Instagram `@cacaloschenini`** (home: seção Instagram e Contato). Confirmar se é o perfil oficial a divulgar.
- **Sigla "SBOR"** (home: hero e "Sobre"). Confirmar se é a sigla usada pela Sociedade Brasileira de Odontologia Reconstrutiva.
- **Grupo de WhatsApp da turma e dúvidas no privado** (cursos: Pós-curso e FAQ). Confirmar se continua valendo para 2027.
- **Fotos dos casos e das edições** vieram do PDF do curso, com resolução limitada. Trocar pelos originais.
- **Valores, formas de pagamento e vagas** não aparecem no site: tudo é tratado pelo WhatsApp (CTA "Saber valores pelo WhatsApp").

## Técnico

- **Domínio**: definir o domínio final. Hoje `og:url`, `og:image` e `twitter:image` apontam para `https://dr-jose-carlos-schenini.vercel.app`; ao ter o domínio, trocar nas 3 páginas e adicionar `<link rel="canonical">`.
- **Imagem de compartilhamento (Open Graph)**: em cursos e laboratório a `og:image` é o logo (versão escura, fundo transparente). Recomendado gerar imagens 1200x630 próprias para compartilhamento.
- **Revisões de tipografia**: há comentários `/* [revisar: ...] */` no CSS com alternativas de peso e tamanho dos títulos.
