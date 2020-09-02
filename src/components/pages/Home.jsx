import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import List from '../List/List';
import store from '../../utils/store';
import StoreApi from '../../utils/storeApi';
import InputContainer from '../Input/InputContainer';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { createCard, addCard, updateTitleCard, obtainCards } from '../use_cases/userCard';

const Home = () => {
    const [data, setData] = useState(store);
    const [open, setOpen] = useState(false);

    const addMoreCard = (title, listId) => {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title,
        };

        const list = data.lists[listId];
        list.cards = [...list.cards, newCard];

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        addCard(list)
    };

    const addMoreList = (title) => {
        const newListId = uuid();
        const newList = {
            id: newListId,
            title,
            cards: [],
        };
        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList,
            },
        };
        setData(newState);
        createCard(newList);
    };

    const updateListTitle = (title, listId) => {
        const list = data.lists[listId];
        list.title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        updateTitleCard(list);
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }
        if (type === 'list') {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
        )[0];

        const newState = {};

        sourceList.cards.splice(source.index, 1);
        destinationList.cards.splice(destination.index, 0, draggingCard);

        if (source.droppableId === destination.droppableId) {
            newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList,
                },
            };
        } else {
            newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };
        }
        setData(newState);
    };

    useEffect(() => {
        async function fetchData() {
            const res = await obtainCards();
            setData(res)
        }
        fetchData()
    }, [])


    return (
        <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
            <div className="container-fluid">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="app" type="list" direction="horizontal">
                        {(provided) => (
                            <div
                                className="d-inline-flex p-2 bd-highlight"
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {data.listIds.map((listId, index) => {
                                    const list = data.lists[listId];
                                    return <List list={list} key={listId} index={index} />;
                                })}
                                <InputContainer type="list" />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </StoreApi.Provider>
    );
}
export default Home;