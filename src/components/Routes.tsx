import { Route } from "react-location";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import Totals from "./Totals";
import WhoDidWhat from "./WhoDidWhat";

export const Routes: Route[] = [
  { path: "/", element: <Dashboard /> },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/district-summaries",
    element: <Totals />,
  },
  {
    path: "/wdw",
    element: <WhoDidWhat />,
  },
];
