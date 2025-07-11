import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <Box>
        <CircularProgress size="4rem" sx={{ color: "black" }} />
      </Box>
    </div>
  );
};

export default Loader;
