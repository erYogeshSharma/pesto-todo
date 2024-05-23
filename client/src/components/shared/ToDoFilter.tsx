import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
const ToDoFilter = () => {
  const { isFetching } = useAppSelector((state) => state.todo);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("status") || "all";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFilter(e: any) {
    if (e.target.value === "all") {
      searchParams.delete("status");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Stack>
      <FormControl sx={{ width: 200 }} fullWidth size="small">
        <InputLabel>Status</InputLabel>
        <Select
          disabled={isFetching}
          value={filter}
          defaultValue="all"
          label="Status"
          onChange={handleFilter}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"To Do"}>To Do</MenuItem>
          <MenuItem value={"In Progress"}>In Progress</MenuItem>
          <MenuItem value={"Complete"}>Complete</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default ToDoFilter;
