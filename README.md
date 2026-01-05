# 📰 Linha Direta News - Documentação Rápida

## ✅ Links Essenciais para Desenvolvimento

### 🌐 Aplicação em Produção
- **Blog (Site Principal)**: https://linha-direta-news.vercel.app/
- **Admin Panel (Painel Admin)**: https://linha-direta-news.vercel.app/admin
  - Usuário: admin (ou token Sanity)
  - Senha: Sanity API Write Token

---

## 🔧 Plataformas de Desenvolvimento

### 📁 GitHub (Código-fonte)
- **Repositório**: https://github.com/linhadiretanewsbr-blog/linha-direta-news
- **Arquivos principais**:
  - App.jsx: https://github.com/linhadiretanewsbr-blog/linha-direta-news/blob/main/src/App.jsx
  - index.html: https://github.com/linhadiretanewsbr-blog/linha-direta-news/blob/main/index.html
  - package.json: https://github.com/linhadiretanewsbr-blog/linha-direta-news/blob/main/package.json

### 🚀 Vercel (Deploy/Hospedagem)
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Projeto Linha Direta News**: https://vercel.com/linhadiretanewsbr-blog/linha-direta-news
- **Monitoramento de Deployments**: https://vercel.com/linhadiretanewsbr-blog/linha-direta-news/deployments

### 📊 Sanity CMS (Banco de Dados)
- **Sanity Studio (Editor)**: https://hun2hrsa.sanity.studio/
- **Sanity Dashboard (Manage)**: https://sanity.io/manage
- **API Documentation**: https://www.sanity.io/docs/api
- **Project ID**: hun2hrsa
- **Dataset**: production

### 🖼️ Cloudinary (Gerenciador de Imagens)
- **Console Cloudinary**: https://console.cloudinary.com/app/c-8b50794f352e8b0111afbb1fdec343/assets/media_library/search
- **Cloud Name**: dadfuitf9
- **Media Library (Upload de Imagens)**: https://console.cloudinary.com/app/c-8b50794f352e8b0111afbb1fdec343/assets/media_library

---

## 📋 Workflow Padrão (Passo a Passo)

### 1️⃣ Fazer Alterações no Código
1. Abrir **GitHub**: https://github.com/linhadiretanewsbr-blog/linha-direta-news
2. Editar arquivo desejado (ex: App.jsx)
3. Commit com mensagem descritiva

### 2️⃣ Deploy Automático
1. Vercel faz deploy automaticamente
2. Monitorar em: https://vercel.com/linhadiretanewsbr-blog/linha-direta-news/deployments
3. Testar em: https://linha-direta-news.vercel.app/

### 3️⃣ Adicionar/Editar Notícias
1. Fazer login no **Admin Panel**: https://linha-direta-news.vercel.app/admin
2. Preencher formulário (Título, Resumo, Conteúdo, Categoria, Autor, URL Imagem)
3. Clicar "Publicar Notícia"
4. Dados são salvos no Sanity automaticamente

### 4️⃣ Gerenciar Imagens
1. Fazer upload em **Cloudinary**: https://console.cloudinary.com/app/c-8b50794f352e8b0111afbb1fdec343/assets/media_library
2. Copiar URL da imagem
3. Colar a URL no campo "URL DA IMAGEM" do painel admin

---

## 🎨 Configurações do Projeto

### Cores Oficiais
- **Verde Escuro**: #1B5E20
- **Dourado**: #FFD700
- **Branco**: #FFFFFF
- **Cinza**: #333333

### Categorias de Notícias
- Política Nacional
- Geopolítica
- Economia
- Brasil
- Mundo
- Análise

### Stack Tecnológico
- **Frontend**: React + Vite
- **CMS**: Sanity
- **Hospedagem**: Vercel
- **Imagens**: Cloudinary
- **Versionamento**: Git + GitHub
- **UI/CSS**: Tailwind CSS + Lucide Icons

---

## 🔑 Credenciais (Armazenar com Segurança)

| Serviço | Usuário/Email | Token/Senha | Status |
|---------|---------------|------------|--------|
| GitHub | [Seu GitHub] | SSH/Token | ✅ Configurado |
| Vercel | [Seu Email] | Conectado ao GitHub | ✅ Configurado |
| Sanity | hun2hrsa | API Write Token | ✅ Configurado |
| Cloudinary | dadfuitf9 | API Key | ✅ Configurado |

---

## ⚡ Comandos Rápidos

```bash
# Clonar repositório
git clone https://github.com/linhadiretanewsbr-blog/linha-direta-news.git

# Instalar dependências
npm install

# Rodar localmente (desenvolvimento)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 📝 Checklist de Finalização

- [ ] Blog funcionando em produção
- [ ] Imagens carregando corretamente
- [ ] Painel admin funcionando
- [ ] Notícias publicadas com sucesso
- [ ] SEO configurado
- [ ] Busca funcional
- [ ] Compartilhamento social
- [ ] Newsletter ativa
- [ ] Domínio customizado configurado
- [ ] SSL ativado

---

## 📞 Suporte Rápido

**Problema**: Imagem não aparece
- Verificar URL da imagem (deve ser HTTPS)
- Testar em https://console.cloudinary.com

**Problema**: Notícia não aparece no blog
- Verificar se foi publicada no Admin Panel
- Fazer refresh F5 no blog
- Limpar cache (Ctrl+Shift+R)

**Problema**: Deploy não funcionou
- Verificar GitHub commits
- Acessar https://vercel.com/linhadiretanewsbr-blog/linha-direta-news/deployments
- Verificar logs do Vercel

---

## 🎯 Próximas Funcionalidades

- [ ] Busca funcional
- [ ] Paginação
- [ ] Compartilhar em redes sociais
- [ ] Newsletter ativa
- [ ] Comentários
- [ ] Tags/Etiquetas
- [ ] SEO otimizado
- [ ] Analytics (Google Analytics)

---

**Última atualização**: 05/01/2026
**Status**: ✅ Em Desenvolvimento
**Versão**: 1.0
