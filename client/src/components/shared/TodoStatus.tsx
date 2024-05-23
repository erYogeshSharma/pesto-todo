import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { LoadingButton } from "@mui/lab";
import { ToDoStatus } from "../../store/types/to-do-types";
import { Done, HourglassTop, NotStarted } from "@mui/icons-material";

const statusOptions = ["To Do", "In Progress", "Complete"];

type Props = {
  value: ToDoStatus;
  onChange: (value: ToDoStatus) => void;
  saving?: boolean;
};
export default function ToDoStatusButton({ value, onChange, saving }: Props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (!saving) {
      setOpen(false);
    }
  }, [saving]);
  return (
    <React.Fragment>
      <ButtonGroup
        size="small"
        variant="outlined"
        ref={anchorRef}
        color={
          value === "To Do"
            ? "error"
            : value === "Complete"
            ? "success"
            : "warning"
        }
        aria-label="Button group with a nested menu"
      >
        <LoadingButton
          startIcon={
            value === "To Do" ? (
              <NotStarted />
            ) : value === "Complete" ? (
              <Done />
            ) : (
              <HourglassTop />
            )
          }
          sx={{ width: 140 }}
          size="small"
          loading={saving}
        >
          {value}
        </LoadingButton>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {statusOptions.map((status, index) => (
                    <MenuItem
                      key={index}
                      selected={status === value}
                      onClick={() => onChange(status as ToDoStatus)}
                    >
                      {status}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
