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
