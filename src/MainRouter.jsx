import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
<<<<<<< HEAD


import ListEvent from "./components/events/ListEvent";
import AddEvent from "./components/events/AddEvent";
import EditEvent from "./components/events/EditEvent";

import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";

=======
import ListInventory from "./components/inventory/ListInventory";
import AddInventory from "./components/inventory/AddInventory";
import EditInventory from "./components/inventory/EditInventory";
import ListTickets from "./components/tickets/ListTickets";
import AddTicket from "./components/tickets/AddTicket";
import EditTicket from "./components/tickets/EditTicket";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";

import PrivateRoute from "./components/auth/PrivateRoute";

>>>>>>> 6ed1afe7c8a994dffb48971db7c675e7536c412f
function MainRouter() {
    return (
        <div>
            {/* Layout wraps all pages */}
            <Layout />

            <Routes>
<<<<<<< HEAD

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />

                {/* TICKET ROUTES */}
                <Route
                    path="/tickets"
                    element={
                        <PrivateRoute>
                            <ListInventory />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/tickets/new"
                    element={
                        <PrivateRoute>
                            <AddInventory />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/tickets/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditInventory />
                        </PrivateRoute>
                    }
                />

                {/* EVENT ROUTES */}
                <Route
                    path="/events"
                    element={
                        <PrivateRoute>
                            <ListEvents />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/events/new"
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
                <Route path="/inventory/list" element={<ListInventory />} />
                <Route path="/inventory/add" element={<AddInventory />} />
                <Route path="/inventory/edit/:id" element={<EditInventory />} />
=======
>>>>>>> 6ed1afe7c8a994dffb48971db7c675e7536c412f
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

                {/* LEGACY INVENTORY ROUTES */}
                <Route
                    path="/inventory/list"
                    element={
                        <PrivateRoute>
                            <ListInventory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/inventory/add"
                    element={
                        <PrivateRoute>
                            <AddInventory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/inventory/edit/:id"
                    element={
                        <PrivateRoute>
                            <EditInventory />
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
