import React from "react";
import ReactDOM from "react-dom/client";
import Loader from "./Loader";
import "./index.css";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Loader />
    </QueryClientProvider>
  </React.StrictMode>,
);
