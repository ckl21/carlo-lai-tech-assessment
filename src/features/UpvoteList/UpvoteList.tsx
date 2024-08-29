import { useState, useEffect } from 'react'
import UpvoteIcon from '../../assets/imgs/arrow-up.svg?react'
import ImageButton from '../../components/ImageButton'
import ElementList from '../../components/ElementList'
import { nanoid } from 'nanoid'
import './UpvoteList.css'

type UpvoteList = {
  id: string;
  elements: ListElement[];
}

type ListElement = {
  id: string;
  selected: boolean;
}

const defaultInitialState = [
  {
    id: nanoid(),
    elements: new Array<ListElement>()
  },
  {
    id: nanoid(),
    elements: new Array<ListElement>()
  },
  {
    id: nanoid(),
    elements: new Array<ListElement>()
  }
]

export default function UpvoteList({initialState = defaultInitialState}) {

  const [upvoteLists, setUpvoteLists] = useState<UpvoteList[]>([])

  //Inital setup: Load data if available in session storage, otherwise create empty lists
  useEffect(() => {
    if (window.sessionStorage.getItem("upvoteLists")) {
      setUpvoteLists(JSON.parse(window.sessionStorage.getItem("upvoteLists")!))
    } else {
      setUpvoteLists(initialState)
    }
  },[initialState])

  //Update session storage data
  useEffect(() => {
    if (upvoteLists.length) {
      window.sessionStorage.setItem("upvoteLists", JSON.stringify(upvoteLists))
    }
  },[upvoteLists])

  function upvoteClickHandler(listId: string, btnId: string) {
    setUpvoteLists((prev) => 
      prev.map(list => {
        //Find matching list with ID
        if (list.id === listId) {
          //Find matching button with ID and update selected state
          const updatedElements = list.elements.map(btn => {
            if (btn.id === btnId) {
              return {...btn, selected: !btn.selected}
            }
            return btn
          })
          return {...list, elements: updatedElements}
        }
        return list
      })
    )
  }

  function addUpvoteClickHandler(listId: string) {
    setUpvoteLists((prev) =>
      prev.map(list => {
        //Create new button object for list matching id
        if (list.id === listId) {
          return {
            ...list, 
            elements: [
              ...list.elements, 
              {id: nanoid(), selected: false}
            ]
          }
        }
        return list
      })
    )
  }

  return (
    <>
      <div className="list-container">
        {upvoteLists.map(list => {
          return (
            <ElementList key={list.id} addClickHandler={() => addUpvoteClickHandler(list.id)}>
              {list.elements.map(btn => (
                <ImageButton 
                  key={btn.id} 
                  btnId={btn.id}
                  clickHandler={() => upvoteClickHandler(list.id, btn.id)} 
                  label="Upvote" 
                  btnClass={btn.selected ? "upvoteBtn selected" : "upvoteBtn"}
                >
                  <UpvoteIcon />
                </ImageButton>
              ))}
            </ElementList>
          )}
        )}
      </div>
    </>
  )
}