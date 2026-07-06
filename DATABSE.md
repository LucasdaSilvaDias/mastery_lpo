# DATABASE - Mastery LPO

## Regras principais

- Atletas se cadastram sozinhos.
- Atletas escolhem plano grátis ou premium.
- Cada atleta possui um nível: iniciante, intermediário, avançado ou master.
- Iniciante, intermediário e avançado recebem treinos padrão por nível.
- Master pode receber treino personalizado.
- O treinador pode alterar o nível do atleta conforme evolução.
- O treinador cria e publica treinos.
- O atleta registra cargas, RPE, observações e conclusão do treino.
- O atleta pode participar do desafio da semana.

## Tabelas iniciais

### profiles

Dados básicos do usuário.

- id
- full_name
- role
- avatar_url
- created_at

### athlete_profiles

Dados específicos do atleta.

- id
- user_id
- athlete_level
- plan_type
- created_at

### exercises

Lista de exercícios.

- id
- name
- category
- description
- created_at

### workouts

Treinos criados pelo treinador.

- id
- title
- level
- plan_type
- is_personalized
- athlete_id
- week_start
- created_by
- created_at

### workout_days

Dias dentro de um treino.

- id
- workout_id
- day_of_week
- title
- created_at

### workout_items

Exercícios dentro de cada bloco de treino.

- id
- workout_block_id
- exercise_id
- sets
- reps
- load_target
- notes
- order_index
- created_at
- selected_video_id

### workout_logs

Registros feitos pelo atleta.

- id
- athlete_id
- workout_item_id
- actual_load
- rpe
- notes
- completed
- created_at

### weekly_challenges

Desafios da semana.

- id
- title
- description
- level
- plan_type
- start_date
- end_date
- created_by
- created_at

### challenge_results

Resultados dos desafios.

- id
- challenge_id
- athlete_id
- result_value
- notes
- created_at    

- O atleta pode escolher qual nível de treino deseja fazer no dia: iniciante, intermediário, avançado ou master.
- O nível do atleta no perfil será apenas uma preferência inicial, não uma limitação.
- O sistema registra qual nível foi escolhido em cada treino realizado.

### workout_blocks

Blocos dentro de cada dia de treino.

- id
- workout_day_id
- title
- description
- order_index
- created_at

### exercise_videos

Vídeos vinculados aos exercícios.

- id
- exercise_id
- title
- video_url
- description
- video_type
- created_at

- O treinador pode cadastrar vários vídeos por exercício.
- O atleta não visualiza todos os vídeos da biblioteca.
- Em cada exercício do treino, o treinador escolhe qual vídeo será mostrado para o atleta.
- O vídeo exibido ao atleta é o vídeo vinculado ao item do treino.