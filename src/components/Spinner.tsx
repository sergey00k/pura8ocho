export const Spinner = () => (
    <div style={spinnerStyle}></div>
  );
  
  const spinnerStyle: React.CSSProperties = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "26px",
    height: "26px",
    animation: "spin 1s linear infinite",
  };