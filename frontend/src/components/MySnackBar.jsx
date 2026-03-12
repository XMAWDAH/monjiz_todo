import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert, Stack} from "@mui/material";

export default function MySnackBar({open, message, severity}) {
  return (
    <Stack spacing={2} sx={{width: "100%"}}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
      >
        <Alert
          severity={severity}
          variant="standard"
          sx={{
            width: "100%",
            fontWeight: "500",
            borderRadius: "8px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
