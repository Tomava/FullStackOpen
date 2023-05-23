import { Part } from "./Part";
import { CoursePart } from "../App";

export interface ContentProps {
  courseParts: CoursePart[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((coursePart) => (
        <Part key={coursePart.name} {...coursePart}></Part>
      ))}
    </div>
  )
};
