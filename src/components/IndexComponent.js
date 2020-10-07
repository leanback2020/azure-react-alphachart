import React from "react"

export const IndexComponent = ({ indexData }) => {
  const { percent, last, name } = indexData
  return (
    <>
      <button style={btnStyle}>
        <label style={{ fontWeight: "bold", fontSize: "15px" }}>{name}</label>
        <br />
        {"  "}
        <label>{last} </label>
        {"  "}
        {percent >= 0 ? <label style={lblStylePositive}>{percent}% </label> : <label style={lblStyleNegative}>{percent}% </label>}
      </button>
    </>
  )
}
const btnStyle = {
  background: "#222",
  color: "#fff",
  border: "none",
  padding: "2px 2px",
  lineHeight: "13px",
  cursor: "pointer",
  margin: "0px 0px",
  height: "54px",
}

const lblStyleNegative = {
  color: "#C00",
  border: "none",
  padding: "2px 4px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 5px",
}

const lblStylePositive = {
  color: "#0C0",
  border: "none",
  padding: "2px 4px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 5px",
}

/*
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
*/

//export default IndexComponent
