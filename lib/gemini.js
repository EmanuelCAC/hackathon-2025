import axios from "axios"

const context = `
Pontos Turisticos de Caraguatatuba:
[
  {
    "description": "Trilha da praia brava",
    "foto": "https://firebasestorage.googleapis.com/v0/b/hackathon2025-20130.firebasestorage.app/o/trilha_praia_brava.jpg?alt=media&token=974791b5-3a37-48a6-85a6-40e92d75fe2b",
    "id": "dKpmytgcAcxQD0Sc4eLl",
    "lat": -23.628634,
    "long": -45.369142,
    "name": "Trilha da Praia Brava",
    "tags": [
      "Trilha",
      "Ar livre",
      "Praia",
      "Natureza"
    ]
  },
  {
    "description": "Praia do Massaguaçu",
    "foto": "https://firebasestorage.googleapis.com/v0/b/hackathon2025-20130.firebasestorage.app/o/praia_massagua%C3%A7u.jpg?alt=media&token=fa68901b-6dcb-4d42-a0f2-b369e3502ce6",
    "id": "hVRgLquH86ulS5mVgAff",
    "lat": -23.580961,
    "long": -45.323362,
    "name": "Praia do Massaguaçu",
    "tags": [
      "Praia",
      "Ar livre",
      "Natureza"
    ]
  },
  {
    "description": "Morro Santo Antônio",
    "foto": "https://firebasestorage.googleapis.com/v0/b/hackathon2025-20130.firebasestorage.app/o/morro_santo_antonio.jpg?alt=media&token=5e43c8f4-f80b-4734-881f-cd57c466c3e1",
    "id": "soD1bO5U4SpZRkRKtN0z",
    "lat": -23.610066,
    "long": -45.404597,
    "name": "Morro Santo Antônio",
    "tags": [
      "Trilha",
      "Cultural"
    ]
  },
  {
    "description": "Praia da Martin de Sá",
    "foto": "https://firebasestorage.googleapis.com/v0/b/hackathon2025-20130.firebasestorage.app/o/praia.jpg?alt=media&token=462e0f47-c923-48fe-81f5-87590897beb5",
    "id": "wzL3M3SxcaugnWhjgb6o",
    "lat": -23.627598,
    "long": -45.382842,
    "name": "Praia Martin de Sá",
    "tags": [
      "Praia",
      "Ar livre",
      "Natureza"
    ]
  }
]


Modelo para resposta:
{
  "name": "<Nome_do_Roteiro>",
  "description": "<Breve_descrição_do_roteiro>",
  "tags": [] (tags validas: Natureza, Trilha, Praia, Cultural, Ar livre),
  "data": [
    {
      "title": "Dia 1",
      "data": [
        {
          "id": 1,
          "place": "Morro Santo Antônio",
          "placeId": "soD1bO5U4SpZRkRKtN0z"
        },
        {
          "id": 2,
          "place": "Trilha da Praia Brava",
          "placeId": "dKpmytgcAcxQD0Sc4eLl"
        }
      ]
    }
  ]
}

Exemplo de modelo preenchido:
{
  "name": "Aventura Natural em Caraguá: Trilhas e Praias",
  "description": "Um roteiro de 2 dias em Caraguatatuba focado em explorar a natureza exuberante e as trilhas da região, ideal para amantes de atividades ao ar livre.",
  "tags": ["Natureza", "Trilha", "Praia", "Ar livre"],
  "data": [
    {
      "title": "Dia 1",
      "data": [
        {
          "id": 1,
          "place": "Morro Santo Antônio",
          "placeId": "soD1bO5U4SpZRkRKtN0z"
        },
        {
          "id": 2,
          "place": "Trilha da Praia Brava",
          "placeId": "dKpmytgcAcxQD0Sc4eLl"
        }
      ]
    },
    {
      "title": "Dia 2",
      "data": [
        {
          "id": 1,
          "place": "Praia Martin de Sá",
          "placeId": "wzL3M3SxcaugnWhjgb6o"
        },
        {
          "id": 2,
          "place": "Praia do Massaguaçu",
          "placeId": "hVRgLquH86ulS5mVgAff"
        }
      ]
    }
  ]
}
`;

export const CriadorDeRoteiro = async () => {
  var data = JSON.stringify({
    "contents": [
        {
          "parts": [
              {
                "text": context + `\nCom base nos pontos turistico de Caraguatatuba e tendo o modelo de resposta JSON que deve ser seguido a risca gere 3 modelos de roteiro de 1 a 3 dias para uma pessoa que gosta de fazer trilha`
              }
          ]
        }
    ]
  });

  var config = {
    method: 'post',
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    headers: { 
        'x-goog-api-key': 'AIzaSyAGtMQR2xID_OcglaXv_CfJF262OPK2MqI', 
        'User-Agent': 'Apidog/1.0.0 (https://apidog.com)', 
        'Content-Type': 'application/json', 
        'Accept': '*/*', 
        'Host': 'generativelanguage.googleapis.com', 
        'Connection': 'keep-alive'
    },
    data : data
  };

  const {data: resData, error} = await axios(config)

  console.log(resData)

  if (error)
    console.log(error)

  return resData
  // .then(function (response) {
  //   return (JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

// ai.defineFlow("CriadorDeRoteiro", async () => {
//   const { text } = await ai.generate(
//     context +
//       `\nCom base nos pontos turistico de Caraguatatuba e tendo o modelo de resposta JSON que deve ser seguido a risca gere 3 modelos de roteiro de 1 a 3 dias para uma pessoa que gosta de fazer trilha`
//   );
//   console.log(text);
// });
