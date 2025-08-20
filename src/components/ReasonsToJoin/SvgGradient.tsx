import type { ReactElement } from "react";
import { Box } from "@mui/material";

interface SvgGradientI {
  icon?: ReactElement;
}

export function SvgGradient({ icon }: SvgGradientI) {
  if (!icon) return null;

  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stop-color="#F8BD34" />
            <stop offset="50%" stop-color="#EA118D" />
            <stop offset="100%" stop-color="#45399E" />
          </linearGradient>
        </defs>
      </svg>
      <Box
        sx={{
          '& .MuiSvgIcon-root': {
            fill: 'url(#instagramGradient)',
            color: 'url(#instagramGradient)'
          }
        }}
      >
        {icon}
      </Box>
    </>
  );
}