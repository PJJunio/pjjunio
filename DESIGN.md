# Reformulação do Portfólio — Design Document

## Understanding Summary

- Reformular o portfólio pessoal (paulodjunior.dev) para padrões de mercado atuais, servindo dois públicos simultâneos: recrutadores (vaga CLT/PJ) e clientes freelance/consultoria.
- Mercado/idioma: Brasil + internacional, com toggle PT-BR (padrão) / EN.
- Stack: migração de HTML/CSS/JS vanilla para Astro (SSG), site 100% estático, publicado no GitHub Pages com domínio próprio (CNAME preservado).
- Estrutura: multi-page — home enxuta + rota própria por projeto, sem narrativa de case study completa.
- Visual: layout bento grid na seção de projetos + toggle light/dark, preservando a identidade visual de base (paleta azul, tom atual).
- Projetos em destaque: mantém os 5 atuais (SIAS – Agiliza Educa, ClickParcela, Autêntica Importados, PDV ModernoMS, PlutusGrip).
- Contato: só links diretos (WhatsApp, e-mail, LinkedIn) — sem formulário, sem analytics.
- Currículo: mantém só o PDF em PT-BR por enquanto.
- Sem prazo/urgência — escopo completo de uma vez.

## Assumptions

- SEO: meta tags, Open Graph e sitemap.xml em cada página.
- Acessibilidade: HTML semântico, contraste adequado nos dois temas, navegação por teclado, alt text nas imagens.
- Assets visuais atuais (SVGs/imagens dos projetos) são reaproveitados no bento grid; podem precisar de ajuste de enquadramento, sem geração de arte nova.
- Tradução EN é feita a partir do conteúdo PT-BR existente durante a implementação; o usuário revisa depois.
- Conteúdo de cada projeto usa as descrições/stacks já existentes no `index.html`/README, sem levantamento de conteúdo novo (não há case study).
- Hospedagem permanece 100% estática, sem backend.

## Decision Log

| Decisão | Alternativas consideradas | Por quê |
|---|---|---|
| Dupla finalidade (vaga + freelance) | Só vaga / só freelance | Usuário confirmou os dois públicos simultaneamente |
| Bilíngue PT/EN com toggle | Só PT / Só EN | Amplia alcance sem abandonar mercado local |
| Stack: Astro | Vanilla HTML/CSS/JS / Next.js | Padrão de mercado pra portfólio estático, i18n nativo, menos overhead que Next |
| Sem case studies | Case study completo por projeto | Conteúdo dependeria de repositórios privados; usuário cancelou o escopo |
| Multi-page (rota própria por projeto) | Single-page com expansão inline | Mantido por SEO/compartilhamento mesmo sem case study |
| Bento grid + light/dark toggle | Manter cards uniformes atuais | Usuário pediu explicitamente as duas tendências |
| Mantém os 5 projetos atuais | Incluir esquenta-io/hypr-laptop-profile | Foco em projetos back-end robustos, evitar diluir posicionamento |
| Só links diretos de contato | Form estático / Analytics | Simplicidade, site 100% estático, sem coleta de dados |
| Currículo só PT-BR por ora | PDF bilíngue | Fora do escopo agora |
| Deploy via GitHub Actions | Build manual + commit do `dist/` | Mantém fluxo de `git push` simples, sem passo manual |
| Abordagem: Astro + Content Collections + i18n nativo + Tailwind | CSS atual adaptado / i18n client-side sem rota | Melhor manutenção a longo prazo, alinhado a "padrões novos de mercado" |

## Final Design

### Arquitetura e estrutura de pastas

```
src/
  content/
    projects/
      pt/sias-agiliza-educa.json
      pt/clickparcela.json
      pt/autentica-importados.json
      pt/pdv-modernoms.json
      pt/plutusgrip.json
      en/<mesmas chaves, traduzido>
  layouts/
    BaseLayout.astro       → <head>, header, footer, theme script
  components/
    Header.astro, Nav.astro, ThemeToggle.astro, LangToggle.astro
    ProjectCard.astro, BentoGrid.astro
  pages/
    index.astro             → home em PT ("/")
    projetos/[slug].astro   → página de projeto em PT
    en/index.astro          → home em EN ("/en/")
    en/projects/[slug].astro
  styles/
    global.css              → tokens Tailwind (cores, dark/light)
public/
  IMG/, curriculo_paulo.pdf, CNAME
astro.config.mjs            → i18n config, site: paulodjunior.dev
```

- `astro:i18n` gera o prefixo `/en/` e o `hreflang` automaticamente.
- Content Collections com schema Zod garantem paridade de campos entre PT e EN (erro de build se faltar tradução).
- `CNAME` e o PDF do currículo seguem em `public/`, copiados como estão no build.

### Schema de conteúdo

```ts
{
  title: string,
  badge: string,          // ex: "Em produção", "SaaS", "E-commerce"
  description: string,
  stack: string[],
  status: "private" | "public",
  repoUrl?: string,       // só quando status = "public"
  image: string,
  order: number           // posição no bento grid
}
```
O `slug` do arquivo é o identificador comum entre PT e EN, garantindo que as duas versões de um projeto nunca dessincronizem.

### Navegação de idioma e tema

- `<LangToggle>` troca PT⇄EN mantendo a rota atual (ex: `/projetos/plutusgrip` → `/en/projects/plutusgrip`), sem redirecionar pra home.
- `<ThemeToggle>` grava preferência em `localStorage`, aplica classe `dark` no `<html>` via script inline no `<head>` (evita flash de tema errado).
- Tokens de cor atuais (`--primary-color`, `--bg-dark` etc.) viram variáveis mapeadas pros tokens do Tailwind; paleta azul preservada em ambos os temas, com conjunto equivalente criado para o tema claro.
- Edge case: build falha (Zod) se faltar tradução de um projeto — nunca vai pro ar incompleto.

### Páginas

**Home (`/` e `/en/`)**: Hero, Sobre, Habilidades — conteúdo atual reorganizado em componentes e traduzido. Projetos em `<BentoGrid>` com células de tamanho variável (SIAS e ClickParcela maiores; PlutusGrip e PDV ModernoMS menores), informação essencial (nome, badge, stack) visível sem depender de hover. Contato mantém os mesmos links diretos.

**Página de projeto (`/projetos/[slug]`)**: título, badge de status, descrição, stack completa, imagem maior, CTA (link pro repo se público, selo "repositório privado" se não), botão voltar e bloco simples de "outros projetos" no rodapé.

### Deploy (GitHub Actions)

```yaml
on: push to main
steps:
  - checkout
  - setup node
  - npm ci
  - astro build      # gera dist/ com pt e en, respeita public/CNAME
  - deploy dist/ → GitHub Pages
```
Fluxo do usuário não muda: `git push` na `main` publica sozinho, CNAME preservado, domínio intacto.

### QA antes de publicar

- Build falha se faltar tradução ou referência quebrada nas Content Collections.
- Checagem manual de Lighthouse (performance/SEO/acessibilidade).
- Teste responsivo (mobile/desktop) nos dois temas antes do merge.
