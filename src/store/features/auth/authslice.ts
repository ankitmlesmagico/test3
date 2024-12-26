import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the type for user credentials
interface Credentials {
  email: string;
  password: string;
}

// Define the type for the user object
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the type for the API response
interface ApiResponse {
  success: boolean;
  user: User;
}

const loginUser = async (credentials: Credentials): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        (credentials.email === 'epic@esmagico.in' ||
          credentials.email === 'brand@esmagico.in') &&
        credentials.password === '123456'
      ) {
        resolve({
          success: true,
          user: { id: 1, name: 'Test User', email: credentials.email },
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

// Define the type for the auth state
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Async thunk for login
export const login = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response.user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      const userData = localStorage.getItem('user');
      if (userData) {
        state.user = JSON.parse(userData);
        state.isAuthenticated = true;
      }
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || null;
          state.isAuthenticated = false;
          state.user = null;
        }
      );
  },
});

export const { logout, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
