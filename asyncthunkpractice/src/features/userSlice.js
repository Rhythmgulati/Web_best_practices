import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    loading:false,
    error:null
};

export const allUser  = createAsyncThunk('users/allUsers',async (thunkAPI) =>{
    let res  = await fetch('https://api.github.com/users');
    res = await res.json();
    console.log(res);
    
    return res;
})

export const userSlice  = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(allUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.users = payload;
            })
            .addCase(allUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || 'Failed to fetch users';
            });
    }
});

export const userReducer = userSlice.reducer;
