const GameInfo = (props) => {
   const joinCode = props.joinCode;
   return (
      <div
         style={{
            width: "97%",
            height: "21%",
            backgroundColor: "#737373",
            borderRadius: ".5em",
            marginTop: ".5em",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "1em",
            fontFamily: "Jockey One",
            color: "white",
            overflow: "hidden", // prevent text from overflowing
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
         }}
      >
         <span
            style={{
               marginLeft: "1em",
               fontSize: "2vw", // responsive font size
            }}
         >
            Game:{" "}
         </span>{" "}
         <br />
         <span
            style={{
               marginLeft: "1em",
               fontSize: "2vw", // responsive font size
            }}
         >
            Join Code:
            <br />
            <div
            style={{
               textAlign: "center",
               fontSize: "1.5vw", // responsive font size
            }}
            >{joinCode}</div>
         </span>{" "}
      </div>
   );
};

export default GameInfo;
