import { CoursePart } from "../App";

export const Part = (props: CoursePart) => {
  const baseStyle = {
    marginBottom: "0em",
    marginTop: "1em"
  };
  const lineStyle = {
    marginBottom: "0.1em",
    marginTop: "0.1em"
  };
  const baseString = <p style={baseStyle}><b>{props.name} {props.exerciseCount}</b></p>;
  switch (props.kind) {
    case("basic"):
      return (
        <div>
          {baseString}
          <p style={lineStyle}>{props.description}</p>
        </div>
      )
    case("group"):
      return (
        <div>
          {baseString}
          <p style={lineStyle}>project exercises{props.groupProjectCount}</p>
        </div>
      )
    case("background"):
      return (
        <div>
          {baseString}
          <p style={lineStyle}>{props.description}</p>
          <p style={lineStyle}>submit to {props.backgroundMaterial}</p>
        </div>
      )
    case("special"):
      return (
        <div>
          {baseString}
          <p style={lineStyle}>{props.description}</p>
          <p style={lineStyle}>required skills: {props.requirements.join(", ")}</p>
        </div>
      )
  }
};