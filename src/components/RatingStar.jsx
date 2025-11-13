import React from "react";

const RatingStar = ({ rating = 0, size = 18, color = "#f6c945", emptyColor = "#ddd" }) => {
  
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  const full = Math.floor(r);
  const remainder = r - full;
  const half = remainder >= 0.25 && remainder < 0.75; 
  const extraFullFromRemainder = remainder >= 0.75 ? 1 : 0; 
  const totalFull = full + extraFullFromRemainder;
  const stars = [];

  const uid = Math.random().toString(36).slice(2, 9);

  for (let i = 0; i < 5; i++) {
    let type = "empty";
    if (i < totalFull) type = "full";
    else if (i === totalFull && half) type = "half";
    stars.push(
      <span
        key={i}
        style={{ display: "inline-block", width: size, height: size, lineHeight: 0, marginRight: 4 }}
        aria-hidden="true"
      >
        {type === "full" && (
          <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.21l8.2-1.192z"
              fill={color}
            />
          </svg>
        )}

        {type === "empty" && (
          <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.21l8.2-1.192z"
              fill={emptyColor}
            />
          </svg>
        )}

        {type === "half" && (
          <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img">
            <defs>
              <clipPath id={`clip-left-${uid}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>

            <g clipPath={`url(#clip-left-${uid})`}>
              <path
                d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.21l8.2-1.192z"
                fill={color}
              />
            </g>

            <path
              d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.21l8.2-1.192z"
              fill={emptyColor}
              opacity="1"
            />
          </svg>
        )}
      </span>
    );
  }

  return (
    <span
      aria-label={`Rating: ${r} out of 5`}
      title={`${r} / 5`}
      style={{ display: "inline-flex", alignItems: "center" , justifyContent: "center" }}
    >
      {stars}
    </span>
  );
};

export default RatingStar;
