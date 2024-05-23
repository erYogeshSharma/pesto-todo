import { svg } from "./svg";
import { Stack, useTheme } from "@mui/material";

function svgToDataURL(svgString: string) {
  return "data:image/svg+xml;base64," + btoa(svgString);
}
const Error = () => {
  const theme = useTheme();
  const dataURL = svgToDataURL(svg(theme.palette.primary.main));
  return (
    <Stack
      sx={{ height: "calc(100vh - 100px)" }}
      alignItems="center"
      justifyContent="center"
    >
      <Stack width={{ xs: "80vw", md: 600 }}>
        <img src={dataURL} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </Stack>
    </Stack>
  );
};

export default Error;
