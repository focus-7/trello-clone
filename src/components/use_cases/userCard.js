import { document, collection } from "../../data/firestore";
import { currentUser } from "../../data/firebase/auth";

const createCard = async (object) => {
  const userId = await currentUser();
  return await document(`usuarios/${userId}/cards/${object.id}`).set(object);
};

const addCard = async (object) => {
  const userId = await currentUser();
  return await document(`usuarios/${userId}/cards/${object.id}`).set(object);
};

const updateTitleCard = async (object) => {
  const userId = await currentUser();
  return await document(`usuarios/${userId}/cards/${object.id}`).set(object);
};

const obtainCards = async () => {
  const userId = await currentUser();
  const usersPath = collection(`usuarios/${userId}/cards`);
  const pathRef = await usersPath.get();

  let listIds = [];
  let data = {};
  let aux = [];

  pathRef.forEach((user) => {
    data = {
      [user.data().id]: {
        id: user.data().id,
        title: user.data().title,
        cards: user.data().cards,
      },
    };
    aux.push(data);
    listIds.push(user.data().id);
  });
  let result = {};

  let lists = {};
  lists = Object.assign(...aux);

  result = { lists, listIds };
  return result;
};

export { createCard, updateTitleCard, addCard, obtainCards };
