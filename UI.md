# UI - Mastery LPO

## Conceito principal

O Mastery LPO não deve mostrar apenas uma lista de exercícios.

Ele deve guiar o atleta durante o treino, como uma jornada:

Dashboard → Treino do dia → Blocos → Exercícios → Finalização → Histórico

---

## Atleta

### Dashboard

Objetivo: mostrar rapidamente o que importa hoje.

Elementos:
- Saudação
- Treino de hoje
- Botão iniciar treino
- Desafio da semana
- Sequência de treinos
- Últimos recordes
- Menu inferior no celular

---

### Escolha do treino

Para atletas Free/Premium:

Opções:
- Iniciante
- Intermediário
- Avançado

Para atletas do Programa Master:

- Mostrar diretamente o treino personalizado.

---

### Tela de treino

O treino será dividido em blocos.

Exemplo:
- Aquecimento
- Mobilidade
- Técnica
- Força
- Acessórios
- Alongamento

Cada bloco possui 3 estados:

#### Não iniciado
- Cinza
- Fechado

#### Em andamento
- Colorido
- Aberto
- Mostra exercícios

#### Concluído
- Verde
- Fechado

Regra:
- O atleta marca exercícios como concluídos.
- Quando todos os exercícios de um bloco forem concluídos, o bloco fica concluído automaticamente.
- O próximo bloco abre automaticamente.

---

### Card de exercício

Cada exercício pode mostrar:
- Nome
- Séries
- Repetições
- Carga sugerida
- Observações
- Vídeo indicado pelo treinador
- Campo para registrar carga usada
- Campo para registrar RPE
- Campo para observações do atleta
- Checkbox de conclusão

---

### Finalização do treino

Quando todos os blocos forem concluídos:

Mostrar:
- Treino concluído
- Total de exercícios feitos
- Tempo aproximado
- Carga total movimentada
- Sequência atual
- Botão voltar ao dashboard

---

### Histórico

Mostrar:
- Treinos concluídos
- Data
- Nível escolhido
- Cargas registradas
- Observações
- Evolução

---

## Treinador

### Dashboard do treinador

Elementos:
- Treinos publicados
- Atletas ativos
- Atletas do Programa Master
- Desafio da semana
- Botão criar treino

---

### Criar treino

O treinador deve conseguir:
- Escolher tipo de treino:
  - Padrão
  - Personalizado
- Escolher nível:
  - Iniciante
  - Intermediário
  - Avançado
- Escolher atleta, se for personalizado
- Criar dias
- Criar blocos
- Adicionar exercícios
- Escolher vídeo indicado para cada exercício
- Publicar treino

---

### Biblioteca de vídeos

Regra:
- O treinador cadastra vídeos por exercício.
- O atleta não vê a biblioteca inteira.
- O atleta vê apenas o vídeo escolhido pelo treinador dentro do treino.

---

### Desafio da semana

O treinador deve conseguir:
- Criar desafio
- Definir descrição
- Definir período
- Publicar
- Ver resultados