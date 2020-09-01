import { firebaseFirestore } from '../firebase/firebase-config';

const document = (path) => firebaseFirestore.doc(path);

const collection = (path) => firebaseFirestore.collection(path);

export { document, collection };
