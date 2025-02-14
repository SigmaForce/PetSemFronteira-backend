-- Usuários (ONGs e usuários comuns)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nick_name VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birthdate Date NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(10) CHECK (role IN ('USER', 'ONG', 'ADMIN')) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Animais para adoção/resgate
CREATE TABLE animals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    gender VARCHAR(50) CHECK (gender IN ('Male', 'Female')) NOT NULL,
    breed VARCHAR(100),
    age INT,
    size VARCHAR(20),
    status VARCHAR(50) CHECK (status IN ('Disponível', 'Adotado', 'Resgatado')) NOT NULL,
    description TEXT,
    image_url TEXT,
    location VARCHAR(50), 
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Criando um gatilho para atualizar o updated_at automaticamente
CREATE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Associando o gatilho à tabela de animais
CREATE TRIGGER trigger_update_updated_at
BEFORE UPDATE ON animals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


-- Solicitações de adoção
CREATE TABLE adoptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    status VARCHAR(20) CHECK (status IN ('Pendente', 'Aprovado', 'Rejeitado')) DEFAULT 'Pendente',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Pedidos de resgate
CREATE TABLE rescues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    animal_id UUID NULL REFERENCES animals(id) ON DELETE SET NULL, -- Pode ser nulo, caso seja um animal sem cadastro
    description TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Pendente', 'Em andamento', 'Concluído')) DEFAULT 'Pendente',
    location VARCHAR(50), 
    created_at TIMESTAMP DEFAULT NOW()
);

-- Publicações para a "rede social" do animal (futuro)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Comentários nas publicações
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Curtidas nas publicações
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
