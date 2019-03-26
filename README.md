# Desafio Checkplant

Criar um app utilizando a plataforma React Native com as seguintes características:

A tela principal do app, será um mapa com alguns pinos, e mais dois botões: Adicionar e
Sincronizar.

Adicionar:

• O botão de Adicionar abre um formulário para o usuário digitar uma anotação, em um
campo de texto longo, permitindo nova linha, etc...

• Ao salvar o texto, pegar a localização de GPS do app e a data/hora do momento e
salvar no banco local do app.

• Esta operação de Adicionar deve funcionar 100% offline, onde o usuário pode
registrar anotações sem ter sinal de internet 3G ou Wifi.


Sincronizar:

• Ao tocar em sincronizar, exibir a informação “Sincronização em andamento...” e,
durante este processo, executar a seguinte tarefa:

• Para cada Anotação não sincronizada, enviar um post para uma API criada para este
teste.

• Atenção: Não enviar anotações já sincronizadas.

• Se der certo, você vai receber um e‐mail com os dados enviados.


Dados da API:

POST URL: https://hooks.zapier.com/hooks/catch/472009/09rj5z/?
email_key=SEU@EMAIL.AQUI
BODY TEMPLATE (APPLICATION/JSON):
{
"latitude": 4645645,
"longitude": 88787,
"annotation": "primeira anotação",
"datetime": "2019-01-01 13:17:14"
}


Pinos do Mapa:

• Para cada anotação registrada pelo usuário, deve ser exibido um pino no mapa, no
ponto exato da localização capturada no momento em que a anotação foi registrada.

• Ao tocar no pino, mostrar a informação da anotação, com data e hora.
Os pinos de anotações já sincronizadas, devem ser pintados de cinza, e os pinos de
anotações não sincronizadas, devem ser pintados de verde.

• Os pinos do mapa devem ser exibidos mesmo que não tenha internet.

