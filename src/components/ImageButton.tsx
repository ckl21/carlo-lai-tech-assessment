type Props = {
  children: React.ReactNode;
  label: string;
  btnId?: string;
  btnClass?: string;
  clickHandler: () => void;
}

export default function ImageButton(props: Props) {
  return (
    <button id={props.btnId} className={props.btnClass} onClick={props.clickHandler} aria-label={props.label}>
      {props.children}
    </button>
  )
}