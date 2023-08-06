import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

// Configuration for the client
const translate = new Translate({
    credentials: {
        "type": "service_account",
        "project_id": "quiz-ai-translate",
        "private_key_id": "83893b0db58daa81a9950d48d1e9ccabd9c90ec4",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXwKdL6kO3/f/C\nepFiP79ZhxLJg1zW3YSo6727FwgqMnhgRu6EOoIR2YnFqU0YznkO+F3GpklQNuon\nzbY+jLpxRH+5WbBiRsk9U62BBrqGtbQOOVmIERS9iAsYf92z100oLrwfi1yB+tma\nd9VqzGAQlj5EhmT86HFFjilUGx0a7QG2ArrnYPiMu5U6E+BHZKmE+snfsBdRQLLc\nYROlEDk/unRTCrOzHEE5pMWGi5/xcpDAeOQH/J4Qa/ayfhEO/z4ARpeahL+8dSwO\n/TORRE9VceGvM9/w57HaahTAormGG99bWWBj76x8AD14ACfbvj/NXzutGUpYXSRV\njtCLXJ85AgMBAAECggEABmw1OHGRDam+qCbDXfboPJwKp8Q7Su3DtlmJ5W/3XL/X\nl+2QnUCTrjk4i0jb1juw5HkPEQALNM2qMeaTOsj+gBo/1KKu5C3uSP3wZzhXbymk\nFgEH4MomSFJIc/A/fCPV5Gg79pLRpr+s84x0WCmPvEv7lS9h+VFGMAUxCxn9rJzA\nIOci3UC1VRwp2DHYTJGROV4UTEMijrCWg7nWoEsSJ5GNqpR3kB7m0eUzPkUtMfJB\nbh9Ewj/ZoN5PiRpKZbrosjS+p2H98doaKZUjvUM61iE61QVOoH20EbCpcJqg+72v\n+X00u8FzQnbHtpSdLjHOJQmNe8iffbgo2al1HuDzzQKBgQDR6xbl+zaqM73vgqHE\nhu3IePDi48vRjDQWxhglvTwN4AYPAzQjG7ORzY7OTLpm3Ns9jNDuvMkDhgIS7DMJ\nC1/fXmQ8/zRYhn77MNsyoI0hFa92y/zjP0+R/B4nocjf52lQamChzR+8Mnhs2X+P\nlLIiwK11eW3d6yQYAYcSVukFbQKBgQC5EMlKB9LZiyE7FYt9YjLU3slljnXh+Fno\n9j/aHpZEpkRmCbSiNiJumsL1LM+uJND5UaIbx1OkEqsDDA9o1BYFKnwJPOg4J8Rl\npIljom4e9t1BZsRMYo9rlQpFML/oToBgdH8sSKsoeqCObyvqC2F0NmqFfvLPftwx\ns11L3jI9fQKBgQCxi4rUfYMgtZ6h4vT7ibu34UKsRErxMwojcOyfjswqWB4HuIfy\nYc2hNiDgr9jAg3ATQPS914KUrlU2t/v6XFp8TBOv25Hkhe0Ee7AJw+1Z3EOJ0MJV\nWgjsyjafAqEpb0qNr0uHzjxXKsDcH6FaSUPZTOnpAAlCt0zR2QjrJAL2iQKBgC6W\nbTW3tnqRLbJkABN2TvmLhAOO01opXOjqZLSSEp4BhSJyuwhCvHQ/fWie+UELf5fj\n1v1LNmENWgOQW6i2Cz0Nrt/cd1D7odM8kmGEmFgvKQ+3wR7BiP06LbWxSf4/FM4z\nRXhuarfr9tMkZVerucK5mCM3DAT0GJZiYtAghWE5AoGAdevvO1CDSs/vEriUl/LL\nnXdNZBrE+5ITSLUeofRZKzbBHK0zjkeiudLJrdlIHUuvtTNi/ZvR49hWrwk6cRL4\nAaEY88xZORJFi2tKyTq5rruBh4awk/8HYjduJSbTBID5QvQ+rE2qwiCEHnkyAEvX\ndlqX7DQPddbiMm506T7GyZU=\n-----END PRIVATE KEY-----\n",
        "client_email": "quizai-service-account@quiz-ai-translate.iam.gserviceaccount.com",
        "client_id": "110867964491852362819",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/quizai-service-account%40quiz-ai-translate.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      },
    projectId: "quiz-ai-translate"
});

// export const detectLanguage = async (text) => {

//     try {
//         let response = await translate.detect(text);
//         return response[0].language;
//     } catch (error) {
//         console.log(`Error at detectLanguage --> ${error}`);
//         return 0;
//     }
// }

// detectLanguage('Oggi è lunedì')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export async function translateText(text, targetLanguage) {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};

// export translateText('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });