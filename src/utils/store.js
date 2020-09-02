const cards = [
  {
    id: 'card-1',
    title: 'Tarea 1',
  },
  {
    id: 'card-2',
    title: 'Tarea 2',
  },
  {
    id: 'card-3',
    title: 'Tarea 3',
  },
];

const data = {
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'Cosas que hacer',
      cards,
    },
    'list-2': {
      id: 'list-2',
      title: 'En proceso',
      cards: [],
    },
    'list-3': {
      id: 'list-3',
      title: 'Hecho',
      cards: [],
    },
  },
  listIds: ['list-1', 'list-2', 'list-3'],
};

export default data;
