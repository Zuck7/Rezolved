import { Routes, Route } from "react-router-dom";
// import Projects from "./components/projects";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
// import Services from "./components/Services";
// import ListInventory from "./components/inventory/ListInventory";
// import AddInventory from "./components/inventory/AddInventory";
// import EditInventory from "./components/inventory/EditInventory";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";

import PrivateRoute from "./components/auth/PrivateRoute";
import ListEvents from "./components/events/ListEvents";
import AddEvent from "./components/events/AddEvent";
import EditEvent from "./components/events/EditEvent";

function MainRouter() {
    return (
        <div>
            {/* Layout wraps all pages */}
            <Layout />

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
<<<<<<< HEAD
=======
                <Route path="/about" element={<About />} />
                {/* <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />

                {/* AUTH ROUTES */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
>>>>>>> parent of ab3b5ab (Update MainRouter.jsx)

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
<<<<<<< HEAD
                <Route path="/inventory/edit/:id" element={<EditInventory />} />
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
=======
                <Route path="/inventory/edit/:id" element={<EditInventory />} /> */}
>>>>>>> parent of ab3b5ab (Update MainRouter.jsx)
                <Route path="/users/signin" element={<SignIn />} />
                <Route path="/users/signup" element={<SignUp />} />

                {/* PROTECTED TICKET ROUTES */}
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

                {/* LEGACY INVENTORY ROUTES - KEPT FOR BACKWARDS COMPATIBILITY */}
                <Route path="/inventory/list" element={<ListInventory />} />
                <Route path="/inventory/add" element={<AddInventory />} />
                <Route path="/inventory/edit/:id" element={<EditInventory />} />

                {/* PROTECTED EVENT ROUTES
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
                /> */}

                {/* 404 ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default MainRouter;
