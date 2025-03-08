import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalType = "TICKET" | "HOTEL" | "USER" | "NONE";
type ActionType = "READ" | "CREATE" | "UPDATE" | "DELETE" | "NONE";

export interface GlobalState {
  modal: ModalType;
  id: number | null | string;
  action: ActionType;
  title: string;
}

const initialState: GlobalState = {
  modal: "NONE",
  id: null,
  action: "NONE",
  title: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalType>) => {
      state.modal = action.payload;
    },
    hideModal: (state) => {
      state.modal = "NONE";
      state.id = null;
      state.action = "NONE";
      state.title = "";
    },
    setId: (state, action: PayloadAction<string | number>) => {
      state.id = action.payload;
    },
    setAction: (state, action: PayloadAction<ActionType>) => {
      state.action = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { showModal, hideModal, setId, setAction, setTitle } =
  globalSlice.actions;
export default globalSlice.reducer;
