## Entidades:

### Usuario:
id
nomeUsuario
senha
contatos
conversas
estaOnline


### Conversa:
id
usuarios
mensagens

### Mensagem:
id
usuarioQueEnviou
conversa
lida

## Casos de uso usuario:

*cadastro de usuario:
- deve cadastrar um usuario utilizando um nomeDeUsuario e senha;
- não deve permitir cadastrar um usuario com nomeUsuario já existente;

adicionar usuario ao contato:
- verificar se o usuario existe para adicionar no contato;

listar contatos de um usuario
- verificar se o usuario existe

tornar um usuario online
- usuario deve estar cadastrado e não deve estar online

tornar um usuario offline
- usuario deve estar cadastrado e deve estar online

<br>

## Casos de uso conversas:
listar conversas de um usuario
- verificar se o usuario existe

<br>

## Casos de uso mensagens:
mandar mensagem para um usuario
- verificar se o usuario esta online, se estiver notificar, se não apenas armazenar;

ler uma mensagem
- verificar se o usuario esta online, se estiver online marcar mensagem como lida;