import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

// Public Pages
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/projects";
import Services from "./components/Services";
import NotFound from "./components/NotFound";

// Auth
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import auth from "./components/auth/auth-helper";

// Tickets (Inventory)
import ListInventory from "./components/inventory/ListInventory";
import AddInventory from "./components/inventory/AddInventory";
import EditInventory from "./components/inventory/EditInventory";

// Events
import ListEvents from "./components/events/ListEvents";
import AddEvent from "./components/events/AddEvent";
import EditEvent from "./components/events/EditEvent";

// PRIVATE ROUTE PROTECTOR
const PrivateRoute = ({ children }) => {
    const jwt = auth.isAuthenticated();
    return jwt ? children : <Navigate to="/signin" replace />;
};

function MainRouter() {
    return (
        <div>
            {/* Layout wraps all pages */}
            <Layout />

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />

                {/* AUTH ROUTES */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />

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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default MainRouter;
