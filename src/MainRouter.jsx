import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import ListEvent from "./components/events/ListEvent";
import AddEvent from "./components/events/AddEvent";
import EditEvent from "./components/events/EditEvent";
import ListTickets from "./components/tickets/ListTickets";
import AddTicket from "./components/tickets/AddTicket";
import EditTicket from "./components/tickets/EditTicket";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";

import PrivateRoute from "./components/auth/PrivateRoute";

function MainRouter() {
    return (
        <div>
            {/* Layout wraps all pages */}
            <Layout />

            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/users/signin" element={<SignIn />} />
                <Route path="/users/signup" element={<SignUp />} />

                {/* PROTECTED TICKET ROUTES */}
                <Route
                    path="/tickets"
                    element={
                        <PrivateRoute>
                            <ListTickets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ticket/list"
                    element={
                        <PrivateRoute>
                            <ListTickets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/tickets/add"
                    element={
                        <PrivateRoute>
                            <AddTicket />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/ticket/add"
                    element={
                        <PrivateRoute>
                            <AddTicket />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/tickets/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditTicket />
                        </PrivateRoute>
                    }
                />


                {/* PROTECTED EVENT ROUTES */}
                <Route
                    path="/events"
                    element={
                        <PrivateRoute>
                            <ListEvent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/list"
                    element={
                        <PrivateRoute>
                            <ListEvent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/add"
                    element={
                        <PrivateRoute>
                            <AddEvent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/add"
                    element={
                        <PrivateRoute>
                            <AddEvent />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/events/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditEvent />
                        </PrivateRoute>
                    }
                />

                {/* 404 ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default MainRouter;