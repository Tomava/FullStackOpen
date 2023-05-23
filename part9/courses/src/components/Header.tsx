interface HeaderProps {
  name: string
}

export const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
};
