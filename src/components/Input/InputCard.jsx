import React, { useState, useContext } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import storeApi from '../../utils/storeApi';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {

  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, type }) {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const handleBtnConfirm = () => {
    if (type === 'card') {
      addMoreCard(title, listId);
      setTitle('');
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <>
      <div className="card">
        <input
          className="form-control"
          onChange={handleOnChange}
          onBlur={() => setOpen(false)}
          value={title}
          placeholder={
          type === 'card'
            ? 'Introduzca un título para esta tarjeta...'
            : 'Introduzca el título de la lista...'
        }></input>
    </div>
    <div className={classes.confirm}>
      <button type="button" className="btn btn-outline-primary btn-sm m-2" onClick={handleBtnConfirm}>
        {type === 'card' ? 'Añadir tarjeta' : 'Añadir lista'}
      </button>
      <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setOpen(false)}>
        Cancelar
        </button>
    </div>
    </>
  );
}
