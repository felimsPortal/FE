const Tooltip = ({ text, x, y, isVisible }) => (
  <div
    style={{
      position: "absolute",
      top: y + 10, // Adjust the tooltip position relative to the cursor
      left: x + 10,
      display: isVisible ? "block" : "none",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "#fff",
      padding: "5px 10px",
      borderRadius: "5px",
      pointerEvents: "none",
      zIndex: 1000,
      fontSize: "14px",
    }}
  >
    {text}
  </div>
);

export default Tooltip;
