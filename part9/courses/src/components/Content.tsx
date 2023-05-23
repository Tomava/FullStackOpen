export interface CoursePart {
  name: string,
  exerciseCount: number
}

export interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((prop) => (
        <h1 key={prop.name}>{prop.name} {prop.exerciseCount}</h1>
      ))}
    </div>
  )
};
