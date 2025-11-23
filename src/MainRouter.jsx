import { Routes, Route } from "react-router-dom";
import Projects from "./components/projects";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Services from "./components/Services";
import ListInventory from "./components/tickets/ListTickets";
import AddInventory from "./components/tickets/AddTicket";
import EditInventory from "./components/tickets/EditTicket";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function MainRouter() {
    return (
        <div>
            <Layout />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} /> */}
                <Route path="/ticket/list" element={<ListInventory />} />
                <Route path="/ticket/add" element={<AddInventory />} />
                <Route path="/ticket/edit/:id" element={<EditInventory />} />
                <Route path="/users/signin" element={<SignIn />} />
                <Route path="/users/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default MainRouter;