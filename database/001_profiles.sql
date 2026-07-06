create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'Atleta',
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;