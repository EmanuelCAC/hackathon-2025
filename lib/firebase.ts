import { firebase, getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

// const googleProvider = new GoogleAuthProvider();

const auth = getAuth();
const firestore = getFirestore();

// export const signInWithGoogle = async () => {
//   try {
//     const result = await auth.signInWithPopup(googleProvider);
//     const user = result.user;

//     if (user) {
//       const userRef = firestore.collection("User").doc(user.uid);
//       await userRef.set({
//         email: user.email,
//         name: user.displayName,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//     }

//     return { success: true };
//   } catch (error) {
//     return { success: false, error };
//   }
// };

export const signInAuth = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error) {
    return { succes: false, error };
  }
};

export const signUpAuth = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await userCredential.user.updateProfile({
      displayName: name,
    });

    await auth.currentUser?.sendEmailVerification();

    const userRef = firestore.collection("User").doc(userCredential.user.uid);
    await userRef.set({
      email: userCredential.user.email,
      name: userCredential.user.displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const saveRoteiro = async (
  name: string,
  description: string,
  data: string,
  tags: string[]
) => {
  const roteiroRef = firestore.collection("Roteiro").doc();
  await roteiroRef.set({
    name: name,
    description: description,
    tags: tags,
    data: data,
  });
};

export const getPontos = async () => {
  const pontosRef = firestore.collection("Ponto");
  const data = await pontosRef.get();
  return data;
};

export const getTags = async () => {
  const pontosRef = firestore.collection("Tag");
  const data = await pontosRef.get();
  return data;
};

export const getRoteiros = async () => {
  const roteirosRef = firestore.collection("Roteiro");
  const data = await roteirosRef.get();
  return data;
};

export const getGuias = async () => {
  const guiasRef = firestore.collection("Guia");
  const data = await guiasRef.get();
  const guiaData = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return guiaData;
};

export const getRoteirosWithPontos = async () => {
  const roteirosRef = firestore.collection("Roteiro");
  const roteirosSnap = await roteirosRef.get();
  const roteiros = roteirosSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Para cada roteiro, buscar os pontos de cada parada
  const roteirosComPontos = await Promise.all(
    roteiros.map(async (roteiro) => {
      const dias = roteiro.data ? JSON.parse(roteiro.data) : [];
      // Para cada dia
      const diasComPontos = await Promise.all(
        dias.map(async (dia) => {
          // Para cada parada
          const paradasComPonto = await Promise.all(
            dia.data.map(async (parada) => {
              if (parada.placeId) {
                const pontoDoc = await firestore
                  .collection("Ponto")
                  .doc(parada.placeId)
                  .get();
                return {
                  ...parada,
                  ponto: pontoDoc.exists ? pontoDoc.data() : null,
                };
              }
              return parada;
            })
          );
          return { ...dia, data: paradasComPonto };
        })
      );
      return { ...roteiro, data: diasComPontos };
    })
  );

  return roteirosComPontos;
};
