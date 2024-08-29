import ImageButton from "./ImageButton"
import PlusIcon from "../assets/imgs/plus.svg?react"

type Props = {
  addClickHandler: () => void;
  children: React.ReactNode[];
}

export default function ElementList(props: Props) {
  return (
    <div className="element-list">
      <div className="element-list_children">
        {props.children}
      </div>
      <div className="element-list_btn-container">
        <ImageButton btnClass="element-list_add-btn" clickHandler={props.addClickHandler} label="Add">
          <PlusIcon />
        </ImageButton>
      </div>
    </div>
  )
}